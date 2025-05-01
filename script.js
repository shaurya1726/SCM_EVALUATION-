// Add to cart

const btnCart = document.querySelector('.btn-cart');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  let btnRemove = document.querySelectorAll('.cart-remove');
  console.log(btnRemove);
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });
  updateTotal();
}

function removeItem() {
  if (confirm('Are you sure to remove')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = this.parentElement.querySelector('.food-img').src;

  let newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in cart");
    return;
  } else {
    itemList.push(newProduct);
  }
  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa fa-trash cart-remove"></i>
    </div>
    `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;
  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
  });
  totalValue.innerHTML = 'Rs.' + total; 
}

const cartCount = document.querySelector('.cart-count');
let count = itemList.length;
cartCount.innerHTML = count;

if (count == 0) {
  cartCount.style.display = 'none';
} else {
  cartCount.style.display = 'block';
}

function renderCart() {
   const cartContent = document.querySelector('.cart-content'); 
   cartContent.innerHTML = ''; 
   itemList.forEach(item => {
     let newProductElement = createCartProduct(item.title, item.price, item.imgSrc); 
     let element = document.createElement('div'); 
     element.innerHTML = newProductElement; 
     cartContent.append(element); 
    }); 
    loadContent(); 
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Get the "Place Order" button
    const placeOrderButton = document.getElementById('place-order-button');

    // Add click event listener to the button
    placeOrderButton.addEventListener('click', function() {
        // Show an alert message
        alert('Your order has been placed successfully!');

        // Clear the cart
        const cartContent = document.querySelector('.cart-content');
        cartContent.innerHTML = '';

        // Reset the total price
        const totalPrice = document.querySelector('.total-price');
        totalPrice.textContent = 'Rs.0';

        // Update the cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = '0';
    });
});


document.addEventListener('DOMContentLoaded', function() {
  // Get the close button
  const cartCloseButton = document.getElementById('cart-close-icon');

  // Get the cart element
  const cart = document.querySelector('.cart');

  // Add click event listener to the close button
  cartCloseButton.addEventListener('click', function() {
      // Close the cart by hiding it
      cart.style.display = 'none';
  });

  // Optionally, add an event listener to open the cart if you have a button for that
  const cartOpenButton = document.querySelector('.btn-cart');
  cartOpenButton.addEventListener('click', function() {
      // Open the cart by showing it
      cart.style.display = 'block';
  });
});
