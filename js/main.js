import product from './product.js';
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];



getProdutsList();

async function getProdutsList() {
    product.map(p => {
        document.querySelector('.product_container').innerHTML += `
        <div class="product_part">
            <div class="card" style="width: 18rem;">
                <img style="height: 200px" src="${p.src}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">${p.price}</p>
                    <p class="card-text">${p.id}</p>
                    <button id="${p.id}" class="btn btn-primary add-cart">Add to cart</button>
                </div>
            </div>
        </div>
    `;
    });
}

let cartItemId;

document.querySelectorAll('.add-cart').forEach(function (el) {
    el.addEventListener(
        "click", function () {

            cartItemId = el.id;
            let index = product.findIndex(o => {
                return o.id === cartItemId;
            }); //getting index of cartItemId in product array

            if (!cartItems.map(ci => ci.id).includes(cartItemId))//check if obj isn't present
            {
                let newCartItem = { id: cartItemId, name: product[index].name, price: product[index].price, quantity: 1 };

                cartItems.push(newCartItem);
            } else {
                let cartIndex = cartItems.map(ci => ci.id).indexOf(cartItemId);
                cartItems[cartIndex].quantity += 1;
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload();
        })
}
);

displayCart();

function displayCart() {
    let cartData = document.querySelector(".cart_item");

    cartItems.map(i => {

        cartData.innerHTML += `<div class="cart_items border border-primary mb-2">
            <p>Product Name : ${i.name} </p> 
            <p>Quantity : ${i.quantity} <button value="${i.id}" class="cart-inc btn btn-primary">+</button>&nbsp<button value="${i.id}" class="cart-dec btn btn-danger">-</button></p>
            <p>Individual price : ${i.price}</p>
            <p>Total price : ${i.price * i.quantity}</p>
            <button class="btn btn-danger delete-item p-0" id=${i.id}>Remove from cart</button>
        </div>`;
    })
}


document.querySelectorAll('.cart-inc').forEach(function (el) {
    el.addEventListener(
        "click", function () {
            location.reload();
            let index = cartItems.map(ci => ci.id).indexOf(el.value);
            cartItems[index].quantity += 1;

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

        })
}
);

document.querySelectorAll('.cart-dec').forEach(function (el) {
    el.addEventListener(
        "click", function () {
            location.reload();
            let index = cartItems.map(ci => ci.id).indexOf(el.value);
            cartItems[index].quantity -= 1;
            if (cartItems[index].quantity === 0) {
                cartItems.splice(index, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        })
}
);

if (cartItems.length > 0) {
    // document.querySelector(".delete-item").addEventListener("click", function () {
    //     let del_id = document.querySelector(".delete-item").id;
    //     let index = cartItems.map(ci => ci.id).indexOf(del_id);
    //     cartItems.splice(index, 1);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     location.reload();

    // });
    document.querySelectorAll('.delete-item').forEach(function (el) {
        el.addEventListener(
            "click", function () {
                let del_id = el.id;
                let index = cartItems.map(ci => ci.id).indexOf(del_id);
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                location.reload();
            })
    }
    );




    document.querySelector('.del-sec').innerHTML = `<button class="btn btn-danger del-button">Clear all</button>`;

    document.querySelector(".del-button").addEventListener("click", function () {
        cartItems.splice(0, cartItems.length);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload();
    });
}



