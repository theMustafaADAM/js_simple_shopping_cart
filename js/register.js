// Register User
let logusername = document.querySelector("#userName");
let logemail = document.querySelector("#email");
let logpassword = document.querySelector("#password");
let logphone = document.querySelector("#phone");
let logname = document.querySelector("#name");

let registBtn = document.querySelector("#signUp");

registBtn.addEventListener('click', register);

function register(e){
    
    e.preventDefault();

    let allusers = JSON.parse(localStorage.getItem('allusers')) || usersDb;

    if(logusername.value === "" || logemail.value === "" || logpassword.value === "" || logphone.value === "" || logname.value === ""){

        alert("Required Data Missing");

    } else {

        let user_obj = { id: allusers.length +1, isAdmin: false, email: logemail.value, username: logusername.value, password: logpassword.value, fullname: logname.value, phone: logphone.value, imgurl: 'imgs/avatar.webp'};

        let new_user = allusers ? [...allusers, user_obj] : [user_obj];

        localStorage.setItem('allusers', JSON.stringify(new_user));

        setTimeout(() => {

            window.location = 'login.html';

        }, 1500);
    }
}