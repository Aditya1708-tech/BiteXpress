const menuItems = [
    // Main Course
    { 
      id: 1, 
      name: "Burger", 
      price: 199, 
      image: "images/burger.jpg",
      description: "Classic beef burger with fresh vegetables",
      category: "main"
    },
    { 
      id: 2, 
      name: "Pizza", 
      price: 299, 
      image: "images/pizza.jpg",
      description: "Freshly baked pizza with your choice of toppings",
      category: "main"
    },
    { 
      id: 3, 
      name: "Pasta", 
      price: 249, 
      image: "images/pasta.jpg",
      description: "Italian pasta with rich tomato sauce",
      category: "sides"
    },
    { 
      id: 4, 
      name: "French Fries", 
      price: 99, 
      image: "images/fries.jpg",
      description: "Crispy golden fries with seasoning",
      category: "sides"
    },
    { 
      id: 5, 
      name: "Samosa", 
      price: 49, 
      image: "images/samosa.jpg",
      description: "Crispy pastry filled with spiced potatoes",
      category: "snacks"
    },
    { 
      id: 6, 
      name: "Pani Puri", 
      price: 79, 
      image: "images/pani_puri.JPG",
      description: "Crispy puris filled with spicy water and chutney",
      category: "snacks"
    },
    { 
      id: 7, 
      name: "Paneer Tikka", 
      price: 199, 
      image: "images/paneer.jpg",
      description: "Grilled cottage cheese with Indian spices",
      category: "main"
    },
    { 
      id: 8, 
      name: "Momos", 
      price: 129, 
      image: "images/momos.jpg",
      description: "Steamed dumplings with vegetable filling",
      category: "snacks"
    },
    // Desserts
    {
      id: 9,
      name: "Chocolate Brownie",
      price: 149,
      image: "images/chocolate_brownie.jpg",
      description: "Rich chocolate brownie served with vanilla ice cream",
      category: "dessert"
    },
    {
      id: 10,
      name: "Rajbhog",
      price: 89,
      image: "images/Rajbhog.png",
      description: "Traditional Indian sweet filled with saffron and dry fruits",
      category: "dessert"
    },
    {
      id: 11,
      name: "Hazelnut Ice Cream",
      price: 169,
      image: "images/hazelnut_icecream.jpg",
      description: "Creamy hazelnut ice cream with chocolate swirls",
      category: "dessert"
    },
    {
      id: 12,
      name: "Fresh Pastry",
      price: 129,
      image: "images/pastry.jpg",
      description: "Light and fluffy pastry with fresh cream",
      category: "dessert"
    }
];
  
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
  
let cart = [];
  
// Cart visibility functionality
cartLink.addEventListener('click', (e) => {
  e.preventDefault();
  cartElement.classList.add('active');
});
  
closeCartBtn.addEventListener('click', () => {
  cartElement.classList.remove('active');
});
  
// Close cart when clicking outside
document.addEventListener('click', (e) => {
  if (!cartElement.contains(e.target) && !cartLink.contains(e.target)) {
    cartElement.classList.remove('active');
  }
});
  
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
  
function addToCart(item) {
  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
  updateCartCount();
  // Show cart when adding items
  cartElement.classList.add('active');
}
  
function removeFromCart(itemId, event) {
  // Prevent event propagation to keep cart open
  event.stopPropagation();
  
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          cart[itemIndex].quantity -= 1;
      } else {
          // Remove item if quantity is 1
          cart.splice(itemIndex, 1);
      }
      renderCart();
      updateCartCount();
  }
}
  
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}
  
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item-info">
        <span>${item.name}</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div class="cart-item-actions">
        <span class="item-quantity">x${item.quantity}</span>
        <button class="remove-item" onclick="removeFromCart(${item.id}, event)">Remove</button>
      </div>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });
  totalSpan.textContent = `Total: ₹${total.toFixed(2)}`;
  checkoutBtn.disabled = cart.length === 0;
  updateCartCount();
}
  
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
  cartElement.classList.remove('active');
}
  
// Add category filter buttons
function createCategoryFilters() {
    const categories = ["all", "main", "snacks", "sides", "dessert"];
    const filterContainer = document.createElement("div");
    filterContainer.className = "category-filters";
    
    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "filter-btn" + (category === "all" ? " active" : "");
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.onclick = () => filterMenu(category);
        filterContainer.appendChild(button);
    });
    
    // Insert filters before the menu
    const menuContainer = document.getElementById("menu");
    menuContainer.parentNode.insertBefore(filterContainer, menuContainer);
}
  
// Filter menu items by category
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and render items
    menuContainer.innerHTML = "";
    const filteredItems = category === "all" 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}
  
// Initialize menu with filters
function initializeMenu() {
    createCategoryFilters();
    // Directly render all items without waiting for click
    menuContainer.innerHTML = "";
    menuItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
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
  