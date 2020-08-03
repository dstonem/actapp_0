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
        postLink.append(img)
        document.getElementById('profile-feed').appendChild(postLink)
    }

    console.log(profileFeed)

}

window.addEventListener('DOMContentLoaded',pullPostDataFromServer)