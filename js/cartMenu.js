

let cartContentDiv = document.querySelector('.cart-content div');
let cartContent = document.querySelector('.cart-content');

let favContentDiv = document.querySelector('.fav-content div');
let favContent = document.querySelector('.fav-content');

let badgeDom = document.querySelector('.badge');

let theCart = document.querySelector('.theCart');
let theLike = document.querySelector('.theLike');


theCart.addEventListener('click', openCartMenu);
theLike.addEventListener('click', openfavMenu);



let addedItems = localStorage.getItem('ProductInCart') ? JSON.parse(localStorage.getItem('ProductInCart')) : [];

if(addedItems){

    addedItems.map((item) => {

        cartContentDiv.innerHTML += `<p>${item.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half">${item.qty}</span></p>`;

    });

    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += addedItems.length;
};


function openCartMenu(){
    
    if(cartContentDiv.innerHTML != ""){

        if(cartContent.style.display == 'inline-block'){

            cartContent.style.display = 'none';
            badgeDom.style.display = 'none';

        } else {
            
            cartContent.style.display = 'inline-block';
            badgeDom.style.display = 'inline-block';
        }
    }
}


function openfavMenu(){

    if(favContentDiv.innerHTML != ""){

        if(favContent.style.display == 'inline-block'){
            favContent.style.display = 'none';
            badgeDom.style.display = 'none';

        } else {

            favContent.style.display = 'inline-block';
            badgeDom.style.display = 'inline-block';
        }
    }
}
