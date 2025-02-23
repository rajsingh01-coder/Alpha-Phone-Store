// Add interactivity if needed
// Example: Add event listeners for buttons or dynamic content
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
      alert('Product added to cart!');
    });
  });

  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-links a');
  
  mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
  
  // Close the mobile menu when a menu item is clicked
  menuItems.forEach(item => {
      item.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });

  // Sample Product Data
const products = [
    { id: 1, name: "Phone A", price: 499, brand: "Brand 1", ram: "4GB", storage: "64GB", os: "Android", image: "10.avif" },
    { id: 2, name: "Phone B", price: 699, brand: "Brand 2", ram: "6GB", storage: "128GB", os: "iOS", image: "11.avif" },
    { id: 3, name: "Phone C", price: 799, brand: "Brand 1", ram: "8GB", storage: "256GB", os: "Android", image: "12.avif" },
    { id: 4, name: "Phone D", price: 899, brand: "Brand 2", ram: "6GB", storage: "128GB", os: "iOS", image: "13.avif" },
    { id: 5, name: "Phone E", price: 599, brand: "Brand 1", ram: "4GB", storage: "64GB", os: "Android", image: "2.avif" },
  ];
  
  // DOM Elements
  const productsGrid = document.getElementById("products-grid");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const brandFilter = document.getElementById("brand");
  const ramFilter = document.getElementById("ram");
  const storageFilter = document.getElementById("storage");
  const osFilter = document.getElementById("os");
  const sortBy = document.getElementById("sort-by");
  const gridViewButton = document.getElementById("grid-view");
  const listViewButton = document.getElementById("list-view");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageIndicator = document.getElementById("page-indicator");
  
  // Pagination
  let currentPage = 1;
  const productsPerPage = 4;
  
  // Update Price Range Value
  priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
    filterAndRenderProducts();
  });
  
  // Event Listeners for Filters and Sorting
  brandFilter.addEventListener("change", filterAndRenderProducts);
  ramFilter.addEventListener("change", filterAndRenderProducts);
  storageFilter.addEventListener("change", filterAndRenderProducts);
  osFilter.addEventListener("change", filterAndRenderProducts);
  sortBy.addEventListener("change", filterAndRenderProducts);
  
  // View Toggle
  gridViewButton.addEventListener("click", () => {
    productsGrid.classList.remove("list-view");
  });
  
  listViewButton.addEventListener("click", () => {
    productsGrid.classList.add("list-view");
  });
  
  // Pagination
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      filterAndRenderProducts();
    }
  });
  
  nextPageButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      currentPage++;
      filterAndRenderProducts();
    }
  });
  
  // Filter and Render Products
  function filterAndRenderProducts() {
    const filteredProducts = products.filter(product => {
      return (
        product.price <= priceRange.value &&
        (brandFilter.value === "all" || product.brand === brandFilter.value) &&
        (ramFilter.value === "all" || product.ram === ramFilter.value) &&
        (storageFilter.value === "all" || product.storage === storageFilter.value) &&
        (osFilter.value === "all" || product.os === osFilter.value)
      );
    });
  
    // Sort Products
    switch (sortBy.value) {
      case "price-low-to-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        // Add popularity logic if available
        break;
    }
  
    // Paginate Products
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  
    // Render Products
    productsGrid.innerHTML = paginatedProducts
      .map(
        product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Brand: ${product.brand}</p>
          <p>RAM: ${product.ram}</p>
          <p>Storage: ${product.storage}</p>
          <p>OS: ${product.os}</p>
        </div>
      `
      )
      .join("");
  
    // Update Pagination
    pageIndicator.textContent = `Page ${currentPage}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(filteredProducts.length / productsPerPage);
  }
  
  // Initial Render
  filterAndRenderProducts();

  // Change Main Image on Thumbnail Click
const mainImage = document.getElementById("main-image");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.getAttribute("data-image");
  });
});

// Add to Cart Button
const addToCartButton = document.getElementById("add-to-cart");
addToCartButton.addEventListener("click", () => {
  alert("Product added to cart!");
});

// Add to Wishlist Button
const addToWishlistButton = document.getElementById("add-to-wishlist");
addToWishlistButton.addEventListener("click", () => {
  alert("Product added to wishlist!");
});

// DOM Elements
const cartItems = document.querySelectorAll(".cart-item");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const shippingElement = document.getElementById("shipping");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout");

// Constants
const TAX_RATE = 0.1; // 10%
const SHIPPING_COST = 10;

// Update Totals
function updateTotals() {
  let subtotal = 0;

  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector("p").textContent.replace("$", ""));
    const quantity = parseInt(item.querySelector(".quantity").textContent);
    subtotal += price * quantity;
  });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  shippingElement.textContent = `$${SHIPPING_COST.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Quantity Adjustment
cartItems.forEach(item => {
  const decreaseButton = item.querySelector(".decrease");
  const increaseButton = item.querySelector(".increase");
  const quantityElement = item.querySelector(".quantity");

  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
      updateTotals();
    }
  });

  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateTotals();
  });
});

// Remove Item
cartItems.forEach(item => {
  const removeButton = item.querySelector(".remove-item");

  removeButton.addEventListener("click", () => {
    item.remove();
    updateTotals();
  });
});

// Proceed to Checkout
checkoutButton.addEventListener("click", () => {
  alert("Proceeding to checkout!");
});

// Initial Totals Calculation
updateTotals();


document.addEventListener("DOMContentLoaded", function() {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  // Check if the user has already accepted cookies
  if (!localStorage.getItem("cookiesAccepted")) {
      cookieConsent.style.display = "block"; // Show the cookie consent banner
  }

  // Handle the acceptance of cookies
  acceptCookiesButton.addEventListener("click", function() {
      localStorage.setItem("cookiesAccepted", "true"); // Store the acceptance in local storage
      cookieConsent.style.display = "none"; // Hide the banner
  });
});
