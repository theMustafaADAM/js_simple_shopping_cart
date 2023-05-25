
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let productDom = document.querySelector('.products');

let drawfavProductsUI;

let noProducts = document.querySelector('.noProducts');
let noProductsInner = document.querySelector('.noProducts h6');



let favAddedItems = localStorage.getItem('ProductInFavourite') 
? JSON.parse(localStorage.getItem('ProductInFavourite')) 
: [];

if(favAddedItems){

    favAddedItems.map((item) =>{

        favContentDiv.innerHTML += `<p>${item.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half w-10 h-10">${item.qty}</span></p>`;
    });

    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += favAddedItems.length;
};


(drawfavProductsUI = function(allProducts = []){

    if(!JSON.parse(localStorage.getItem("ProductInFavourite"))) {

        noProducts.style.display = 'block';
        noProductsInner.innerHTML = `There is No Liked Products to Show <br><a href="index.html" class="fs-16">Back to Products Page</a>`;
    
    } else {

        noProducts.style.display = 'none';

        let products = JSON.parse(localStorage.getItem("ProductInFavourite")) || allProducts;
        
        let productsUI = products.map((item) => {

            return `
            <div class="product flxbtween w-full mb-10 pt-25 pb-30">
                <img src="${item.imgUrl}" alt="alarm image" class="mr-10 w-qrtr rad-6 p-5 brdr-ligh">
                <div class="prd-title flxeven flxgrw2 txt-l pr-10 pl-10">
                    <h3 class=" ptb-10z pointr ds-block mr-auto brdrb-2ligh w-full" onclick='saveItemId(${item.id})'>${item.title}</h3>
                    <p class="fw-lighter fs-14">${item.subTitle} dolor sit, adipisicing! <br>${item.title}amet consectetur adipisicing.</p>
                    <span class="fw-nrml c-purple fs-16">Size: ${item.size}</span>                    
                </div>

                <div class="prdAction flxcenter flxone txt-r">
                    <button type=button class="remove-from-fav pt-10 pb-10 pr-15 pl-15 bg-ligh c-red brdr-red rad-6 fs-12 pointr ds-block ml-auto" onclick='removeFromfav(${item.id})'" >Remove From fav</button>
                    <form class=" pt-50 txt-r w-300 ds-block mr-auto ">
                        <lable for=number class="fw-nrml c-purple fs-16">Quantity: </lable>
                        <input type="number" id="number" value="${item.qty}" title=quantity class="qtty c-purple brdr-2ligh txt-c m-0 w-40 h-40" />
                    </form>                    
                </div>
            </div>`;
        });

        productDom.innerHTML = productsUI.join("");
    }
})(JSON.parse(localStorage.getItem('ProductInFavourite')) || favAddedItems);

function removeFromfav(id) {

    let productsInfav = localStorage.getItem("ProductInFavourite"); 

    if(productsInfav){

        // 1 - make this products.liked = false from products
        
        let products = JSON.parse(localStorage.getItem("products")) || allProducts;

        let unlike = products.find((p) => p.id === id);

        unlike.liked = false;
        
        localStorage.setItem('products', JSON.stringify(products));


        // 2 - remomved from productsInFav list

        let items = JSON.parse(productsInfav);        
        
        let filteredFavItems = items.filter((item) => item.id !== id);  
        
        localStorage.setItem('ProductInFavourite', JSON.stringify(filteredFavItems));

        badgeDom.innerHTML = filteredFavItems.length;

        drawfavProductsUI(filteredFavItems);

    }else {

        drawfavProductsUI(JSON.parse(localStorage.getItem('ProductInFavourite')) || favAddedItems);
    }
};


function saveItemId(id) {

    localStorage.setItem('prdId', id);
    window.location = 'products.html';
    
}

