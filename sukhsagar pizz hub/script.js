// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartLink');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('.close-cart');
const checkoutBtn = document.getElementById('checkoutBtn');
const modal = document.getElementById('checkoutModal');
const closeModal = document.querySelector('.close');
const placeOrderBtn = document.querySelector('.place-order-btn');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.getElementById('cartCount');

// Cart State - Using main page's cart storage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing cart...');
    updateCart();
    updateCartCount();
    checkCartActions();

    // Listen for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            cartItems = JSON.parse(e.newValue) || [];
            updateCart();
            updateCartCount();
        }
    });
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterMenuItems(category);
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

menuItems.forEach(item => {
    const addToCartBtn = item.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        console.log('Add to cart clicked');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('₹', ''));
        const itemImage = item.querySelector('img').src;
        
        console.log('Adding item:', { itemName, itemPrice, itemImage });
        addToCart(itemName, itemPrice, itemImage);
        cart.style.right = '0'; // Open cart when item is added
    });
});

cartIcon.addEventListener('click', () => {
    cart.style.right = '0';
});

closeCart.addEventListener('click', () => {
    cart.style.right = '-400px';
});

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length > 0) {
        modal.style.display = 'block';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

placeOrderBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!name || !phone || !address || !paymentMethod) {
        alert('Please fill in all fields and select a payment method');
        return;
    }

    // Process order
    alert('Order placed successfully!');
    cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
    modal.style.display = 'none';
    cart.style.right = '-400px';
});

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Functions
function filterMenuItems(category) {
    menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function addToCart(name, price, image) {
    console.log('Adding to cart:', { name, price, image });
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    console.log('Updated cart items:', cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
    showNotification('Item added to cart');
}

function removeFromCart(index) {
    console.log('Removing item at index:', index);
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
    showNotification('Item removed from cart', true);
    
    // Store removal event for cross-page notification
    localStorage.setItem('lastCartAction', JSON.stringify({
        type: 'remove',
        message: 'Item removed from cart'
    }));
}

function updateCart() {
    console.log('Updating cart display');
    if (!cartList || !cartTotal) {
        console.error('Cart elements not found:', { cartList, cartTotal });
        return;
    }

    cartList.innerHTML = '';
    let subtotal = 0;
    
    cartItems.forEach((item, index) => {
        console.log('Processing cart item:', item);
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
                <p class="cart-item-price">₹${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">×</button>
        `;
        cartList.appendChild(li);
    });
    
    // Calculate charges
    const gst = Math.ceil(subtotal * 0.05); // 5% GST rounded up to next rupee
    const deliveryCharges = 20; // Fixed delivery charge
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
    
    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    checkoutBtn.disabled = cartItems.length === 0;
}

function showNotification(message, isRemove = false) {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${isRemove ? 'remove-notification' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function checkCartActions() {
    const lastAction = JSON.parse(localStorage.getItem('lastCartAction'));
    if (lastAction && lastAction.type === 'remove') {
        showNotification(lastAction.message, true);
        localStorage.removeItem('lastCartAction');
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function updateCartCount() {
    console.log('Updating cart count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        console.log('Total items in cart:', totalItems);
        cartCount.textContent = totalItems;
    } else {
        console.error('Cart count element not found');
    }
} 