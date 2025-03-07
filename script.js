//RATING
function setRating(starElement) {
  // Găsește toate stelele din containerul părinte
  let stars = starElement.parentElement.querySelectorAll(".cart__star");

  // Găsește indexul stelei pe care s-a dat click
  let index = Array.from(stars).indexOf(starElement) + 1;

  // Parcurge și actualizează clasele stelelor
  stars.forEach((star, i) => {
    if (i < index) {
      star.classList.add("active"); // Stelele active (galbene)
    } else {
      star.classList.remove("active"); // Stelele inactive (gri)
    }
  });
}
//Quantity
// Function to update quantity and total price
function updateQuantity(button, change) {
  // Find the current quantity and update the value
  let quantityElement = button.parentElement.querySelector(".cart__quantity");
  let quantity = parseInt(quantityElement.textContent);

  // Update quantity
  quantity += change;

  // Ensure the quantity is not less than 1
  if (quantity < 1) {
    quantity = 1;
  }

  // Set the new quantity
  quantityElement.textContent = quantity;

  // Get unit price from the price cell
  let unitPrice = parseFloat(
    button
      .closest("tr")
      .querySelector(".cart__cell--price")
      .textContent.replace("$", "")
      .trim()
  );

  // Calculate total price
  let totalPrice = unitPrice * quantity;

  // Update total price in the row
  let totalPriceElement = button
    .closest("tr")
    .querySelector(".cart__total-price");
  totalPriceElement.textContent = totalPrice.toFixed(2); // Format to 2 decimals

  // Update the cart total (this will be updated dynamically)
  updateCartTotal();
}

// Function to remove item from cart
function removeItem(button) {
  // Find the parent row of the button
  let row = button.closest("tr");

  // Remove the row from the DOM
  row.remove();

  // Update the cart total after removing the item
  updateCartTotal();
}

// Function to update the cart's subtotal, tax, and total
function updateCartTotal() {
  let subtotal = 0;

  // Find all total price elements for each product
  let totalElements = document.querySelectorAll(".cart__total-price");

  // Sum up the total price of all items
  totalElements.forEach(function (totalElement) {
    subtotal += parseFloat(totalElement.textContent);
  });

  // Calculate the tax (5% of subtotal)
  let tax = subtotal * 0.05; // 5% tax

  // Calculate the total (subtotal + tax)
  let total = subtotal + tax;

  // Update the subtotal, tax, and total in the cart-summary section
  document.getElementById(
    "subtotal"
  ).textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  document.getElementById("taxe").textContent = `Taxe: $${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

// Call the updateCartTotal initially to set the correct values on page load
updateCartTotal();

// SEARCH
// Afișează sau ascunde spațiul de căutare la click pe iconul de căutare

function toggleSearch(event) {
  event.preventDefault(); // Previne comportamentul implicit al link-ului
  event.stopPropagation(); // Previne propagarea evenimentului pentru click-ul pe iconul de căutare
  const searchSpace = document.getElementById("search-space");
  const isVisible = searchSpace.style.display === "block";
  searchSpace.style.display = isVisible ? "none" : "block"; // Afișează/ascunde spațiul de căutare
}

// Închide spațiul de căutare
function closeSearch() {
  const searchSpace = document.getElementById("search-space");
  searchSpace.style.display = "none";
}

// search-button
document.addEventListener("DOMContentLoaded", () => {
  const toggleSearch = () => {
    const searchForm = document.querySelector(".search-form");
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.querySelector(".search-input");
    const searchClose = document.querySelector(".search-close");

    if (!searchForm || !searchButton || !searchInput || !searchClose) return;

    // Clic pe butonul de căutare
    searchButton.addEventListener("click", () => {
      searchForm.classList.toggle("active-search");
      searchInput.focus();
    });

    // Clic pe butonul de închidere (X)
    searchClose.addEventListener("click", () => {
      searchForm.classList.remove("active-search");
      searchInput.value = ""; // Șterge textul când se închide căutarea
    });

    // Apăsarea tastei "Enter"
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchInput.value = ""; // Șterge textul după apăsarea Enter
        searchForm.classList.remove("active-search");
      }
    });
  };

  // Apelează funcția pentru a activa căutarea după încărcarea paginii
  toggleSearch();
});

//side-button 
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".side-button");
  const navLinks = document.querySelector(".nav-links");

  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("hidden");
  });
});


//side-button

document.querySelectorAll('.nav-item > a').forEach(item => {
  item.addEventListener('click', function () {
    const parent = this.parentElement;
    parent.classList.toggle('active');
  });
});
