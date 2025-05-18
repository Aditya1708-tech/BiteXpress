// DOM Elements
const cartList = document.getElementById("cartList");
const totalSpan = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const modal = document.getElementById("checkoutModal");
const closeBtn = document.querySelector(".close");
const checkoutForm = document.getElementById("checkoutForm");
const modalCartList = document.getElementById("modalCartList");
const modalTotal = document.getElementById("modalTotal");
const cartElement = document.querySelector('.cart');
const cartLink = document.getElementById('cartLink');
const closeCartBtn = document.querySelector('.close-cart');
const cartCount = document.getElementById('cartCount');

// Navigation elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  console.log('Cart element:', cartElement);
  console.log('Cart link:', cartLink);
  console.log('Close cart button:', closeCartBtn);
  console.log('Checkout button:', checkoutBtn);

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

  // Cart visibility functionality
  if (cartLink && cartElement && closeCartBtn) {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      cartElement.style.right = '0';
    });

    closeCartBtn.addEventListener('click', () => {
      cartElement.style.right = '-400px';
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
      if (!cartElement.contains(e.target) && !cartLink.contains(e.target)) {
        cartElement.style.right = '-400px';
      }
    });
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  console.log('Add to cart buttons:', addToCartButtons);
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const menuItem = e.target.closest('.menu-item');
      const itemName = menuItem.querySelector('h3').textContent;
      const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('₹', ''));
      const itemImage = menuItem.querySelector('img').src;
      const restaurantName = document.querySelector('.restaurant-header h1').textContent;
      
      addToCart({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1,
        restaurant: restaurantName
      });
    });
  });

  // Initialize cart display
  updateCart();
});

function addToCart(item) {
  console.log('Adding to cart:', item);
  const existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.restaurant === item.restaurant);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  
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

function updateCart() {
  console.log('Updating cart');
  if (cartList && totalSpan && cartCount) {
    cartList.innerHTML = '';
    let subtotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.quantity}</p>
        </div>
        <button class="remove-item" data-name="${item.name}" data-restaurant="${item.restaurant}">&times;</button>
      `;
      cartList.appendChild(li);
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
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

    // Add event listeners to all remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const itemName = this.getAttribute('data-name');
        const restaurant = this.getAttribute('data-restaurant');
        console.log('Remove button clicked for:', itemName, restaurant);
        removeFromCart(itemName, restaurant);
      });
    });

    totalSpan.textContent = `Total: ₹${total.toFixed(2)}`;
    cartCount.textContent = itemCount;

    // Enable/disable checkout button based on cart items
    if (checkoutBtn) {
      checkoutBtn.disabled = cart.length === 0;
    }
  }
}

// Update cart count
function updateCartCount() {
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function removeFromCart(itemName, restaurant) {
  console.log('Removing item:', itemName, 'from restaurant:', restaurant);
  cart = cart.filter(item => !(item.name === itemName && item.restaurant === restaurant));
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  updateCartCount();
  
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

// Mobile menu functionality
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
  
  burger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('active');
    navLinks.forEach(link => {
      link.style.animation = '';
    });
  });
});

// Checkout functionality
function renderModalCart() {
  modalCartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "modal-cart-item";
    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    modalCartList.appendChild(div);
    total += item.price * item.quantity;
  });
  modalTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

function openCheckoutModal() {
  if (cart.length === 0) return;
  renderModalCart();
  modal.style.display = "block";
}

function closeCheckoutModal() {
  modal.style.display = "none";
}

function handleCheckout(event) {
  event.preventDefault();
  
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  
  const orderId = "ORD" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let orderSummary = "Order Details:\n\n";
  cart.forEach(item => {
    orderSummary += `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
  });
  
  alert(`
    Order placed successfully!
    
    Order ID: ${orderId}
    Name: ${fullName}
    Phone: ${phone}
    Address: ${address}
    Pincode: ${pincode}
    Payment Method: ${paymentMethod}
    
    ${orderSummary}
    Total Amount: ₹${total.toFixed(2)}
    
    Thank you for your purchase!
  `);
  
  cart = [];
  checkoutForm.reset();
  updateCart();
  closeCheckoutModal();
  cartElement.style.right = '-400px';
}

// Event Listeners
checkoutBtn.addEventListener('click', openCheckoutModal);
closeBtn.addEventListener('click', closeCheckoutModal);
checkoutForm.addEventListener('submit', handleCheckout);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeCheckoutModal();
  }
}); 