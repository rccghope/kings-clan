document.addEventListener('DOMContentLoaded', () => {
  const orderItemsContainer = document.getElementById('order-items');
  // const salesTaxElement = document.getElementById('sales-tax');
  const totalPriceElement = document.getElementById('total-price');
  const shippingMethod = document.getElementById('shipping-method');
  const cartCount = document.getElementById('cart-count');

  let cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
  let subtotal = 0;
  // let salesTax = 0;
  let shippingCost = 0;

  function renderCheckout() {
    orderItemsContainer.innerHTML = "";
    subtotal = 0;

    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('checkout-item');
      div.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Price: ₦${item.price.toLocaleString()}</p>
        <p>Color: ${item.color ? item.color : 'Not selected'}</p>
        <p>Size: ${item.size ? item.size : 'Not selected'}</p>
      `;
      orderItemsContainer.appendChild(div);
      subtotal += item.price * item.quantity;
    });

    // salesTax = Math.round(subtotal * 0.075);
    updateTotals();
  }

  function updateTotals() {
  //   salesTaxElement.textContent = `₦${salesTax.toLocaleString()}`;
    let total = subtotal + shippingCost;
    totalPriceElement.textContent = `₦${total.toLocaleString()}`;
  }


  cartCount.textContent = cart.length;


  shippingMethod.addEventListener('change', () => {
    if (shippingMethod.value === 'standard') {
      shippingCost = 500;
    } else if (shippingMethod.value === 'express') {
      shippingCost = 1500;
    } else {
      shippingCost = 0;
    }
    updateTotals();
  });

  document.getElementById('place-order').addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Order placed successfully!");
    localStorage.removeItem('checkoutCart');
  });


  document.querySelector('.change-address-btn').addEventListener('click', () => {
    const newAddress = prompt('Enter your new delivery address:');
    if (newAddress && newAddress.trim() !== '') {
      document.querySelector('.delivery-details p').textContent = newAddress;
    } else {
      alert('Address not changed!');
    }
  });

  renderCheckout();
});





