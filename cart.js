
const cartItemsContainer = document.getElementById('cart-items');
const summaryList = document.getElementById('summary-list');
const totalPriceElement = document.getElementById('total-price');
// const salesTaxElement = document.getElementById('sales-tax');
const cartCount = document.getElementById('cart-count');

let cart = [
    { id: 1, name: "Kaftan 1", price:50000,img: "images/kaftan-1.jpg", quantity: 1, color: null, size: null },
    { id: 2, name: "Kaftan 2", price: 50000, img: "images/kaftan-2.png", quantity: 2, color: null, size: null }
];



function renderCart() {
    cartItemsContainer.innerHTML = "";
    summaryList.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₦${item.price.toLocaleString()}</p>
                <div>
                    <p><strong>Select Color</strong></p>
                    <div class="color-options" data-id="${item.id}">
                        <span class="red ${item.color === 'red' ? 'active' : ''}" data-color="red"></span>
                        <span class="blue ${item.color === 'blue' ? 'active' : ''}" data-color="blue"></span>
                    </div>
                </div>
                <div>
                    <p><strong>Quantity</strong></p>
                    <div class="size-options" data-id="${item.id}">
                        ${['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size =>
            `<span class="${item.size === size ? 'active' : ''}" data-size="${size}">${size}</span>`
        ).join('')}
                    </div>
                </div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <span class="remove-btn" onclick="removeItem(${item.id})">x</span>
        `;

        cartItemsContainer.appendChild(cartItem);


        // summarylist.innerhtml ="";
        const summaryItem = document.createElement('p');
        summaryItem.innerHTML = `
  <span class="item-name">${item.name}</span>
  <span class="item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
`;

        summaryList.appendChild(summaryItem);
    });
    

//     let salesTax = total * 0.075;
//     salesTaxElement.innerHTML = `
//   <span class="item-name">Sales Tax:</span>
//   <span class="item-price">₦${salesTax.toLocaleString()}</span>
// `;

totalPriceElement.innerHTML = `
  <span class="item-name total-label"><strong>Total:</strong></span>
  <span class="item-price"><strong>₦${(total).toLocaleString()}</strong></span>
`;


    // totalPriceElement.textContent = `₦${(total + salesTax).toLocaleString()}`;
    cartCount.textContent = cart.length;

    // attachEventListeners();

    attachEventListeners();

// Save cart to localStorage for checkout page
localStorage.setItem('checkoutCart', JSON.stringify(cart));

}
// // Save cart to localStorage for checkout page
// localStorage.setItem('checkoutCart', JSON.stringify(cart));


function attachEventListeners() {
    document.querySelectorAll('.color-options span').forEach(span => {
        span.addEventListener('click', (e) => {
            const id = parseInt(span.parentElement.getAttribute('data-id'));
            const color = span.getAttribute('data-color');
            const item = cart.find(i => i.id === id);
            if (item) item.color = color;
            renderCart();
        });
    });

    document.querySelectorAll('.size-options span').forEach(span => {
        span.addEventListener('click', (e) => {
            const id = parseInt(span.parentElement.getAttribute('data-id'));
            const size = span.getAttribute('data-size');
            const item = cart.find(i => i.id === id);
            if (item) item.size = size;
            renderCart();
        });
    });
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        renderCart();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    renderCart();
});



renderCart();// Save cart to localStorage for checkout page
// localStorage.setItem('checkoutCart', JSON.stringify(cart));


