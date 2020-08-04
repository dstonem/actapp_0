let uploadProfilePic = () => {
    // event.preventDefault()

    // let profilePicForm = document.createElement('form')
    // profilePicForm.className = 'profile-pic-upload-form'

    // let profilePicUpload = document.createElement('input')
    // profilePicUpload.setAttribute('type','file')
    // profilePicUpload.innerText = 'Upload Picture'
    // let profilePicUploadButton = document.createElement('button')

    // profilePicUploadButton.addEventListener('click',uploadProfilePic)

    // profilePicForm.append(profilePicUpload,profilePicUploadButton)
    
    let profilePicDiv = document.getElementById('profile-img')
    // profilePicDiv.append(profilePicForm)

    // let profilePic = document.getElementById('profile-img')
    // //store in DB, then retrieve it in another function
    // profilePic.setAttribute('src',profilePicUpload.value)

    var ahDiv = document.createElement("div"); // -- <div>
    ahDiv.className = "ava-group"; // -class/CSS
    profilePicDiv.append(ahDiv); // <div>"main" -> <div>"ava-group"
    //
    var ahsDiv = document.createElement("div"); // -- <div>for styling
    ahsDiv.className = "avag-style"; // -class/CSS
    ahDiv.append(ahsDiv); // <div>"ava-group" -> <div>"avag-style"
    //
    var ahLab = document.createElement("label"); // -- <label>
    ahLab.setAttribute("id","ava-html");
    ahLab.className = "ava-label"; // -class/CSS
    ahLab.setAttribute("for","avatar");
    ahDiv.append(ahLab); // <div>"ava-group" -> <label>"ava-html"
    //
    var ahImg = document.createElement("img"); // -- <img>
    ahImg.setAttribute("id","img-upload");
    ahImg.className = "ava-img"; // -class/CSS
    ahImg.setAttribute("src","/images/icons/default_ava.png");
    ahLab.appendChild(ahImg);
    //
    var ahbDiv = document.createElement("div"); // -- <div>
    ahbDiv.className = "col-md-6"; // bootstrap
    ahDiv.appendChild(ahbDiv); // <div>"ava-group" -> <div>bootstrap
    //
    var ahInput = document.createElement("input"); // -- <input>
    ahInput.setAttribute("id","avatar");
    ahInput.setAttribute("name","avatar");
    ahInput.setAttribute("type","file");
    ahInput.className = "ava-control"; // -class/CSS
    ahbDiv.appendChild(ahInput); // - <div>bootstrap -> <input>"avatar"
    //
    // Avatar 
    function avatarFile(){
        if (this.files && this.files[0]){
            let readFile = new FileReader();
            readFile.onload = function (e){
                document.getElementById("img-upload").src = e.target.result;
                document.getElementById("img-upload").style.width = "80px";
            };
            readFile.readAsDataURL(this.files[0]);
        };
    };
    document.getElementById("avatar").addEventListener("change",avatarFile,false);
}

const pullPostDataFromServer = async () => {
    uploadProfilePic()
    let allUsersPosts = await fetch('/profile', {
        method:'POST'
    })
    allUsersPosts = await allUsersPosts.json()
    allUsersPosts.sort(function(a, b) {
        return b.id - a.id;
    })

    let profileFeed = []

    for(let i = 0; i < allUsersPosts.length; i++){
        console.log(allUsersPosts[i])
        profileFeed.push(allUsersPosts[i].picurl)
    }

    for(let i = 0; i < profileFeed.length; i++){
        let div = document.createElement('div')
        div.setAttribute('class','profile-feed-post-container')
        let postLink = document.createElement('a')
        postLink.setAttribute('href',`${allUsersPosts[i].picurl}`)
        // let imgDiv = document.createElement('div')
        // imgDiv.className('profile-feed-img-container')
        let img = document.createElement('img')
        img.setAttribute('src',profileFeed[i])
        img.setAttribute('class','profile-feed-img')
        let causeIcon = document.createElement('img')
        causeIcon.className = "cause-icons"
        allUsersPosts[i].causes == 'blm' ? causeIcon.setAttribute('src','/images/icons/blm_icon.png') : null
        allUsersPosts[i].causes == 'election' ? causeIcon.setAttribute('src','/images/icons/election_icon.png') : null
        allUsersPosts[i].causes == 'climate' ? causeIcon.setAttribute('src','/images/icons/environment_icon.png') : null
        
        postLink.append(img,causeIcon)
        div.appendChild(postLink)
        document.getElementById('profile-feed').appendChild(div)
    }

    console.log(profileFeed)

}

window.addEventListener('DOMContentLoaded',pullPostDataFromServer)