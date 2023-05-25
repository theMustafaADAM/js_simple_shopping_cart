let products = JSON.parse(localStorage.getItem('products')) || productsDb;

let productDom = document.querySelector('.products');
let noProducts = document.querySelector('.noProducts');
let noProductsInner = document.querySelector('.noProducts h6');
let drawmyProductsUI;

let favouriteAddedItems = localStorage.getItem('ProductInFavourite') ? JSON.parse(localStorage.getItem('ProductInFavourite')) : [];

// ======================================================================

theCart.addEventListener('click', openCartMenu);

// ======================================================================

if(addedItems){
    
    addedItems.map((item) => {

        cartContentDiv.innerHTML += `<p>${item.title} ${item.qty}</p>`;
    });

    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += addedItems.length;
};

// ======================================================================

(drawmyProductsUI = function(prods = []){

    let myproducts = prods.filter((prd) => prd.isMe === true);
    
    if (myproducts) {

        noProducts.style.display = 'none';

        let productsUI = myproducts.map((prd) => {

            return `
            <div class="product flxbtween w-full mb-10 rad-6 pt-50 l-float" >
                <img src="${prd.imgUrl}" alt="${prd.title} image" class="mr-10 w-qrtr rad-6 p-5 brdr-ligh ">

                <div class="prd-title flxeven flxgrw2 txt-l pr-10 pl-10">

                    <h3 class=" ptb-10z pointr ds-block mr-auto w-full brdrb-2purple " title="click for details" onclick='saveItemId(${prd.id})'>${prd.title}</h3>
                    <p class="fw-lighter mt-10 fs-14 ds-block mr-auto">${prd.subTitle} dolor sit, adipisicing! <br>${prd.title}amet consectetur adipisicing.</p>
                    <span class=" fs-smller c-purple fs-16 ds-block mr-auto bg-ligh rad-10 p-10 brdr-purple mt-10 mb-10">Size: ${prd.size}</span>
                    <div class=" ds-block">
                        <i id=edit class="ds-inblock mr-5 fa fa-edit fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c " title="Update ${prd.title}" onclick = 'editProduct(${prd.id})'></i>            
                        <i id=delet class="ds-inblock fa fa-eraser fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c " title= "Delete ${prd.title}" onclick = 'deletProduct(${prd.id})'></i>            
                    </div>
                </div>

                <div class="prdAction flxeven flxone txt-c">
                    <button type=button class="add-to-cart pt-10 pb-10 pr-15 pl-15 bg-purple c-white brdr-zero fs-12 pointr ds-block m-auto rad-6" onclick = "addedToCart(${prd.id})" >Add to Cart</button>
                    <form class=" ptb-20z w-300 ds-block mr-auto ">
                        <lable for=number class="fw-nrml c-purple fs-16">Quantity: </lable>
                        <input type="number" id="number" value="${prd.qty}" title=quantity class="qtty c-purple brdr-2ligh txt-c m-0 w-40 h-40" />
                    </form>
                    <i id=like class=" fa fa-heart-o fa-2x pointr c-white ds-block m-auto h-40 w-55 linhig-40 rad-10 p-auto ${ prd.liked == true ? 'bg-red' : 'bg-purple' } " title= "Like ${prd.title} " onclick = 'addTofavourites(${prd.id})'></i>
                </div>

            </div>`;
        });

        productDom.innerHTML = productsUI.join("");
        
    } else {

        noProducts.style.display = 'block';
        noProductsInner.innerHTML = `There is No Products to Show <br><a href="index.html" class="fs-16">Back to Products Page</a>`;
    }

})(JSON.parse(localStorage.getItem('products')) || productsDb);


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

function saveItemId(id) {

    localStorage.setItem('prdId', id);
    window.location = 'products.html';

}

function editProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'editProduct.html';
}

function deletProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'deletProduct.html';
}

function addedToCart(id) {
    if(localStorage.getItem("Username")){
        let products = JSON.parse(localStorage.getItem('products')) || productsDb;
        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItems.some((i) => i.id === product.id);

        if (isProductInCart) {
            addedItems = addedItems.map((p) => { 
                if (p.id === product.id ) p.qty += 1;
                return p; 
            })  
        } else {
            addedItems.push(product);
        }
        cartContentDiv.innerHTML = "";
        addedItems.forEach((item) => {
            cartContentDiv.innerHTML += `<p>${item.title} ${item.qty}</p>`;
        });

        // Save Data
        localStorage.setItem('ProductInCart', JSON.stringify(addedItems));        
        
        // Add Items Count
        let itemsCount = document.querySelectorAll('.cart-content div p');
        badgeDom.style.display = 'inline-block';
        badgeDom.innerHTML = itemsCount.length;
    } else {
        window.location = "login.html";
    }
}

function addTofavourites(id) {
    if(localStorage.getItem("Username")){
        let products = JSON.parse(localStorage.getItem('products')) || productsDb;
        let product = products.find((item) => item.id === id);
        let isProductLicked = favouriteAddedItems.some((i) => i.id === product.id);
        
        if (isProductLicked) {
            
            product.liked = false;


            // favouriteAddedItems = favouriteAddedItems.map((p) => {
            //     if(p.id === product.id) p.liked = false;
            //     console.log(p.liked);
            //     return p;
            // })


            favouriteAddedItems = [...favouriteAddedItems, product];
            let uniqueProduct = getUniqueProduct(favouriteAddedItems, "id");

            // Save Data
            localStorage.setItem('ProductInFavourite', JSON.stringify(favouriteAddedItems));
            
            products.map((item) => {
                if (item.id === product.id) {
                    item.liked = false;
                }
            });
            localStorage.setItem('products', JSON.stringify(products));

        } else {

            product.liked = true;

            // favouriteAddedItems = favouriteAddedItems.map((p) => {
            //     if(p.id === product.id) p.liked = true;
            //     return p;
            // })


            favouriteAddedItems = [...favouriteAddedItems, product];
            let uniqueProduct = getUniqueProduct(favouriteAddedItems, "id");

            // Save Data
            localStorage.setItem('ProductInFavourite', JSON.stringify(favouriteAddedItems));

            products.map((item) => {
                if (item.id === product.id) {
                    item.liked = true;
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
    } else {
        window.location = "login.html";
    }
}

function getUniqueProduct(arr, filterType){
    let unique = arr
    .map(item => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
    return unique;
}    