/**
 * TasteHub - Main Application Script
 * Handles DOM manipulation, menu rendering, search & category filtering,
 * shopping cart state management, localStorage persistence, and checkout logic.
 */

// Global State
let cart = [];
let currentCategory = "All";
let searchQuery = "";
let currentDietFilter = "all"; // 'all', 'veg', 'non-veg'

// DOM Element References
const menuGrid = document.getElementById("menu-grid");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("search-input");
const navSearchInput = document.getElementById("nav-search-input");
const dietFilterBtns = document.querySelectorAll(".diet-btn");

// Cart Elements
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountBadge = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal-amount");
const taxEl = document.getElementById("tax-amount");
const totalEl = document.getElementById("total-amount");
const checkoutBtn = document.getElementById("checkout-btn");

// Mobile Menu Elements
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

// Contact Form Elements
const contactForm = document.getElementById("contact-form");

/**
 * Initialise Application on DOM Load
 */
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    renderMenu();
    setupEventListeners();
    setupScrollEffects();
});

/**
 * Render Menu Cards into DOM based on current filter & search
 * @param {Array} itemsToRender - Optional array of items to render
 */
function renderMenu(itemsToRender = null) {
    if (!menuGrid) return;

    let items = itemsToRender;

    if (!items) {
        items = foodData.filter(item => {
            const matchesCategory = currentCategory === "All" || item.category === currentCategory;
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query);
            
            const matchesDiet = currentDietFilter === "all" ||
                (currentDietFilter === "veg" && item.isVeg) ||
                (currentDietFilter === "non-veg" && !item.isVeg);

            return matchesCategory && matchesSearch && matchesDiet;
        });
    }

    // Handle Empty State
    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-menu">
                <i class="fas fa-utensils empty-icon"></i>
                <h3>No dishes found</h3>
                <p>We couldn't find any dishes matching your search criteria. Try searching for something else!</p>
                <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
            </div>
        `;
        return;
    }

    // Render Cards
    menuGrid.innerHTML = items.map(item => `
        <div class="food-card" data-id="${item.id}">
            <div class="food-card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="food-card-img" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\' viewBox=\\'0 0 400 300\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f4f6\\'/><text x=\\'50%\\' y=\\'50%\\' font-family=\\'sans-serif\\' font-size=\\'18\\' font-weight=\\'bold\\' fill=\\'%23e85d04\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>🍽️ ${encodeURIComponent(item.name)}</text></svg>';">
                <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}">
                    <span class="dot"></span>
                </span>
                <span class="rating-badge">
                    <i class="fas fa-star"></i> ${item.rating.toFixed(1)}
                </span>
            </div>
            <div class="food-card-content">
                <div class="food-card-header">
                    <span class="food-category-tag">${item.category}</span>
                    <span class="diet-label">${item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                </div>
                <h3 class="food-name">${item.name}</h3>
                <p class="food-description">${item.description}</p>
                <div class="food-card-footer">
                    <div class="food-price">₹${item.price}</div>
                    <button class="btn-add-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

/**
 * Filter menu items by selected category
 * @param {string} category - Selected category name
 */
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active UI tab state
    categoryButtons.forEach(btn => {
        if (btn.getAttribute("data-category") === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderMenu();
}

/**
 * Filter items by search query string
 * @param {string} query - Search term
 */
function searchFood(query) {
    searchQuery = query;
    // Keep navbar search & menu section search in sync
    if (searchInput && searchInput.value !== query) searchInput.value = query;
    if (navSearchInput && navSearchInput.value !== query) navSearchInput.value = query;
    
    renderMenu();
}

/**
 * Filter by Veg / Non-Veg diet preference
 * @param {string} diet - 'all', 'veg', or 'non-veg'
 */
function filterByDiet(diet) {
    currentDietFilter = diet;
    dietFilterBtns.forEach(btn => {
        if (btn.getAttribute("data-diet") === diet) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    renderMenu();
}

/**
 * Reset all filters to default
 */
function resetFilters() {
    currentCategory = "All";
    searchQuery = "";
    currentDietFilter = "all";
    if (searchInput) searchInput.value = "";
    if (navSearchInput) navSearchInput.value = "";
    
    categoryButtons.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-category") === "All");
    });
    dietFilterBtns.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-diet") === "all");
    });

    renderMenu();
}

/**
 * Add item to cart
 * @param {number} id - Food item ID
 */
function addToCart(id) {
    const foodItem = foodData.find(item => item.id === id);
    if (!foodItem) return;

    const existingCartItem = cart.find(item => item.id === id);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({
            id: foodItem.id,
            name: foodItem.name,
            price: foodItem.price,
            image: foodItem.image,
            isVeg: foodItem.isVeg,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    showToast(`Added "${foodItem.name}" to cart!`);
    
    // Animate cart badge icon
    if (cartCountBadge) {
        cartCountBadge.classList.add("bump");
        setTimeout(() => cartCountBadge.classList.remove("bump"), 300);
    }
}

/**
 * Remove item completely from cart
 * @param {number} id - Cart item ID
 */
function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        saveCart();
        updateCart();
        showToast(`Removed "${removedItem.name}" from cart`, "info");
    }
}

/**
 * Increase quantity of an item in cart
 * @param {number} id - Cart item ID
 */
function increaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
        saveCart();
        updateCart();
    }
}

/**
 * Decrease quantity of an item in cart
 * @param {number} id - Cart item ID
 */
function decreaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            removeFromCart(id);
            return;
        }
        saveCart();
        updateCart();
    }
}

/**
 * Recalculate totals and re-render cart DOM items & badge
 */
function updateCart() {
    if (!cartItemsContainer) return;

    // 1. Calculate Badge Count
    const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountBadge) {
        cartCountBadge.textContent = totalItemCount;
    }

    // 2. Render Cart Items List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i class="fas fa-shopping-basket empty-cart-icon"></i>
                <p>Your cart is empty!</p>
                <span>Add delicious dishes from our menu to satisfy your cravings.</span>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f4f6\\'/><text x=\\'50%\\' y=\\'50%\\' font-size=\\'24\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>🍽️</text></svg>';">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="decreaseQuantity(${item.id})" aria-label="Decrease quantity">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-count">${item.quantity}</span>
                        <button class="qty-btn" onclick="increaseQuantity(${item.id})" aria-label="Increase quantity">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-right">
                    <div class="cart-item-subtotal">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join("");
    }

    // 3. Update Order Summary Calculations
    const totals = calculateTotal();
    if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₹${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${totals.total.toFixed(2)}`;

    // Enable/Disable Checkout Button
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

/**
 * Calculate Cart Subtotal, 5% Tax, and Total
 * @returns {Object} Object containing subtotal, tax, and total
 */
function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    return {
        subtotal: subtotal,
        tax: tax,
        total: total
    };
}

/**
 * Save current cart state into LocalStorage
 */
function saveCart() {
    try {
        localStorage.setItem("tastehub_cart", JSON.stringify(cart));
    } catch (e) {
        console.error("Failed to save cart to localStorage", e);
    }
}

/**
 * Load cart state from LocalStorage on app load
 */
function loadCart() {
    try {
        const savedCart = localStorage.getItem("tastehub_cart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
        } else {
            cart = [];
        }
    } catch (e) {
        console.error("Failed to load cart from localStorage", e);
        cart = [];
    }
}

/**
 * Handle Order Checkout Process
 */
function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }

    const totals = calculateTotal();
    
    // Display Confirmation Dialog / Modal Alert
    const confirmMessage = `Thank you for your order!\n\nYour order total is ₹${totals.total.toFixed(2)}.\nYour order has been placed successfully. Fresh food is on its way!`;
    
    showCustomModal("Order Placed Successfully! 🎉", confirmMessage, () => {
        // Clear Cart State
        cart = [];
        saveCart();
        updateCart();
        closeCart();
    });
}

/**
 * Custom Modal Popup for Checkout & Alerts
 */
function showCustomModal(title, text, onConfirm) {
    const modal = document.createElement("div");
    modal.className = "custom-modal-backdrop";
    modal.innerHTML = `
        <div class="custom-modal-card">
            <div class="modal-icon"><i class="fas fa-check-circle"></i></div>
            <h3>${title}</h3>
            <p>${text.replace(/\n/g, '<br>')}</p>
            <button class="btn btn-primary modal-close-btn">Awesome!</button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add("active"), 10);

    const closeBtn = modal.querySelector(".modal-close-btn");
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        setTimeout(() => {
            modal.remove();
            if (onConfirm) onConfirm();
        }, 300);
    });
}

/**
 * Toast Notification System
 * @param {string} message - Notification text
 * @param {string} type - 'success', 'info', or 'error'
 */
function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "fa-check-circle";
    if (type === "info") icon = "fa-info-circle";
    if (type === "error") icon = "fa-exclamation-circle";

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

/**
 * Open Cart Sidebar Drawer
 */
function openCart() {
    if (cartSidebar) cartSidebar.classList.add("open");
    if (cartOverlay) cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

/**
 * Close Cart Sidebar Drawer
 */
function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove("open");
    if (cartOverlay) cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
}

/**
 * Attach Event Listeners
 */
function setupEventListeners() {
    // 1. Category Filter Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-category");
            filterByCategory(category);
        });
    });

    // 2. Diet Filter Buttons
    dietFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const diet = btn.getAttribute("data-diet");
            filterByDiet(diet);
        });
    });

    // 3. Search Inputs
    if (searchInput) {
        searchInput.addEventListener("input", (e) => searchFood(e.target.value));
    }
    if (navSearchInput) {
        navSearchInput.addEventListener("input", (e) => {
            searchFood(e.target.value);
            // Scroll to menu section when typing in navbar search
            const menuSection = document.getElementById("menu");
            if (menuSection && window.scrollY < menuSection.offsetTop - 150) {
                menuSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // 4. Cart Sidebar Toggles
    if (cartBtn) cartBtn.addEventListener("click", openCart);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCart();
            closeMobileNav();
        }
    });

    // 5. Hamburger Mobile Navigation
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", toggleMobileNav);
    }

    // Close mobile nav on link click
    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileNav);
        });
    }

    // 6. Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactSubmit);
    }
}

/**
 * Toggle Mobile Navigation Menu
 */
function toggleMobileNav() {
    if (navLinks) navLinks.classList.toggle("open");
    if (hamburgerBtn) hamburgerBtn.classList.toggle("open");
}

function closeMobileNav() {
    if (navLinks) navLinks.classList.remove("open");
    if (hamburgerBtn) hamburgerBtn.classList.remove("open");
}

/**
 * Contact Form Submit Validation & Feedback
 */
function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
        showToast("Please fill out all required fields!", "error");
        return;
    }

    // Basic Email Pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address!", "error");
        return;
    }

    // Success feedback
    showToast(`Thank you, ${name}! Your message has been sent successfully.`, "success");
    contactForm.reset();
}

/**
 * Sticky Navigation Bar and Smooth Scroll Setup
 */
function setupScrollEffects() {
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}
