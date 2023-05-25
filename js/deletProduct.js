// let products = productsDb;
let products = JSON.parse(localStorage.getItem('products')) || productsDb;


let prdId = localStorage.getItem('prdId');


let prdDetails = products.find( (item) => item.id == prdId );


let itemDom = document.querySelector('.itemDetails');
let theLike = document.getElementById('like');

theCart.addEventListener('click', openCartMenu);

let cartAddedItems = localStorage.getItem('ProductInCart') 
? JSON.parse(localStorage.getItem('ProductInCart')) 
: [];

if(cartAddedItems){
    cartAddedItems.map(item => { cartContentDiv.innerHTML += `<p>${item.title} ${item.qty}</p>`; });
    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += cartAddedItems.length;
};

let drawMyProductUI;
(drawMyProductUI = function(theProds = []) {

    let myProducts = theProds.filter((prd) => prd.isMe === true);

    if(myProducts.length !== 0)
    {
        let myProdsUI = myProducts.map((prdDetails) => {
            return `<div id=prdTITLE class=" ds-block txt-c bg-ligh w-full m-auto h-auto mb-20 ">
                <h3 class=" fs-22 fw-bloder c-purple ltr-spc-2 bg-ligh p-25 m-25 brdr-3ligh">${prdDetails.title}</h3>
            </div>

            <div class="imagePrd w-full pt-40 ">
                <img src="${prdDetails.imgUrl}" alt="${prdDetails.title} image" id="imgShow" class=" w-mxfull mt-10 p-5 brdrb-2ligh pb-30">
                <div class=" txt-l mb-15 pl-10">
                    <span class="fw-lighter fs-16 c-purple fw-nrml pr-25 pb-20">Size: ${prdDetails.size} <br> Addition ${prdDetails.title} Items Incloded</span>
                </div>                                        
            </div>

            <div class="prdDESC pr-40 pl-40 pt-40 pos-rel">
                <p class="fw-lighter fs-16 pl-120 mb-20 mt-20 brdrb-2ligh ptb-20z c-purple"> ${prdDetails.title} ${prdDetails.subTitle}<br></p>   
                <p class=" pl-120 fs-14 fw-lighter mb-15 mb-30 linhig-32 c-gray"> ${prdDetails.descrip} </p>
                <div class=" txt-r mb-10 ds-grid pos-abs w-egthy t-sven">
                    <button type=button class="pt-10 pb-10 pr-15 pl-15 rad-6 bg-purple c-white brdr-zero fs-14 pointr m-auto w-egthy h-48" onclick = "delete_product(${prdDetails.id})" > DELETE ${prdDetails.title} </button>
                </div>
                
            </div>`;
        });

        itemDom.innerHTML = myProdsUI.join("");
    
    } else {

        noProductsInner.innerHTML = `There is No Liked Products to Show <br><a href="index.html" class="fs-16">Back to Products Page</a>`;
    }

})(JSON.parse(localStorage.getItem('products')) || productsDb)




function delete_product(id) {
    if(localStorage.getItem("Username")){
        
        let products = JSON.parse(localStorage.getItem('products')) || productsDb;

        let myProducts = products.filter((prd) => prd.isMe === true);
        
        let leftProducts = myProducts.filter((i) => i.id !== id);

        let selectedProduct = myProducts.find((i) => i.id === id);

        products = products.filter((i) => i.id !== selectedProduct.id)

        localStorage.setItem('products',JSON.stringify(products));

        setTimeout(() => {

            

            window.location = "index.html";

        }, 750);    

    } else {

        window.location = "login.html";
    }
}

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
