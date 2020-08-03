const addLike = async (evt) => {
    let postId = evt.target.parentNode.parentNode.parentNode.id
    await fetch(`/feed/addlike/${postId}`, {
        method:'POST'
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
        document.getElementById(`likes_${postId}`).childNodes[1].innerHTML = data.length
        document.getElementById(`likes_${postId}`).childNodes[0].removeEventListener('click', addLike)
    })
}

const showComments = async (postId,value) => {
    await fetch('/feed/getcomments', {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            comment:value,
            post_id:postId
        })
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
        let results = data.map(comment => `<div><b>${comment.username}</b> ${comment.comment}</div>`).join('')
        let commentDiv = document.getElementById(`comment_feed_${postId}`)
        commentDiv.innerHTML = results
    })
}

const addComment = async (evt,value) => {
    event.preventDefault()
    let postId = evt.target.parentNode.parentNode.parentNode.parentNode.id
    console.log(value)
    await fetch('/feed/addcomment', {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            comment:value,
            post_id:postId
        })
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
        //insert into comment section div
        let results = data.map(comment => `<div><b>${comment.username}</b> ${comment.comment}</div>`).join('')
        let commentDiv = document.getElementById(`comment_feed_${postId}`)
        commentDiv.innerHTML = results
    })
}

const pullPostData = async () => {

    //console.log('working')

    let postsFromUsersCauses = await fetch('/feed', {
        method:'POST'
    })
    postsFromUsersCauses = await postsFromUsersCauses.json()
    //this is better than trying to stringify things and will stop [object Object] from happening
    console.log(`In the img-to-feed module, postsFromUsersCauses:`,postsFromUsersCauses)

    //me has the user stored in the frontend
    let me = await (await fetch('/me')).json()
    console.log(me)

    let sessionMainFeed = []

    for(let i = 0; i < postsFromUsersCauses.length; i++){
        sessionMainFeed.push(postsFromUsersCauses[i])
    }

    sessionMainFeed.sort(function(a, b) {
        return b.id - a.id;
    })

    for(let i = 0; i < sessionMainFeed.length; i++){
        
        let postContainer = document.createElement('div')
        postContainer.className = "feed-post-container"
        postContainer.setAttribute('id',`${sessionMainFeed[i].id}`)

        // LATER: render the profile pic of the person who posted
        // let userWhoPostedPic = document.createElement('img')
        // userWhoPostedPic.setAttribute('src',sessionMainFeed[i].userPic)
        let userWhoPosted = document.createElement('p')
        userWhoPosted.innerText = `${sessionMainFeed[i].username}`
        userWhoPosted.className = 'user-who-posted'

        let imgContainer = document.createElement('div')
        imgContainer.className = "main-feed-img-container"

        //if width>height set classname to horizontal (something that centers on the middle of the image from left to right)
        //if height>width set classname to vertical (something that centers the image from top to bottom)
        let img = document.createElement('img')
        img.setAttribute('src',`${sessionMainFeed[i].picurl}`)

        let likesDiv = document.createElement('div')
        likesDiv.id = `likes_${sessionMainFeed[i].id}`
        likesDiv.className = 'feed-likes-div'
        let likeIcon = document.createElement('img')
        likeIcon.setAttribute('src','/images/icons/like_icon.jpg')
        likeIcon.className = 'like-icon'
        
        
        if(!sessionMainFeed[i].likes.find(like => like.user_id === me.id)){
            likeIcon.addEventListener('click', addLike)
        } else {
            //make the icon grey
        }
        
        let numLikes = document.createElement('p')
        //console.log(`sessionMainFeed[i].likes:${sessionMainFeed[i].likes}`)
        numLikes.innerText = Number(sessionMainFeed[i].likes.length)

        likesDiv.append(likeIcon,numLikes)
        
        let postText = document.createElement('p')
        postText.innerHTML = `<b>${sessionMainFeed[i].username}</b> ${sessionMainFeed[i].body}`
        //console.log(`post body:${sessionMainFeed[i].body}`)

        let commentFeed = document.createElement('div')
        commentFeed.setAttribute('id',`comment_feed_${sessionMainFeed[i].id}`)

        let commentDiv = document.createElement('div')
        commentDiv.className = 'feed-add-comment-div'
        commentDiv.id = `comments_${sessionMainFeed[i].id}`
        

        // getCommentsAndLoadIntoCommentFeed()
        let commentForm = document.createElement('form')

        let commentBox = document.createElement('textarea')
        commentBox.setAttribute('name','newComment')
        commentBox.setAttribute('placeholder','Add comment')
        commentBox.className = 'feed-add-comment-box'
        let commentSubmit = document.createElement('button')
        commentSubmit.setAttribute('type','button')

        commentForm.append(commentBox,commentSubmit)
        commentDiv.append(commentForm)

        commentSubmit.addEventListener('click',(evt) => {
            if(commentBox.value){
                addComment(evt,commentBox.value)
            }
        })

        let commentsAndLikesDiv = document.createElement('div')
        commentsAndLikesDiv.className = 'comments-and-likes-div'
        commentsAndLikesDiv.append(likesDiv,commentDiv)

        let causeIcon = document.createElement('img')
        causeIcon.className = "cause-icons"
        sessionMainFeed[i].causes == 'blm' ? causeIcon.setAttribute('src','/images/icons/blm_icon.png') : null
        sessionMainFeed[i].causes == 'election' ? causeIcon.setAttribute('src','/images/icons/election_icon.png') : null
        sessionMainFeed[i].causes == 'climate' ? causeIcon.setAttribute('src','/images/icons/environment_icon.png') : null
        //console.log(`post cause:${sessionMainFeed[i].causes}`)

        let userWhoPostedDiv = document.createElement('div')
        userWhoPostedDiv.className = 'feed-post-user-info-div'
        showComments(sessionMainFeed[i].id)
        
        imgContainer.append(img)
        postContainer.append(userWhoPosted,imgContainer,causeIcon,postText,commentFeed,commentsAndLikesDiv)
        document.getElementById('main-feed').appendChild(postContainer)
    }

    // //console.log(`sessionMainFeed[i]:${sessionMainFeed[i]}`)

}

window.addEventListener('DOMContentLoaded',pullPostData)

/*
const getCommentsAndLoadIntoCommentFeed = async (evt) => {
    let postId = evt.target.parentNode.parentNode.parentNode.id
    console.log(postId)
    let commentsOnPost = await fetch('/feed/getcomments', {
        method:'POST'
    })

    //XXXXXX this is coming out undefined
    commentsOnPost = commentsOnPost.json()
    //console.log(`The JSON of commentsOnPost is: ${JSON.stringify(commentsOnPost)}`)

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
        //console.log(`data.username: ${commentsOnPost.username}`)
    // }
    //XXXXXX HOW DO WE MAKE IT LOAD THE NEW COMMENTS POSTED WITHOUT RELOADING?
    // window.location = `/feed/#${sessionMainFeed[i].id}`
}
*/