
// Define Product
let productDom = document.querySelector('.products');
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let theUser = document.getElementById('user');
let like = document.getElementById('like');
let filterSize = document.getElementById('filter_size');

// Open cart Menu

// Open Profile User
theUser.addEventListener('click', goToProfile);

// Display Producst automatic
let drawProductsUI;
(drawProductsUI = function(prds = []){

    let productsUI = prds.map((prd) => {

        return `
        <div class="product flxbtween w-full mb-10 rad-6 pt-50 l-float" >
            <img src="${prd.imgUrl}" alt="${prd.title} image" class="mr-10 w-qrtr rad-6 p-5 brdr-ligh ">
            <div class="prd-title flxeven flxgrw2 txt-l pr-10 pl-10">
                <h3 class=" ptb-10z pointr ds-block mr-auto w-full ${ prd.isMe === true ? 'brdrb-2purple' : 'brdrb-2ligh'} " title="click for details" onclick='saveItemId(${prd.id})'>${prd.title}</h3>
                <p class="fw-lighter mt-10 fs-14 ds-block mr-auto">${prd.subTitle} dolor sit, adipisicing! <br>${prd.title}amet consectetur adipisicing.</p>
                <span class=" fs-smller c-purple fs-16 ds-block mr-auto bg-ligh rad-10 p-10 brdr-purple mt-10 mb-10">Size: ${prd.size}</span>
                <div class=" ds-block">
                    <i id=edit class="ds-inblock mr-5 fa fa-edit fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c ${ prd.isMe === true ? 'ds-block' : 'ds-non'} " title="Update ${prd.title}" onclick = 'editProduct(${prd.id})'></i>            
                    <i id=delet class="ds-inblock fa fa-eraser fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c ${ prd.isMe === true ? 'ds-block' : 'ds-non'} " title= "Delete ${prd.title}" onclick = 'deletProduct(${prd.id})'></i>            
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

})(JSON.parse(localStorage.getItem('products')) || productsDb);


function addedToCart(id) {

    if(localStorage.getItem("current")){
        
        // Call All Products 
        let products = JSON.parse(localStorage.getItem('products')) || productsDb;

        // Find only one matching my product id I want to add to cart
        let product = products.find((p) => p.id === id);
        
        // Search if my product In cart
        let isProductInCart = addedItems.some((i) => i.id === product.id);

        // If You find some id's In cart
        if (isProductInCart) {

            // Search In id's to .. 
            addedItems = addedItems.map((p) => { 

                // ... increace qty if you find any
                if (p.id === product.id ) p.qty += 1;

                // then Exit
                return p; 
            })  

        } else {

            // Push my product i want to add to cart into my array
            addedItems.push(product);
        }

        // Clear any old data
        cartContentDiv.innerHTML = "";

        // For each item in that array
        addedItems.forEach((item) => {

            // Add it to my HTML
            cartContentDiv.innerHTML += `<p>${item.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half w-10 h-10">${item.qty}</span></p>`;
        });

        // Save my new array 
        localStorage.setItem('ProductInCart', JSON.stringify(addedItems));        
        
        // Count All item you just added
        let itemsCount = document.querySelectorAll('.cart-content div p');

        // Show the counter
        badgeDom.style.display = 'inline-block';

        // Display the number
        badgeDom.innerHTML = itemsCount.length;

    } else {

        window.location = "login.html";
    }
}

let favouriteAddedItems = localStorage.getItem('ProductInFavourite') ? JSON.parse(localStorage.getItem('ProductInFavourite')) : [];

function addTofavourites(id) {

    if(localStorage.getItem("current")){

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
            drawProductsUI(products);

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
            drawProductsUI(products);            
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

function saveItemId(id) {
    localStorage.setItem('prdId', id);
    window.location = 'products.html';
}

function goToProfile(current){
    localStorage.setItem('current', current);
    window.location = 'profile.html';
}

function editProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'editProduct.html';
}

function deletProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'deletProduct.html';
}

// Search Products
let searchInput = document.querySelector('#prdSearch');
searchInput.addEventListener('keyup', function(e){
    search(e.target.value, JSON.parse(localStorage.getItem('products')));

    if(e.target.value.trim() === ""){
        drawProductsUI(JSON.parse(localStorage.getItem('products')));
    }
});

function search(title, myArray) {
    let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drawProductsUI(arr);
}

// Filter Products By a Size
filterSize.addEventListener('change', getProductsFilteredBySize);

function getProductsFilteredBySize(e){
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem('products')) || productsDb;
    if(val === 'all'){
        drawProductsUI(JSON.parse(localStorage.getItem('products')) || products);
    } else {
        products = products.filter((i) => i.size === val);
        drawProductsUI(products);
    }
}

window.onscroll = function() {myFunction()};

// Get the header
var header = document.querySelector ("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

/* ============================== NEW =====================================================
    
    let productsInfav = localStorage.getItem("ProductInFavourite"); 

    if(productsInfav){

        // 1 - make this products.liked = false from products
        
        let products = JSON.parse(localStorage.getItem("products")) || allProducts;

        let unlike = products.find((p) => p.id === id);

        unlike.liked = true;
        
        localStorage.setItem('products', JSON.stringify(products));

        // 2 - Add to productsInFav list

        let items = JSON.parse(productsInfav);        
        
        let selectFavItems = items.find((p) => p.id !== id);  
        
        localStorage.setItem('ProductInFavourite', JSON.stringify(selectFavItems));

        // badgeDom.innerHTML = filteredFavItems.length;

        drawProductsUI(selectFavItems);

    }else {

        drawProductsUI(JSON.parse(localStorage.getItem('ProductInFavourite')) || favouriteAddedItems);
    }
    */

/* ============================= OLD ========================================================
    
    if(localStorage.getItem("current")){

        // 1- Add the Product to my favourite list
        // Call All Products
        let products = JSON.parse(localStorage.getItem('products')) || productsDb;

        // Find only one matching my product id I want to add to my Favourites
        let product = products.find((p) => p.id === id);

        // Search if my product In the array's favourite
        let isProductLicked = favouriteAddedItems.some((i) => i.id === product.id);
        
        // If You find some id's In Favourite
        if (isProductLicked) {
            
            // product.liked = false;

            // Search In list to .. 
            favouriteAddedItems = favouriteAddedItems.map((p) => {

            // ... if you did not find any push to array
            if(p.id !== product.id) favouriteAddedItems.push(product);

            })
            
            // favouriteAddedItems = [...favouriteAddedItems, product];
            // let uniqueProduct = getUniqueProduct(favouriteAddedItems, "id");

            // Save my new favourite array
            localStorage.setItem('ProductInFavourite', JSON.stringify(favouriteAddedItems));
            
            // 2- Make Product.liked = true
            // Call all Products again and Search
            products.map((item) => {

                // in list to make product.liked = true
                if (item.id === product.id) item.liked = true;
            });

            // Save my new products array
            localStorage.setItem('products', JSON.stringify(products));
            
            // draw new products array after update
            drawProductsUI(products);
            
        } else { drawProductsUI(products); }

    } else {

        window.location = "login.html";
    }
*/
// ==========================================================================================