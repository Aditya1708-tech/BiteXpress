// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initGlobalCart();
  initNavbarSearch();
  initContactForm();
  initMobileMenu();
});

/* ==========================================
   1. Theme Management (Light / Dark Mode)
   ========================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggle");
  if (!themeToggleBtn) return;

  // Read saved theme or default to system preference
  const savedTheme = localStorage.getItem("bx_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("bx_theme", newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode!`, "success");
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#themeToggle i");
  if (!icon) return;
  if (theme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

/* ==========================================
   2. Global Toast Alert System
   ========================================== */
function showToast(message, type = "success") {
  // Remove existing toasts first to prevent piling
  const existingToasts = document.querySelectorAll(".bx-toast");
  existingToasts.forEach(t => t.remove());

  const toast = document.createElement("div");
  toast.className = `bx-toast toast-${type}`;
  
  let iconClass = "fas fa-check-circle";
  if (type === "remove") iconClass = "fas fa-trash-alt";
  else if (type === "info") iconClass = "fas fa-info-circle";
  
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Animate out and remove after 2.5s
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px) scale(0.9)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
window.showToast = showToast; // Export globally

/* ==========================================
   3. Global Cart & Checkout Management
   ========================================== */
let cart = [];
let appliedCoupon = null;

function initGlobalCart() {
  // Sync state from localStorage
  cart = JSON.parse(localStorage.getItem("bx_cart")) || [];

  const cartLink = document.getElementById("cartLink");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartElement = document.getElementById("cartDrawer");
  const closeCartBtn = document.getElementById("closeCart");
  
  // Elements exist?
  if (cartLink && cartOverlay && cartElement && closeCartBtn) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });

    closeCartBtn.addEventListener("click", () => {
      closeCartDrawer();
    });

    cartOverlay.addEventListener("click", () => {
      closeCartDrawer();
    });
  }

  // Bind Checkout Buttons
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeModalBtn = document.querySelector("#checkoutModal .close");
  const checkoutForm = document.getElementById("checkoutForm");

  if (checkoutBtn && checkoutModal && closeModalBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return;
      openCheckoutModal();
    });

    closeModalBtn.addEventListener("click", () => {
      closeCheckoutModal();
    });

    window.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        closeCheckoutModal();
      }
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleOrderPlacement);
  }

  // Bind Coupon UI
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", handleApplyCoupon);
  }

  // Initial cart display update
  updateCartUI();
}

function openCartDrawer() {
  const cartOverlay = document.getElementById("cartOverlay");
  const cartElement = document.getElementById("cartDrawer");
  if (cartOverlay && cartElement) {
    cartOverlay.classList.add("active");
    cartElement.classList.add("active");
  }
}

function closeCartDrawer() {
  const cartOverlay = document.getElementById("cartOverlay");
  const cartElement = document.getElementById("cartDrawer");
  if (cartOverlay && cartElement) {
    cartOverlay.classList.remove("active");
    cartElement.classList.remove("active");
  }
}

function updateCartUI() {
  const cartList = document.getElementById("cartList");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  
  if (!cartList) return;

  cartList.innerHTML = "";
  let subtotal = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='images/pizza.jpg'">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>₹${item.price} • ${item.restaurant}</p>
      </div>
      <div class="cart-item-actions">
        <div class="item-qty-selector">
          <button onclick="changeCartItemQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeCartItemQuantity('${item.id}', 1)">+</button>
        </div>
        <button class="remove-item" onclick="removeCartItem('${item.id}')">Remove</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  // Calculate pricing breakdown
  const gst = subtotal * 0.05; // 5% GST
  let deliveryFee = subtotal > 0 ? 20 : 0; // ₹20 flat delivery charge

  let discount = 0;
  if (appliedCoupon) {
    if (subtotal < appliedCoupon.minOrder) {
      // Order subtotal fell below minOrder limit
      appliedCoupon = null;
      showToast("Coupon removed! Subtotal is too low.", "remove");
      updateCouponDisplay();
    } else {
      if (appliedCoupon.discountType === "percentage") {
        discount = Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount);
      } else if (appliedCoupon.discountType === "free_delivery") {
        discount = deliveryFee;
      } else if (appliedCoupon.discountType === "flat") {
        discount = Math.min(appliedCoupon.value, subtotal);
      }
    }
  }

  const grandTotal = Math.max(0, subtotal + gst + deliveryFee - discount);

  // Update DOM values
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "inline-block" : "none";
  }

  const subtotalVal = document.getElementById("subtotalVal");
  const gstVal = document.getElementById("gstVal");
  const deliveryVal = document.getElementById("deliveryVal");
  const discountRow = document.getElementById("discountRow");
  const discountVal = document.getElementById("discountVal");
  const grandTotalVal = document.getElementById("grandTotalVal");

  if (subtotalVal) subtotalVal.textContent = `₹${subtotal.toFixed(2)}`;
  if (gstVal) gstVal.textContent = `₹${gst.toFixed(2)}`;
  if (deliveryVal) deliveryVal.textContent = `₹${deliveryFee.toFixed(2)}`;
  
  if (discountRow && discountVal) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      discountVal.textContent = `-₹${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = "none";
    }
  }
  
  if (grandTotalVal) grandTotalVal.textContent = `₹${grandTotal.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

  // Persist state
  localStorage.setItem("bx_cart", JSON.stringify(cart));
}

// Add item to cart (accessible from storefront)
function addToCart(itemId, itemName, itemPrice, itemImage, restaurantName) {
  const existing = cart.find(item => item.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: itemId,
      name: itemName,
      price: parseFloat(itemPrice),
      image: itemImage,
      restaurant: restaurantName,
      quantity: 1
    });
  }
  updateCartUI();
  updateStoreQuantitySelector(itemId);
  showToast(`Added ${itemName} to Cart`, "success");
  openCartDrawer();
}
window.addToCart = addToCart;

// Change item quantity in cart drawer
function changeCartItemQuantity(itemId, amount) {
  const item = cart.find(item => item.id === itemId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeCartItem(itemId);
    return;
  }
  
  updateCartUI();
  updateStoreQuantitySelector(itemId);
}
window.changeCartItemQuantity = changeCartItemQuantity;

// Remove item from cart
function removeCartItem(itemId) {
  const item = cart.find(item => item.id === itemId);
  const itemName = item ? item.name : "Item";
  cart = cart.filter(item => item.id !== itemId);
  
  updateCartUI();
  updateStoreQuantitySelector(itemId);
  showToast(`${itemName} removed from Cart`, "remove");
}
window.removeCartItem = removeCartItem;

// Sync item quantity selectors on restaurant menu page with active cart counts
function updateStoreQuantitySelector(itemId) {
  const btnContainer = document.querySelector(`.add-btn-container[data-id="${itemId}"]`);
  if (!btnContainer) return;

  const cartItem = cart.find(item => item.id === itemId);
  if (cartItem && cartItem.quantity > 0) {
    btnContainer.innerHTML = `
      <div class="item-qty-selector">
        <button onclick="event.stopPropagation(); changeCartItemQuantity('${itemId}', -1)">-</button>
        <span>${cartItem.quantity}</span>
        <button onclick="event.stopPropagation(); changeCartItemQuantity('${itemId}', 1)">+</button>
      </div>
    `;
  } else {
    // Re-render add button
    const name = btnContainer.dataset.name;
    const price = btnContainer.dataset.price;
    const img = btnContainer.dataset.img;
    const rest = btnContainer.dataset.rest;
    btnContainer.innerHTML = `
      <button class="add-btn" onclick="addToCart('${itemId}', '${name}', ${price}, '${img}', '${rest}')">ADD</button>
    `;
  }
}
window.updateStoreQuantitySelector = updateStoreQuantitySelector;

/* ==========================================
   4. Coupon Actions
   ========================================== */
function handleApplyCoupon() {
  const couponInput = document.getElementById("couponInput");
  if (!couponInput) return;

  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    showToast("Please enter a coupon code", "info");
    return;
  }

  // Calculate current subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (subtotal === 0) {
    showToast("Your cart is empty", "info");
    return;
  }

  const coupons = window.BiteXpress.getCoupons();
  const matched = coupons.find(c => c.code === code);

  if (!matched) {
    showToast("Invalid Coupon Code", "remove");
    return;
  }

  if (subtotal < matched.minOrder) {
    showToast(`Minimum order required is ₹${matched.minOrder}`, "info");
    return;
  }

  appliedCoupon = matched;
  couponInput.value = "";
  updateCartUI();
  updateCouponDisplay();
  showToast(`Coupon ${code} applied successfully!`, "success");
}

function removeCoupon() {
  appliedCoupon = null;
  updateCartUI();
  updateCouponDisplay();
  showToast("Coupon removed", "remove");
}
window.removeCoupon = removeCoupon;

function updateCouponDisplay() {
  const couponArea = document.getElementById("couponArea");
  if (!couponArea) return;

  const activeDisplay = couponArea.querySelector(".active-coupon-display");
  if (activeDisplay) activeDisplay.remove();

  if (appliedCoupon) {
    const div = document.createElement("div");
    div.className = "active-coupon-display";
    div.innerHTML = `
      <span><i class="fas fa-tag"></i> Code <strong>${appliedCoupon.code}</strong> applied</span>
      <button onclick="removeCoupon()">&times; Remove</button>
    `;
    couponArea.appendChild(div);
  }
}

/* ==========================================
   5. Checkout Modal & Order Placement
   ========================================== */
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  const modalCartList = document.getElementById("modalCartList");
  const modalTotal = document.getElementById("modalTotal");
  
  if (!modal || !modalCartList || !modalTotal) return;

  // Clear & populate
  modalCartList.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const row = document.createElement("div");
    row.className = "modal-cart-item";
    row.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    modalCartList.appendChild(row);
  });

  // Calculate final pricing
  const gst = subtotal * 0.05;
  const delivery = 20;
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount);
    } else if (appliedCoupon.discountType === "free_delivery") {
      discount = delivery;
    } else if (appliedCoupon.discountType === "flat") {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal + gst + delivery - discount);

  let breakdownHTML = `
    <div class="modal-cart-item" style="color: var(--text-secondary); margin-top: 8px;">
      <span>Subtotal</span>
      <span>₹${subtotal.toFixed(2)}</span>
    </div>
    <div class="modal-cart-item" style="color: var(--text-secondary);">
      <span>GST (5%)</span>
      <span>₹${gst.toFixed(2)}</span>
    </div>
    <div class="modal-cart-item" style="color: var(--text-secondary);">
      <span>Delivery Fee</span>
      <span>₹${delivery.toFixed(2)}</span>
    </div>
  `;

  if (discount > 0) {
    breakdownHTML += `
      <div class="modal-cart-item" style="color: var(--accent);">
        <span>Discount (${appliedCoupon.code})</span>
        <span>-₹${discount.toFixed(2)}</span>
      </div>
    `;
  }

  breakdownHTML += `
    <div class="modal-total">
      <span>Grand Total</span>
      <span>₹${finalTotal.toFixed(2)}</span>
    </div>
  `;

  modalTotal.innerHTML = breakdownHTML;

  // If user is logged in, auto-fill address
  const activeUser = window.BiteXpress.getActiveUser();
  if (activeUser) {
    const fullNameInput = document.getElementById("fullName");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const pincodeInput = document.getElementById("pincode");

    if (fullNameInput) fullNameInput.value = activeUser.name || "";
    if (phoneInput) phoneInput.value = activeUser.phone || "";
    if (addressInput) addressInput.value = activeUser.address || "";
    if (pincodeInput) pincodeInput.value = activeUser.pincode || "";
  }

  modal.classList.add("active");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function handleOrderPlacement(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (!fullName || !phone || !address || !pincode) {
    showToast("Please fill in all fields", "info");
    return;
  }

  // Validate pincode (6 digits)
  if (!/^\d{6}$/.test(pincode)) {
    showToast("Please enter a valid 6-digit pincode", "info");
    return;
  }

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const delivery = 20;
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount);
    } else if (appliedCoupon.discountType === "free_delivery") {
      discount = delivery;
    } else if (appliedCoupon.discountType === "flat") {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }
  const finalTotal = Math.max(0, subtotal + gst + delivery - discount);

  // Generate ORD ID
  const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

  const orderData = {
    orderId,
    name: fullName,
    phone,
    address,
    pincode,
    paymentMethod,
    date: new Date().toISOString(),
    items: [...cart],
    subtotal,
    gst,
    deliveryCharges: delivery,
    discount,
    total: finalTotal,
    status: "Pending" // Initial state for Admin dashboard workflow
  };

  // Save order to history database
  const orders = window.BiteXpress.getOrders();
  orders.unshift(orderData);
  window.BiteXpress.setOrders(orders);

  // Display Premium Alert Success popup
  alert(`🎉 Order Placed Successfully!\n\nOrder ID: ${orderId}\nEstimated Delivery: 35 mins\nTotal Amount: ₹${finalTotal.toFixed(2)}\n\nThank you for ordering with BiteXpress!`);

  // Reset cart
  cart = [];
  appliedCoupon = null;
  updateCartUI();
  updateCouponDisplay();
  
  // Re-sync menu qty selectors if on restaurant details page
  const qtySelectors = document.querySelectorAll(".add-btn-container");
  qtySelectors.forEach(container => {
    const itemId = container.dataset.id;
    updateStoreQuantitySelector(itemId);
  });

  closeCheckoutModal();
  closeCartDrawer();
  document.getElementById("checkoutForm").reset();
}

/* ==========================================
   6. Dynamic Search & Dropdown Auto-complete
   ========================================== */
function initNavbarSearch() {
  const searchInput = document.getElementById("searchInput");
  const resultsDropdown = document.getElementById("searchResultsDropdown");

  if (!searchInput || !resultsDropdown) return;

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (!val) {
      resultsDropdown.innerHTML = "";
      resultsDropdown.classList.remove("active");
      return;
    }

    const restaurants = window.BiteXpress.getRestaurants();
    let matches = [];

    restaurants.forEach((rest) => {
      // Match restaurant name
      if (rest.name.toLowerCase().includes(val) || rest.cuisines.some(c => c.toLowerCase().includes(val))) {
        matches.push({
          type: "restaurant",
          name: rest.name,
          subtitle: rest.cuisines.join(", "),
          image: rest.logo,
          url: `restaurant.html?id=${rest.id}`
        });
      }

      // Match menu item names
      rest.menu.forEach((dish) => {
        if (dish.name.toLowerCase().includes(val) || (dish.description && dish.description.toLowerCase().includes(val))) {
          matches.push({
            type: "dish",
            name: dish.name,
            subtitle: `In ${rest.name} • ₹${dish.price}`,
            image: dish.image,
            url: `restaurant.html?id=${rest.id}&dish=${dish.id}`
          });
        }
      });
    });

    // Remove duplicates by name
    const uniqueMatches = [];
    const seen = new Set();
    matches.forEach(item => {
      const key = `${item.type}-${item.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(item);
      }
    });

    renderSearchDropdown(uniqueMatches.slice(0, 7));
  });

  // Hide dropdown on clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
      resultsDropdown.classList.remove("active");
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      resultsDropdown.classList.add("active");
    }
  });
}

function renderSearchDropdown(items) {
  const resultsDropdown = document.getElementById("searchResultsDropdown");
  if (!resultsDropdown) return;

  resultsDropdown.innerHTML = "";
  if (items.length === 0) {
    resultsDropdown.innerHTML = `<div class="search-item-row" style="cursor: default; justify-content: center; color: var(--text-tertiary);">No matches found</div>`;
    resultsDropdown.classList.add("active");
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "search-item-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='images/pizza.jpg'">
      <div class="info">
        <h4>${item.name}</h4>
        <p><i class="${item.type === 'restaurant' ? 'fas fa-store' : 'fas fa-utensils'}"></i> ${item.subtitle}</p>
      </div>
    `;
    row.addEventListener("click", () => {
      window.location.href = item.url;
    });
    resultsDropdown.appendChild(row);
  });

  resultsDropdown.classList.add("active");
}

/* ==========================================
   7. Mobile Navigation burger Toggle
   ========================================== */
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
  });

  // Close when clicking individual links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("active");
    });
  });
}

/* ==========================================
   8. Contact Us Form Modals
   ========================================== */
function initContactForm() {
  const contactLink = document.getElementById("contactLink");
  const contactModal = document.getElementById("contactModal");
  const closeContactBtn = document.querySelector("#contactModal .close-contact");
  const contactForm = document.getElementById("contactForm");

  if (!contactLink || !contactModal || !closeContactBtn) return;

  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "block";
    contactModal.classList.add("active");
  });

  closeContactBtn.addEventListener("click", () => {
    contactModal.style.display = "none";
    contactModal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
      contactModal.classList.remove("active");
    }
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      console.log("Contact submission:", { name, email, subject, message });
      alert(`Message Sent!\n\nThank you ${name}, we have received your request regarding "${subject}". We will reply back to ${email} within 24 hours.`);

      contactForm.reset();
      contactModal.style.display = "none";
      contactModal.classList.remove("active");
    });
  }
}