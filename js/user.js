let usersDb = [

    {id: 1, isAdmin: true, email: 'admin@admin.me', username: 'admin', password: '123me', fullname: 'admin user', phone: 50505050 , imgurl: 'imgs/avatar.webp'},

];

let userInfo = document.querySelector("#userInfo");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutBtn = document.querySelector("#logout");

let allusers = JSON.parse(localStorage.getItem('allusers')) || usersDb;

let crrnnt = localStorage.getItem('current');

if(crrnnt){

    links.remove();

    userInfo.style.display = "flex";

    userDom.innerHTML = crrnnt;
}

logoutBtn.addEventListener('click', function(){

    // localStorage.clear();

    setTimeout(() => {

        window.location = "register.html";

    }, 1500);
});

