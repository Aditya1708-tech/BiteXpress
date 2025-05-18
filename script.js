// const menuItems = [
//     // Main Course
//     { 
//       id: 1, 
//       name: "Burger", 
//       price: 199, 
//       image: "images/burger.jpg",
//       description: "Classic beef burger with fresh vegetables",
//       category: "main"
//     },
//     { 
//       id: 2, 
//       name: "Pizza", 
//       price: 299, 
//       image: "images/pizza.jpg",
//       description: "Freshly baked pizza with your choice of toppings",
//       category: "main"
//     },
//     { 
//       id: 3, 
//       name: "Pasta", 
//       price: 249, 
//       image: "images/pasta.jpg",
//       description: "Italian pasta with rich tomato sauce",
//       category: "sides"
//     },
//     { 
//       id: 4, 
//       name: "French Fries", 
//       price: 99, 
//       image: "images/fries.jpg",
//       description: "Crispy golden fries with seasoning",
//       category: "sides"
//     },
//     { 
//       id: 5, 
//       name: "Samosa", 
//       price: 49, 
//       image: "images/samosa.jpg",
//       description: "Crispy pastry filled with spiced potatoes",
//       category: "snacks"
//     },
//     { 
//       id: 6, 
//       name: "Pani Puri", 
//       price: 79, 
//       image: "images/pani_puri.JPG",
//       description: "Crispy puris filled with spicy water and chutney",
//       category: "snacks"
//     },
//     { 
//       id: 7, 
//       name: "Paneer Tikka", 
//       price: 199, 
//       image: "images/paneer.jpg",
//       description: "Grilled cottage cheese with Indian spices",
//       category: "main"
//     },
//     { 
//       id: 8, 
//       name: "Momos", 
//       price: 129, 
//       image: "images/momos.jpg",
//       description: "Steamed dumplings with vegetable filling",
//       category: "snacks"
//     },
//     // Desserts
//     {
//       id: 9,
//       name: "Chocolate Brownie",
//       price: 149,
//       image: "images/chocolate_brownie.jpg",
//       description: "Rich chocolate brownie served with vanilla ice cream",
//       category: "dessert"
//     },
//     {
//       id: 10,
//       name: "Rajbhog",
//       price: 89,
//       image: "images/Rajbhog.png",
//       description: "Traditional Indian sweet filled with saffron and dry fruits",
//       category: "dessert"
//     },
//     {
//       id: 11,
//       name: "Hazelnut Ice Cream",
//       image: "images/hazelnut_icecream.jpg",
//       description: "Creamy hazelnut ice cream with chocolate swirls",
//       category: "dessert"
//     },
//     {
//       id: 12,
//       name: "Fresh Pastry",
//       price: 129,
//       image: "images/pastry.jpg",
//       description: "Light and fluffy pastry with fresh cream",
//       category: "dessert"
//     }
// ];
  
const menuContainer = document.getElementById("menu");
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
  
// Offer rotation functionality
const offerCards = document.querySelectorAll('.offer-card');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  // Hide all slides
  offerCards.forEach(card => {
    card.classList.remove('active');
  });
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show current slide
  const startIndex = index * 3;
  for (let i = 0; i < 3; i++) {
    if (offerCards[startIndex + i]) {
      offerCards[startIndex + i].classList.add('active');
    }
  }
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % (offerCards.length / 3);
  showSlide(currentSlide);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 3000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startSlideShow();

  // Add click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Pause on hover
  const offersContainer = document.querySelector('.offers-container');
  offersContainer.addEventListener('mouseenter', stopSlideShow);
  offersContainer.addEventListener('mouseleave', startSlideShow);
});
  
// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
// Initialize cart functionality
function initializeCart() {
  console.log('Initializing cart...');
  
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
  if (cartLink) {
    cartLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Cart link clicked');
      cartElement.style.right = '0';
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Close cart clicked');
      cartElement.style.right = '-400px';
    });
  }

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!cartElement.contains(e.target) && !cartLink.contains(e.target)) {
      cartElement.style.right = '-400px';
    }
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  console.log('Found add to cart buttons:', addToCartButtons.length);
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Add to cart button clicked');
      
      const menuItem = e.target.closest('.menu-item');
      if (!menuItem) {
        console.log('No menu item found');
        return;
      }
      
      const itemName = menuItem.querySelector('h3').textContent;
      const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('₹', ''));
      const itemImage = menuItem.querySelector('img').src;
      
      console.log('Adding item:', { itemName, itemPrice, itemImage });
      
      addToCart({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1
      });
    });
  });

  // Initial cart update
  updateCart();
}

function addToCart(item) {
  console.log('Adding to cart:', item);
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  updateCartCount();
  cartElement.style.right = '0';
}

function updateCart() {
  console.log('Updating cart display');
  if (!cartList || !totalSpan || !cartCount) {
    console.log('Missing cart elements:', { cartList, totalSpan, cartCount });
    return;
  }
  
  cartList.innerHTML = '';
  let subtotal = 0;
  let itemCount = 0;

  cart.forEach(item => {
    console.log('Processing cart item:', item);
    const li = document.createElement('li');
    li.className = 'cart-item';
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    itemCount += item.quantity;

    li.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
        <p class="cart-item-price">Total: ₹${itemTotal.toFixed(2)}</p>
      </div>
      <button class="remove-item" onclick="removeFromCart('${item.name}', '${item.restaurant}')">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Calculate GST and delivery charges
  const gst = subtotal * 0.05; // 5% GST
  const deliveryCharges = 20; // ₹20 delivery charges
  const total = subtotal + gst + deliveryCharges;

  // Add charges breakdown
  const chargesDiv = document.createElement('div');
  chargesDiv.className = 'cart-charges';
  chargesDiv.innerHTML = `
    <div class="charge-item">
      <span>Subtotal</span>
      <span>₹${subtotal.toFixed(2)}</span>
    </div>
    <div class="charge-item">
      <span>GST (5%)</span>
      <span>₹${gst.toFixed(2)}</span>
    </div>
    <div class="charge-item">
      <span>Delivery Charges</span>
      <span>₹${deliveryCharges.toFixed(2)}</span>
    </div>
    <div class="charge-item total">
      <span>Total</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
  `;
  cartList.appendChild(chargesDiv);

  totalSpan.textContent = `Total: ₹${total.toFixed(2)}`;
  cartCount.textContent = itemCount;
  cartCount.style.display = itemCount > 0 ? 'inline-block' : 'none';
  checkoutBtn.disabled = cart.length === 0;
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

  // Store the removal event in localStorage for other pages
  localStorage.setItem('lastCartAction', JSON.stringify({
    type: 'remove',
    message: 'Item removed from cart',
    timestamp: new Date().getTime()
  }));
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart);
  
// Mobile menu functionality
burger.addEventListener('click', () => {
  // Toggle Nav
  nav.classList.toggle('active');
  
  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
  
  // Burger Animation
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
  
  // Get form values
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  
  // Generate order ID
  const orderId = "ORD" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create order summary
  let orderSummary = "Order Details:\n\n";
  cart.forEach(item => {
    orderSummary += `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
  });
  
  // Show order confirmation
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
  
  // Clear the cart and form
  cart = [];
  checkoutForm.reset();
  renderCart();
  closeCheckoutModal();
  cartElement.style.right = '-400px';
}
  
// // Add category filter buttons
// function createCategoryFilters() {
//     const categories = ["all", "main", "snacks", "sides", "dessert"];
//     const filterContainer = document.createElement("div");
//     filterContainer.className = "category-filters";
    
//     categories.forEach(category => {
//         const button = document.createElement("button");
//         button.className = "filter-btn" + (category === "all" ? " active" : "");
//         button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
//         button.onclick = () => filterMenu(category);
//         filterContainer.appendChild(button);
//     });
    
//     // Insert filters before the menu
//     const menuContainer = document.getElementById("menu");
//     menuContainer.parentNode.insertBefore(filterContainer, menuContainer);
// }
  
// // Filter menu items by category
// function filterMenu(category) {
//     // Update active button
//     document.querySelectorAll('.filter-btn').forEach(btn => {
//         btn.classList.remove('active');
//     });
//     event.target.classList.add('active');
    
//     // Filter and render items
//     menuContainer.innerHTML = "";
//     const filteredItems = category === "all" 
//         ? menuItems 
//         : menuItems.filter(item => item.category === category);
    
//     filteredItems.forEach(item => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <div class="card-image">
//                 <img src="${item.image}" alt="${item.name}" />
//             </div>
//             <div class="card-content">
//                 <h3>${item.name}</h3>
//                 <p class="description">${item.description}</p>
//                 <p class="price">₹${item.price}</p>
//                 <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
//             </div>
//         `;
//         menuContainer.appendChild(card);
//     });
// }
  
// // Initialize menu with filters
// function initializeMenu() {
//     createCategoryFilters();
//     // Directly render all items without waiting for click
//     menuContainer.innerHTML = "";
//     menuItems.forEach(item => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <div class="card-image">
//                 <img src="${item.image}" alt="${item.name}" />
//             </div>
//             <div class="card-content">
//                 <h3>${item.name}</h3>
//                 <p class="description">${item.description}</p>
//                 <p class="price">₹${item.price}</p>
//                 <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
//             </div>
//         `;
//         menuContainer.appendChild(card);
//     });
// }
  
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
  
// Make sure the menu is initialized when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMenu);
  
// Contact Form Functionality
const contactModal = document.getElementById('contactModal');
const contactLink = document.getElementById('contactLink');
const closeContactBtn = document.querySelector('.close-contact');
const contactForm = document.getElementById('contactForm');

// Open contact modal
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.style.display = "block";
});

// Close contact modal
closeContactBtn.addEventListener('click', () => {
    contactModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.style.display = "none";
    }
});

// Handle contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    // Here you would typically send the data to your backend
    console.log('Contact Form Submission:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form and close modal
    contactForm.reset();
    contactModal.style.display = "none";
});
  