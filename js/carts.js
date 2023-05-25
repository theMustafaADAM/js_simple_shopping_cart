let productDom = document.querySelector('.products');
let noProducts = document.querySelector('.noProducts');
let noProductsInner = document.querySelector('.noProducts h6');
let products = JSON.parse(localStorage.getItem('products')) || productsDb;

theCart.addEventListener('click', openCartMenu);

let cartAddedItems = localStorage.getItem('ProductInCart') 
? JSON.parse(localStorage.getItem('ProductInCart')) 
: [];

if(cartAddedItems){
    cartAddedItems.map((item) => { cartContentDiv.innerHTML += `<p>${item.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half w-10 h-10">${item.qty}</span></p>`; });
    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += cartAddedItems.length;
};

let drawCartProductsUI;
(drawCartProductsUI = function(allProducts = []){

    if(!JSON.parse(localStorage.getItem("ProductInCart"))) {

        noProducts.style.display = 'block';
        noProductsInner.innerHTML = `There is No Products to Show <br><a href="index.html" class="fs-16">Back to Products Page</a>`;
    
    } else {

        noProducts.style.display = 'none';

        let products = JSON.parse(localStorage.getItem("ProductInCart")) || allProducts;
        
        let productsUI = products.map((item) => {
            return `
            <div class="product flxbtween w-full mb-10 pt-25 pb-30">
                <img src="${item.imgUrl}" alt="alarm image" class="mr-10 w-qrtr rad-6 p-5 brdr-ligh">
                <div class="prd-title flxeven flxgrw2 txt-l pr-10 pl-10">
                    <h3 class=" ptb-10z pointr ds-block mr-auto brdrb-2ligh w-full" onclick='saveItemId(${item.id})'>${item.title}</h3>
                    <p class="fw-lighter fs-14">${item.subTitle} dolor sit, adipisicing! <br>${item.title}amet consectetur adipisicing.</p>
                    <span class="fw-nrml c-purple fs-16">Size: ${item.size}</span>                    
                    <span class="fw-nrml c-purple fs-16">Quantity: 
                    </span>
                    </div>
                    <div class="prdAction flxcenter flxone txt-r">
                    <button type=button class="remove-from-cart pt-10 pb-10 pr-15 pl-15 bg-ligh c-red brdr-red rad-6 fs-12 pointr ds-block ml-auto" onclick='removeFromCart(${item.id})'" >Remove From Cart</button>
                    <form class=" pt-50 txt-r w-300 ds-block mr-auto ">
                        <div class="value-button ds-inblock w-40 h-30 txt-c bg-purple linhig-30 fw-bloder fs-20 c-white pointr brdr-2ligh p-auto" id="decrease" value="Decrease Value">-</div>
                            <input type="number" id="number" value="${item.qty}" class="qtty c-purple brdr-2ligh txt-c m-0 w-40 h-40" />
                        <div class="value-button ds-inblock w-40 h-30 txt-c bg-purple linhig-30 fw-bloder fs-20 c-white pointr brdr-2ligh p-auto" id="increase" value="Increase Value">+</div>
                    </form>                    
                </div>                    
            </div>`;
        });
        productDom.innerHTML = productsUI.join("");
    }
})(JSON.parse(localStorage.getItem('ProductInCart')) || cartAddedItems);

function removeFromCart(id) {

    let productsInCart = localStorage.getItem("ProductInCart"); 

    if(productsInCart){

        let items = JSON.parse(productsInCart);        
        let filteredItems = items.filter((item) => item.id !== id);     
        
        localStorage.setItem('ProductInCart', JSON.stringify(filteredItems));
        badgeDom.innerHTML = filteredItems.length;    
        drawCartProductsUI(filteredItems);

    }else {

        drawCartProductsUI(productsInCart);

    }
};

function saveItemId(id) {
    localStorage.setItem('prdId', id);
    window.location = 'products.html';
}

// ==================================================== Quantity

function increaseValue(id) {
    if(localStorage.getItem("Username")){     
        let choosenItem = 
        JSON.parse(localStorage.getItem("ProductInCart")).find((item) => item.id === id);
        if (choosenItem.qty) {
            choosenItem.qty += 1; theQty++;
            console.log(theQty);
        }
        
    } else {
        window.location = "login.html";
    }
}

function decreaseValue(id, value) {
    var value = parseInt(document.querySelector('.qtty').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.querySelector('.qtty').value = value;
}