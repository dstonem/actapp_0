const pullPostData = async () => {

    console.log('working')

    let postsFromUsersCauses = await fetch('/feed', {
        method:'POST'
    })
    postsFromUsersCauses = await postsFromUsersCauses.json()
    console.log(`In the img-to-feed module, postsFromUsersCauses:${postsFromUsersCauses}`)

    //NEED TO BREAK DOWN EACH POST AND DISPLAY IT ON THE SCREEN

    let sessionMainFeed = []

    for(let i = 0; i < postsFromUsersCauses.length; i++){
        console.log(`Object ${i}: ${JSON.stringify(postsFromUsersCauses[i])}`)
        sessionMainFeed.push(postsFromUsersCauses[i])
    }

    for(let i = 0; i < sessionMainFeed.length; i++){
        console.log(`TOP OF: sessionMainFeed[i]:${sessionMainFeed[i]}`)
        let postContainer = document.createElement('div')
        postContainer.className = "feed-post-container"
        postContainer.setAttribute('id',`${sessionMainFeed[i].id}`)
        console.log(`post id:${sessionMainFeed[i].id}`)

        // LATER: render the profile pic of the person who posted
        // let userWhoPostedPic = document.createElement('img')
        // userWhoPostedPic.setAttribute('src',sessionMainFeed[i].userPic)
        let userWhoPosted = document.createElement('p')
        userWhoPosted.innerText = `${sessionMainFeed[i].username}`
        userWhoPosted.className = 'user-who-posted'
        console.log(`post username:${sessionMainFeed[i].username}`)

        let imgContainer = document.createElement('div')
        imgContainer.className = "main-feed-img-container"

        //if width>height set classname to horizontal (something that centers on the middle of the image from left to right)
        //if height>width set classname to vertical (something that centers the image from top to bottom)
        let img = document.createElement('img')
        img.setAttribute('src',`${sessionMainFeed[i].picurl}`)
        console.log(`post picurl:${sessionMainFeed[i].picurl}`)

        let likesDiv = document.createElement('div')
        likesDiv.className = 'feed-likes-div'
        let likeIcon = document.createElement('img')
        likeIcon.setAttribute('src','/images/icons/like_icon.jpg')
        likeIcon.className = 'like-icon'
        
        const addLike = async () => {
            sessionMainFeed[i].likes = sessionMainFeed[i].likes + 1
            console.log(`sessionMainFeed[i].likes:${sessionMainFeed[i].likes}, sessionMainFeed[i].id:${sessionMainFeed[i].id}`)
            likeIcon.removeEventListener('click',addLike)
            //XXXXXXX NEXT STEPS: How do we get req.body to recognize the post id so we can insert
            //into the likes table?
            await fetch('/feed/addlike', {
                method:'POST',
                body:sessionMainFeed[i]
            })
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data)
                //XXXXXX HOW DO WE MAKE IT LOAD THE NEW NUMBER OF LIKES LIVE WITHOUT RELOADING?
                window.location = `/feed/#${sessionMainFeed[i].id}`
            })
        }
        likeIcon.addEventListener('click',addLike)
        
        let numLikes = document.createElement('p')
        console.log(`sessionMainFeed[i].likes:${sessionMainFeed[i].likes}`)
        numLikes.innerText = Number(sessionMainFeed[i].likes)

        likesDiv.append(likeIcon,numLikes)
        
        let postText = document.createElement('p')
        postText.innerText = `${sessionMainFeed[i].body}`
        console.log(`post body:${sessionMainFeed[i].body}`)

        let commentDiv = document.createElement('div')
        let commentFeed = document.createElement('div')

        const getCommentsAndLoadIntoCommentFeed = async () => {
            console.log(`loading comments`)
            let commentsOnPost = await fetch('/feed/getcomments', {
                method:'POST'
            })

            //XXXXXX this is coming out undefined
            commentsOnPost = commentsOnPost.json()
            console.log(`The JSON of commentsOnPost is: ${JSON.stringify(commentsOnPost)}`)
    
            // for(let i = 0; i < commentsOnPost.length; i++){
                let existingCommentDiv = document.createElement('div')
            
                let commentUser = document.createElement('p')
                commentUser.innerText = commentsOnPost.username
                commentUser.className = 'bold'

                let commentComment = document.createElement('p')
                commentComment.innerText = commentsOnPost.comment

                existingCommentDiv.append(commentUser,commentComment)
                commentFeed.append(existingCommentDiv)

                //push/append into the comment feed
                console.log(`data.username: ${commentsOnPost.username}`)
            // }
            //XXXXXX HOW DO WE MAKE IT LOAD THE NEW COMMENTS POSTED WITHOUT RELOADING?
            // window.location = `/feed/#${sessionMainFeed[i].id}`
        }

        getCommentsAndLoadIntoCommentFeed()

        let commentBox = document.createElement('textarea')
        //may have to change this to innerText for a textarea
        commentBox.setAttribute('placeholder','Add comment')
        let commentSubmit = document.createElement('button')
        commentSubmit.innerText = "Submit"

        commentDiv.append(commentBox,commentSubmit)

        const addComment = async () => {
            console.log(`commentBox.value: ${commentBox.value}`)
            await fetch('/feed/addcomment', {
                method:'POST',
                body:{
                    comment:commentBox.value,
                    post_id:sessionMainFeed[i].id
                }
            })
            .then(resp=>resp.json())
            .then(data=>{
                //push/append into the comment feed
                console.log(data)
                //XXXXXX HOW DO WE MAKE IT LOAD THE NEW COMMENT FEED WITHOUT RELOADING?
                // window.location = `/feed/#${sessionMainFeed[i].id}`
            })
        }

        commentSubmit.addEventListener('click',addComment)

        let commentsAndLikesDiv = document.createElement('div')
        commentsAndLikesDiv.className = 'comments-and-likes-div'
        commentsAndLikesDiv.append(likesDiv,commentDiv)

        let cause = document.createElement('img')
        cause.className = "cause-icons"
        sessionMainFeed[i].causes == 'blm' ? cause.setAttribute('src','/images/icons/blm_icon.png') : null
        sessionMainFeed[i].causes == 'election' ? cause.setAttribute('src','/images/icons/election_icon.png') : null
        sessionMainFeed[i].causes == 'climate' ? cause.setAttribute('src','/images/icons/environment_icon.png') : null
        console.log(`post cause:${sessionMainFeed[i].causes}`)

        let userWhoPostedDiv = document.createElement('div')
        userWhoPostedDiv.className = 'feed-post-user-info-div'
        
        imgContainer.append(img)
        postContainer.append(userWhoPosted,imgContainer,postText,commentFeed,commentsAndLikesDiv,cause)
        document.getElementById('main-feed').appendChild(postContainer)
    }

    // console.log(`sessionMainFeed[i]:${sessionMainFeed[i]}`)

}

window.addEventListener('DOMContentLoaded',pullPostData)