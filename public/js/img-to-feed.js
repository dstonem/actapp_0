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
        // postContainer.setAttribute('id',`${sessionMainFeed[i].id}`)
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

        //XXXXXX we need to make the value of sessionMainFeed[i].likes = a query on the count from the likes table
        let likesDiv = document.createElement('div')
        likesDiv.className = 'feed-likes-div'
        let likeIcon = document.createElement('img')
        likeIcon.setAttribute('src','/images/icons/like_icon.jpg')
        likeIcon.className = 'like-icon'
        //XXXXXXX
        //ADDING LIKES
        // let likesForPost = await fetch('/feed/likes', {
        //     method:'POST'
        // })
        // likesForPost = await likesForPost.json()
        // console.log(`likesForPost: ${likesForPost}`)
        const addLike = async () => {
            sessionMainFeed[i].likes = sessionMainFeed[i].likes + 1
            console.log(sessionMainFeed[i].likes)
            likeIcon.removeEventListener('click',addLike)
            //XXXXXXX NEXT STEPS: How do we get req.body to recognize the post id so we can insert
            //into the likes table?
            await fetch('/feed/addlike', {
                method:'POST',
                body:sessionMainFeed[i].id
            })
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data)
                window.location = '/feed'
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

        let cause = document.createElement('img')
        cause.className = "icons"
        sessionMainFeed[i].causes == 'blm' ? cause.setAttribute('src','/images/icons/blm_icon.png') : null
        sessionMainFeed[i].causes == 'election' ? cause.setAttribute('src','/images/icons/election_icon.png') : null
        sessionMainFeed[i].causes == 'climate' ? cause.setAttribute('src','/images/icons/environment_icon.png') : null
        console.log(`post cause:${sessionMainFeed[i].causes}`)

        let userWhoPostedDiv = document.createElement('div')
        userWhoPostedDiv.className = 'feed-post-user-info-div'
        
        imgContainer.append(img)
        postContainer.append(userWhoPosted,imgContainer,cause,likesDiv,postText)
        document.getElementById('main-feed').appendChild(postContainer)
    }

    // console.log(`sessionMainFeed[i]:${sessionMainFeed[i]}`)

}

window.addEventListener('DOMContentLoaded',pullPostData)