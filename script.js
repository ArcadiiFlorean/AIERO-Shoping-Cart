



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
  let unitPrice = parseFloat(button.closest("tr").querySelector(".cart__cell--price").textContent.replace('$', '').trim());

  // Calculate total price
  let totalPrice = unitPrice * quantity;

  // Update total price in the row
  let totalPriceElement = button.closest("tr").querySelector(".cart__total-price");
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
  totalElements.forEach(function(totalElement) {
    subtotal += parseFloat(totalElement.textContent);
  });

  // Calculate the tax (5% of subtotal)
  let tax = subtotal * 0.05; // 5% tax

  // Calculate the total (subtotal + tax)
  let total = subtotal + tax;

  // Update the subtotal, tax, and total in the cart-summary section
  document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  document.getElementById("taxe").textContent = `Taxe: $${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

// Call the updateCartTotal initially to set the correct values on page load
updateCartTotal();
