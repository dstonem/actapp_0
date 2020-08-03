const pullPostDataFromServer = async () => {

    let allUsersPosts = await fetch('/profile', {
        method:'POST'
    })
    allUsersPosts = await allUsersPosts.json()

    let profileFeed = []

    for(let i = 0; i < allUsersPosts.length; i++){
        console.log(allUsersPosts[i])
        profileFeed.push(allUsersPosts[i].picurl)
    }

    for(let i = 0; i < profileFeed.length; i++){
        let postLink = document.createElement('a')
        postLink.setAttribute('href',`/feed#${allUsersPosts[i].id}`)
        let img = document.createElement('img')
        img.setAttribute('src',profileFeed[i])
        img.setAttribute('class','main-feed-img-container')
        let div = document.createElement('div')
        div.setAttribute('class','feed-post-container')
        div.appendChild(img)
        let main = document.createElement('div')
        main.setAttribute('id','main-feed')
        main.appendChild(div)
        postLink.append(main)
        document.getElementById('profile-feed').appendChild(postLink)
    }

    console.log(profileFeed)

}

window.addEventListener('DOMContentLoaded',pullPostDataFromServer)