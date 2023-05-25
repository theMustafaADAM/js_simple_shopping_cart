
// ================================    Variables

let crrnt = localStorage.getItem('useremail');
allusers = JSON.parse(localStorage.getItem('allusers')) || usersDb;
let getuser = allusers.find((u) => u.email === crrnt);

let edit_fullname = document.querySelector('#user_fullname');
let edit_phone = document.querySelector('#user_phone');
let edit_profile_img = document.querySelector('#profile_img');
let update_form = document.querySelector('#update_user');

let usersDom = document.querySelector('.userDetails');
let like = document.getElementById('like');

let showMeData;

// =========================  Events

// update_form.addEventListener('submit', update_user_data);

// ==============================  functions

(showMeData = function(showUser = []){

    let mail = localStorage.getItem('useremail');
    
    let user = showUser.filter((s) => s.email === mail);

    if(user){

        let showUserUI = user.map((u) => {

            return `
            <div class=" pr-120 w-half">
                <div class=" txt-l p-30 mb-40 brdr-purple w-sixty">
                    <img src="${u.imgurl}" alt="avatar image" id="avatar" class=" w-150 h-150 p-5 h-fit">
                </div>
                <div class="w-full brdrb-2ligh pb-10 mt-25"><a href="cartProducts.html" class="mt-20 mb-10 fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple w-full">My Cart</a></div><br >
                <div class="w-full brdrb-2ligh pb-10"><a href="favourites.html" class="mt-20 mb-10 fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple w-full">My Favourites</a></div><br>
                <div class="w-full brdrb-2ligh pb-10"><a href="myProducts.html" class="mt-20 mb-10 fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple w-full">My Additional Products</a></div><br>
            </div>
            <div class="prdDESC pr-40">
                <form class=" pl-120 pr-120 fs-14 fw-lighter mb-15 mb-30 txt-l" id="update_user" >
                    <label for="user_name" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">User Name</label><br>
                    <input type="text" name="" value="${u.username}" id="user_name" readonly class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero"><br>
                    <label for="user_password" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">User Password</label><br>
                    <input type="password" name="" value="${u.password}" id="user_password" readonly class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero"><br>
                    <label for="user_fullname" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">User Full Name</label><br>
                    <input type="text" name="" id="user_fullname" value="${u.fullname}" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero"><br>
                    <label for="user_phone" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">User Phone Number</label><br>
                    <input type="tel" name="" id="user_phone" value="${u.phone}" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero"><br>
                    <label for="user_email" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">User Email</label>
                    <input type="text" name="email" id="user_email" value ="${u.email}" readonly class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero">
                    <label for="profile_img" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">Choose a Profile Image</label>
                    <input type="file" alt="Profile Image" id="profile_img" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-25 brdr-zero" accept="image/png, image/jpeg, image/webp">
                    <input type="submit" class=" pt-10 pb-10 pr-15 pl-15 rad-6 bg-purple c-white brdr-zero fs-14 pointr m-auto w-half h-48 mt-25" value="Update Profile" onclick = "update_user_data()">
                </form>      
            </div>`;
        });
        usersDom.innerHTML = showUserUI.join("");

    } else {

        usersDom.innerHTML = `There is No Data to Show <br><a href="login.html" class="fs-16">Login again</a>`;
    }

})(JSON.parse(localStorage.getItem('allusers')) || usersDb);

function update_user_data(e){

    e.preventDefault();
    
    let val_fname = getuser.fullname = edit_fullname.value;
    let val_phone = getuser.phone = edit_phone.value;
    let val_img = getuser.imgurl = edit_profile_img.value.replace("C:\\fakepath\\", "imgs/");


    if (val_fname && val_phone && val_img) {
        
        localStorage.setItem('allusers', JSON.stringify(allusers));

        showMeData(allusers);

        setTimeout(() => { window.location = "profile.html"; }, 750);
    
    } else {

        alert ("Missing Data");        
    }
}


