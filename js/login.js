let loginusername = document.querySelector("#username");
let loginpassword = document.querySelector("#password");

let loginBtn = document.querySelector("#signIn");

let alluserslogin = JSON.parse(localStorage.getItem('allusers')) || usersDb;

loginBtn.addEventListener('click', login); 

function login(e){

    e.preventDefault();
    
    if(loginusername.value === "" || loginpassword.value === ""){
        
        alert("Required Data Missing");
        
    } else {
        
        let loguser = alluserslogin.find((u) => u.username === loginusername.value || u.email === loginusername.value);
        
        let check = (loguser.username && loguser.username.trim() === loginusername.value.trim() || loguser.email && loguser.email.trim() === loginusername.value.trim()) 
        
        && (loguser.password && loguser.password === loginpassword.value );
        
        if(check){

            localStorage.setItem('current', loguser.username);
            localStorage.setItem('useremail', loguser.email)

            setTimeout(() => {

                window.location = 'index.html';

            }, 1500);

        } else {

            alert("Username / Email Or Password is Wrong");
        }
    }
}
