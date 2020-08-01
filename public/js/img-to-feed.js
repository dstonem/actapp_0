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
        console.log(`Object ${i}: ${postsFromUsersCauses[i]}`)
        sessionMainFeed.push(postsFromUsersCauses[i])
    }

    for(let i = 0; i < sessionMainFeed.length; i++){

        let postContainer = document.createElement('div')
        postContainer.className = "feed-post-container"
        // postContainer.setAttribute('id',`${sessionMainFeed[i].id}`)
        console.log(`post id:${sessionMainFeed[i].id}`)

        let imgContainer = document.createElement('div')
        imgContainer.className = "main-feed-img-container"

        //if width>height set classname to horizontal (something that centers on the middle of the image from left to right)
        //if height>width set classname to vertical (something that centers the image from top to bottom)
        let img = document.createElement('img')
        img.setAttribute('src',`${sessionMainFeed[i].picurl}`)
        console.log(`post picurl:${sessionMainFeed[i].picurl}`)

        let postText = document.createElement('p')
        postText.innerText = `${sessionMainFeed[i].body}`
        console.log(`post body:${sessionMainFeed[i].body}`)

        let cause = document.createElement('img')
        cause.className = "icons"
        sessionMainFeed[i].tags == 'blm' ? cause.setAttribute('src','/images/icons/blm_icon.png') : null
        sessionMainFeed[i].tags == 'election' ? cause.setAttribute('src','/images/icons/election_icon.png') : null
        sessionMainFeed[i].tags == 'environment' ? cause.setAttribute('src','/images/icons/environment_icon.png') : null
        console.log(`post cause:${sessionMainFeed[i].tags}`)

        let userWhoPosted = document.createElement('p')
        userWhoPosted.innerText = `${sessionMainFeed[i].user_id}`
        userWhoPosted.className = 'user-who-posted'
        console.log(`post user_id:${sessionMainFeed[i].user_id}`)
        
        imgContainer.append(img)
        postContainer.append(userWhoPosted,imgContainer,postText,cause)
        document.getElementById('main-feed').appendChild(postContainer)
    }

    // console.log(profileFeed)

}

window.addEventListener('DOMContentLoaded',pullPostData)