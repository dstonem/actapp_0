

const pullPostDataFromServer = () => {

    let allUsersPosts = []

    console.log('working')

    fetch('/profile', {
        method:'POST'
    })
    .then(resp=>resp.json())
    .then(data=>{
        for(let i = 0; i < data.length;i++){
            allUsersPosts.push(data[i].picurl)
        }
        console.log(`allUsersPosts: ${allUsersPosts}`)
    })
    .catch(err=>console.log(err))

    console.log(`allUsersPosts.length: ${allUsersPosts.length}`)

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

let button = document.getElementById('showFeed')
button.addEventListener('click',pullPostDataFromServer)
// window.onload(pullPostDataFromServer)

module.exports = pullPostDataFromServer