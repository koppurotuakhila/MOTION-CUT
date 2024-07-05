// scripts.js
document.addEventListener('DOMContentLoaded', () => {
   const cart = [];

   const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.product').forEach(productElement => {
            const productName = productElement.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchTerm)) {
                productElement.style.display = '';
            } else {
                productElement.style.display = 'none';
            }
        });
    });

   document.querySelectorAll('.add-to-cart').forEach(button => {
       button.addEventListener('click', (event) => {
           const productElement = event.target.closest('.product');
           const productId = productElement.getAttribute('data-id');
           const productName = productElement.getAttribute('data-name');
           const productPrice = parseFloat(productElement.getAttribute('data-price'));

           const product = cart.find(p => p.id === productId);

           if (product) {
               product.quantity += 1;
           } else {
               cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
           }

           updateCartDisplay();
       });
   });

   function updateCartDisplay() {
    const cartElement = document.querySelector('.cart');
    if (!cartElement) {
        console.error('Cart element not found');
        return;
    }

    cartElement.innerHTML = '';

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Cart is empty.</p>';
    } else {
        const ul = document.createElement('ul');
        cart.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ₹${product.price.toFixed(2)} x ${product.quantity}`;
            ul.appendChild(li);
        });
        cartElement.appendChild(ul);

        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
        cartElement.appendChild(totalElement);
    }
}
window.placeOrder = function() {
      if (cart.length === 0) {
          alert("Your cart is empty. Please add items to the cart before placing an order.");
          return;
      }

      // Simulate order placement
      alert("Order placed successfully!");

      // Clear the cart after order is placed
      cart.length = 0;
      updateCartDisplay();
  };

   // Show login/signup forms
   window.showLogin = function() {
       document.getElementById('login').classList.add('active');
       document.getElementById('signup').classList.remove('active');
   };

   window.showSignup = function() {
       document.getElementById('login').classList.remove('active');
       document.getElementById('signup').classList.add('active');
   };
  // Review form submission
   const reviewForm = document.querySelector('.review-form form');
   const reviewList = document.querySelector('.review-list');

   reviewForm.addEventListener('submit', function(event) {
       event.preventDefault();
       const reviewText = document.getElementById('review').value;
       const reviewItem = document.createElement('p');
       reviewItem.textContent = reviewText;
       reviewList.appendChild(reviewItem);
       reviewForm.reset();
   });
});




var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        function opentab(tabname){
            for(tablink of tablinks){
                tablink.classList.remove("active-link");
            }
            for(tabcontent of tabcontents){
                tabcontent.classList.remove("active-tab");
            }
            event.currentTarget.classList.add("active-link");
            document.getElementById(tabname).classList.add("active-tab")
        }

const scriptURL = 'https://script.google.com/macros/s/AKfycbwKQUH4CUK3wZbKDdIKmOdCoshMt5bU1CoLB-K-Hs6uK4NkYaPDSw4BB2DevHuOu8TD/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()    
    
    })
    .catch(error => console.error('Error!', error.message))
})






