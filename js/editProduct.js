
let products = JSON.parse(localStorage.getItem('products')) || productsDb;
let prdId = JSON.parse(localStorage.getItem('prdId'));
let get_product = products.find( (item) => item.id === prdId );


let itemDom = document.querySelector('.itemDetails');
let theLike = document.getElementById('like');
theCart.addEventListener('click', openCartMenu);

itemDom.innerHTML = 
`
<div id=prdTITLE class=" ds-block txt-c bg-ligh w-full m-auto h-auto mb-20 ">
    <label for="prod_title" class="fs-18 fw-blod c-purple ltr-spc-2 bg-ligh p-5 m-25 ">Product Title</label>
    <input type="text" name="title" id="prod_title" class="fs-18 fw-blod ltr-spc-2 bg-ligh p-5 m-25 w-sixty brdr-bt-main brdr-zero">
</div>
<div class="imagePrd w-full pt-40">
    <div>
        <label for="prod_img" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple w-full mb-15">Select a Product Image</label>
        <br >
        <input type="file" alt="edit Product" name=image id="prod_img" class=" w-mxfull mt-10 mb-30 mt-15 p-5 brdrb-2ligh pb-30" accept="image/png, image/jpeg, image/webp">
        <fieldset class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-30 mr-0 mb-25">
            <legend>Select a Product Size:</legend>                        
            <select name="s_size" id="select_size" title=size class="fs-18 fw-lighter ltr-spc-2 p-5 mr-25 c-black w-half ">
                <option value="" hidden ></option>
                <option value="small">Small</option>
                <option value="medium" selected>Medium</option>
                <option value="larg">Larg</option>
            </select>
        </fieldset>
        <label for="prod_qty" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">Product Quantity</label>
        <input type=number name="quantity" id="prod_qty" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-half brdr-bt-main brdr-zero">        

    </div>
</div>

<div class="prdDESC pr-40 pl-40 pt-40">
    <div class=" pl-120 pr-120 fs-14 fw-lighter mb-15 mb-30 txt-l">
        <label for="prod_subtitle" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5 c-purple">Product Subtitle</label>
        <br>
        <input type="text" name="sub_title" id="prod_subtitle" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 mt-5 w-full brdr-bt-main brdr-zero">
        <br>
        <label for="prod_description" class="fs-18 fw-lighter c-purple ltr-spc-2 bg-ligh p-5">Product Description</label>
        <br>
        <textarea type="text" name="description" id="prod_description" rows="10" class="fs-18 fw-lighter ltr-spc-2 bg-ligh p-5 mb-25 w-full"></textarea>
    </div>      
    <div class=" txt-c mb-10 ">
        <input type="submit" value="UPDATE" name=edit_product class=" pt-10 pb-10 pr-15 pl-15 rad-6 bg-purple c-white brdr-zero fs-14 pointr m-auto w-four5 h-48" onclick = "submit_edit_product()" >
        <button type=button id=prod_clear class=" fa fa-eraser pointr fa-2x m-auto c-purple h-48 w-48 linhig-40 rad-6 brdr-gray" title="Clear all Data" onclick = 'clearInput()' ></button>
    </div>                    
</div>
`;

// edit product variables
let edit_prod_title = document.querySelector('#prod_title');
let edit_prod_sub_title = document.querySelector('#prod_subtitle');
let edit_prod_descrip = document.querySelector('#prod_description');
let edit_prod_img = document.querySelector('#prod_img');
let edit_prod_size = document.querySelector('#select_size');
let edit_prod_qty = document.querySelector('#prod_qty');
let prod_size_value;
let edit_form = document.querySelector('#edit_form');


edit_prod_title.value = get_product.title;
edit_prod_sub_title.value = get_product.subTitle;
edit_prod_descrip.value = get_product.descrip;
// edit_prod_img.value = get_product.imgUrl;  // Set new image
edit_prod_size.value = get_product.size;
edit_prod_qty.value = get_product.qty;

// edit product events
edit_prod_size.addEventListener('change', get_size_value);
edit_form.addEventListener('submit', submit_edit_product);


// edit product function
function get_size_value(e) {
    prod_size_value = e.target.value;
}

function submit_edit_product(e){
    
    e.preventDefault();

    get_product.title = edit_prod_title.value;
    get_product.subTitle = edit_prod_sub_title.value;
    get_product.descrip = edit_prod_descrip.value;
    get_product.size = prod_size_value;
    get_product.qty = edit_prod_qty.value;
    get_product.imgUrl = edit_prod_img.value.replace("C:\\fakepath\\", "imgs/");
        
    localStorage.setItem('products',JSON.stringify(products));
    
    clearInput();

    setTimeout(() => {

        window.location = "index.html";

    }, 750);
}

function clearInput() {
    edit_prod_title.value = ""; 
    edit_prod_sub_title.value = "";
    edit_prod_descrip.value = ""; 
    edit_prod_img.value = ""; 
    edit_prod_size.value = ""; 
    edit_prod_qty.value = ""; 
    
}

// Convert Image to Base64
function getImageBase64(img){
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
        edit_prod_img.value = reader.result;
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

let cartAddedItems = localStorage.getItem('ProductInCart') 
? JSON.parse(localStorage.getItem('ProductInCart')) 
: [];

if(cartAddedItems){
    cartAddedItems.map(item => { cartContentDiv.innerHTML += `<p>${item.title} ${item.qty}</p>`; });
    badgeDom.style.display = 'inline-block';
    badgeDom.innerHTML += cartAddedItems.length;
};
