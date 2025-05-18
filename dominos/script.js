// Initialize cart from localStorage or empty array
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartLink = document.getElementById('cartLink');
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartElement = document.querySelector('.cart');
const closeCart = document.querySelector('.close-cart');
const modal = document.getElementById('checkoutModal');
const closeModal = document.querySelector('.close');
const checkoutForm = document.getElementById('checkoutForm');
const modalCartList = document.getElementById('modalCartList');
const modalTotal = document.getElementById('modalTotal');

// Update cart count
function updateCartCount() {
  cartCount.textContent = cartItems.length;
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    const item = {
      name: menuItem.querySelector('h3').textContent,
      price: parseFloat(menuItem.querySelector('.price').textContent.replace('₹', '')),
      restaurant: 'Dominos',
      quantity: 1
    };
    addToCart(item);
  });
});

// Add item to cart
function addToCart(item) {
  const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push(item);
  }
  updateCart();
  saveCart();
  
  // Show notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = 'Item added to cart';
  document.body.appendChild(notification);
  
  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  saveCart();
  
  // Show notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification remove-notification';
  notification.textContent = 'Item removed from cart';
  document.body.appendChild(notification);
  
  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);

  // Store the removal event in localStorage for the main page
  localStorage.setItem('lastCartAction', JSON.stringify({
    type: 'remove',
    message: 'Item removed from cart',
    timestamp: new Date().getTime()
  }));
}

// Update cart display
function updateCart() {
  cartList.innerHTML = '';
  let subtotal = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.restaurant}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="cart-item-price">
        ₹${itemTotal.toFixed(2)}
      </div>
      <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
    `;
    cartList.appendChild(li);
  });

  // Calculate GST and delivery charges
  const gst = subtotal * 0.05; // 5% GST
  const deliveryCharges = 20; // ₹20 delivery charges
  const total = subtotal + gst + deliveryCharges;

  // Add charges breakdown to cart
  const chargesDiv = document.createElement('div');
  chargesDiv.className = 'cart-charges';
  chargesDiv.innerHTML = `
    <div class="charge-item">
      <span>Subtotal:</span>
      <span>₹${subtotal.toFixed(2)}</span>
    </div>
    <div class="charge-item">
      <span>GST (5%):</span>
      <span>₹${gst.toFixed(2)}</span>
    </div>
    <div class="charge-item">
      <span>Delivery Charges:</span>
      <span>₹${deliveryCharges.toFixed(2)}</span>
    </div>
    <div class="charge-item total">
      <span>Total:</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
  `;
  cartList.appendChild(chargesDiv);

  total.textContent = `Total: ₹${total.toFixed(2)}`;
  updateCartCount();
  checkoutBtn.disabled = cartItems.length === 0;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Toggle cart visibility
cartLink.addEventListener('click', (e) => {
  e.preventDefault();
  cartElement.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartElement.classList.remove('active');
});

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
  modalCartList.innerHTML = '';
  let totalAmount = 0;

  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.restaurant}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="cart-item-price">
        ₹${itemTotal.toFixed(2)}
      </div>
    `;
    modalCartList.appendChild(div);
  });

  modalTotal.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  modal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(checkoutForm);
  const orderData = {
    items: cartItems,
    delivery: {
      name: formData.get('fullName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      pincode: formData.get('pincode')
    },
    payment: formData.get('payment')
  };

  // Here you would typically send the order to a server
  console.log('Order placed:', orderData);
  
  // Clear cart and close modal
  cartItems = [];
  saveCart();
  updateCart();
  modal.style.display = 'none';
  cartElement.classList.remove('active');
  
  // Show success message
  alert('Order placed successfully! Thank you for your order.');
});

// Initialize cart on page load
updateCart();

// Add this at the start of the script, after DOM elements
document.addEventListener('DOMContentLoaded', () => {
  // Check for cart actions from other pages
  const lastCartAction = JSON.parse(localStorage.getItem('lastCartAction') || '{}');
  if (lastCartAction.type === 'remove' && new Date().getTime() - lastCartAction.timestamp < 3000) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification remove-notification';
    notification.textContent = lastCartAction.message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  // Clear the action after showing
  localStorage.removeItem('lastCartAction');
}); 