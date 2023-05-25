// let products = productsDb;
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let prdId = localStorage.getItem('prdId');
let prdDetails = products.find( (item) => item.id == prdId );
let itemDom = document.querySelector('.itemDetails');
let like = document.getElementById('like');

theCart.addEventListener('click', openCartMenu);

let cartAddedItems = localStorage.getItem('ProductInCart') ? JSON.parse(localStorage.getItem('ProductInCart')) : [];

if(cartAddedItems){
    cartAddedItems.map(item => { cartContentDiv.innerHTML += `<p>${item.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half w-10 h-10">${item.qty}</span></p>`; });
    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += cartAddedItems.length;
};

itemDom.innerHTML = 
`<div id=prdTITLE class=" ds-block txt-c bg-ligh w-full m-auto h-auto mb-20 ">
    <h3 class=" fs-22 fw-bloder c-purple ltr-spc-2 bg-ligh p-25 m-25 ${ prdDetails.isMe === true ? 'brdr-2purple' : 'brdr-2ligh'} ">${prdDetails.title}</h3>
</div>


<div class="imagePrd w-full pt-40 ">
    <img src="${prdDetails.imgUrl}" alt="${prdDetails.title} image" id="imgShow" class=" w-mxfull mt-10 p-5 brdrb-2ligh pb-30">
    <div class=" txt-c w-full p-30 t-sven">
        <i id=add class="ds-inblock mr-5 fa fa-shopping-cart fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c" title="add to cart" onclick = "addedToCart(${prdDetails.id})" ></i>
        <i id=like class="ds-inblock fa fa-heart-o fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c ${ prdDetails.liked === true ? 'bg-red' : 'bg-purple' } " title="love ${prdDetails.title} click the hart" onclick = 'addTofavourites(${prdDetails.id})'></i>
        <i id=edit class="ds-inblock mr-5 fa fa-edit fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c ${ prdDetails.isMe === true ? 'ds-block' : 'ds-non'} " title="Update ${prdDetails.title}" onclick = 'editProduct(${prdDetails.id})'></i>            
        <i id=delet class="ds-inblock fa fa-eraser fa-lg pointr bg-purple c-white h-40 w-55 linhig-40 rad-10 txt-c ${ prdDetails.isMe === true ? 'ds-block' : 'ds-non'} " title= "Delete ${prdDetails.title}" onclick = 'deletProduct(${prdDetails.id})'></i>                                        
    </div>

</div>

<div class="prdDESC pr-40 pl-40 pt-40 pos-rel">
    <p class="fw-lighter fs-16 pl-120 mb-20 mt-20 brdrb-2ligh ptb-20z c-purple ${ prdDetails.isMe === true ? 'brdrb-2purple' : 'brdrb-2ligh'} "> ${prdDetails.title} ${prdDetails.subTitle}<br></p>   
    <p class=" pl-120 fs-14 fw-lighter mb-15 mb-30 linhig-32 c-gray"> ${prdDetails.descrip} </p>
    <div class=" txt-l mb-15 pl-120 w-ninty t-sven pos-abs ds-flex brdrt-2ligh pt-40">
        <span class="fw-lighter fs-16 c-purple fw-nrml pr-25 pb-20 w-half">Size: ${prdDetails.size} <br> Addition ${prdDetails.title} Items Incloded</span>
        <form class=" txt-c w-300 ds-block ">
            <lable for=number class="fw-nrml c-purple fs-16">Quantity: </lable>
            <input type="number" id="number" value="${prdDetails.qty}" title=quantity class="qtty c-purple brdr-2ligh txt-c m-0 w-40 h-40" />
        </form>
    </div>
    
</div>
`;

let choosen = [];
function addedToCart(id) {

    if(localStorage.getItem("Username")){

        let choosenItem = products.find((item) => item.id === id);

        let item = choosen.find(i => i.id === choosenItem.id );

        if (item) {
            choosenItem.qty += 1;
        } else {
            choosen.push(choosenItem);
        }

        cartContentDiv.innerHTML = "";

        choosen.forEach((itm) => {
            
            cartContentDiv.innerHTML += `<p>${itm.title} <span class=" bg-purple c-white pl-10 pr-10 fs-10 rad-half w-10 h-10">${itm.qty}</span></p>`;
        
        });
        
        cartAddedItems = [...cartAddedItems, choosenItem];
        
        let uniqueProduct = getUniqueProduct(cartAddedItems, "id");
        
        localStorage.setItem('ProductInCart', JSON.stringify(uniqueProduct));
        
        let itemsCount = document.querySelector('.cart-content div p');
        
        badgeDom.style.display = 'inline-block';
        
        badgeDom.innerHTML = itemsCount.length;
    
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

let favouriteAddedItems; 
(function favMenuData(){
    favouriteAddedItems = localStorage.getItem('ProductInFavourite') 
    ? JSON.parse(localStorage.getItem('ProductInFavourite')) 
    : [];
})();

function addTofavourites(id) {
    if(localStorage.getItem("current")){
        let choosenItem = products.find((item) => item.id === id);
        if (choosenItem.liked) {

            choosenItem.liked = false;

            favouriteAddedItems = [...favouriteAddedItems, choosenItem];

            let uniqueProduct = getUniqueProduct(favouriteAddedItems, "id");

            localStorage.setItem('ProductInFavourite', JSON.stringify(uniqueProduct));

            products.map((item) => {
                if (item.id === choosenItem.id) { item.liked = true;}
            });

            localStorage.setItem('products', JSON.stringify(products));
        
        } else {
            
            choosenItem.liked = true;
            favouriteAddedItems = [...favouriteAddedItems, choosenItem];
            
            let uniqueProduct = getUniqueProduct(favouriteAddedItems, "id");
            localStorage.setItem('ProductInFavourite', JSON.stringify(uniqueProduct));

            products.map((item) => {
                if (item.id === choosenItem.id) {item.liked = true;}
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
    } else {
        window.location = "login.html";
    }
}

function editProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'editProduct.html';
}

function deletProduct(id){
    localStorage.setItem('prdId', id);
    window.location = 'deletProduct.html';
}
