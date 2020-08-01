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
        let img = document.createElement('img')
        img.setAttribute('src',profileFeed[i])
        document.getElementById('profile-feed').appendChild(img)
    }

    console.log(profileFeed)

}

window.addEventListener('DOMContentLoaded',pullPostDataFromServer)