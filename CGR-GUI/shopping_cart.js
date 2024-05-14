setTimeout(addToOrder, 500);

function addToOrder() {

  const orderButtons = document.querySelectorAll(".addToOrder");

  for (let i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo(0,0);

      fetch("http://localhost:8080/loggedInUser", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response == false) {
            var modal = document.getElementById("checkoutAsGuestModal");

            // Get the <span> element that closes the modal
            var closeCheckout = document.getElementById("closeCheckout");
    
            // When the user clicks the button, open the modal 
    
            modal.style.display = "block";
    
            // When the user clicks on <span> (x), close the modal
            closeCheckout.onclick = function() {
                modal.style.display = "none";
            }
    
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
              }

            const checkoutGuest = document.querySelector('.guestCheckout');

            checkoutGuest.addEventListener("click", (event) => {
              event.preventDefault();
              console.log("Event Listener Worked")
              guestCheckout(orderButtons[i]);
            });
          } else if (response == true) {

            fetch("http://localhost:8080/loggedincustomer", {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            })
              .then((response) => response.json())
              .then((response) => {
                let orderCustomer_id = parseInt(`${response.id}`);
                // console.log(orderCustomer_id);

                let orderDrinkname =
                  orderButtons[i].previousElementSibling
                    .previousElementSibling.innerText;
                // console.log(orderDrinkname);

                let orderDrinkImg =
                  orderButtons[i].previousElementSibling.innerText;
                // console.log(orderDrinkImg);

                let orderPrice =
                  parseInt(orderButtons[i].previousElementSibling
                    .previousElementSibling.previousElementSibling.innerText);
                // console.log(orderPrice);

                let orderDrinkId =
                  parseInt(orderButtons[i].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
                // console.log(orderDrinkId);

                let mainDiv = document.getElementById('main');
                mainDiv.innerHTML = ``;

                mainDiv.insertAdjacentHTML(
                  "beforeend",
                  `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'>
                      <a href="index.html"><button style="margin-top: 20px">Back to List</button></a>
                      <h2>Order</h2>
                      <img src="img/${orderDrinkImg}.jpg" class="orderImage" />
                      <h3>${orderDrinkname}</h3>
                      <p>$${orderPrice}.00 or ${orderPrice * 10} points<p>
                    </div>`
                )

                let pointsTotal = 0;

                for (const key in localStorage) {
                  if (localStorage.length == 0)
                  {
                    break;
                  }

                  if (localStorage.getItem(key) == null)
                  {
                    break;
                  }

                  if (key == "hasCodeRunBefore")
                  {
                    continue;
                  }          

                  let item = JSON.parse(localStorage.getItem(key));
                  
                  if (item.points < 0)
                  {
                    pointsTotal = pointsTotal - item.points;
                  }                  
                }

                if (pointsTotal + (orderPrice * 10) <= response.points)
                {
                  mainDiv.insertAdjacentHTML(
                    "beforeend",
                    `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px;'>

                    <button class="submitToCartPoints">Add to Cart - Pay With Points</button>
                    </div>`             
                  )
                }
                else
                {
                  mainDiv.insertAdjacentHTML(
                    "beforeend",
                    `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'margin-top: 10px; margin-bottom: 10px;>

                      <button style="pointer-events: none">Not Enough Points</button>
                    </div>`             
                  )
                }

                mainDiv.insertAdjacentHTML(
                  "beforeend",
                  `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px;'>

                  <button class="submitToCart">Add to Cart - Pay With Money</button>
                      
                  </div>
                  
                  <!-- Modal that confirms an item was added to the cart -->
                  <div id="cartConfirmModal" class="modal">
              
                    <!-- Modal content -->
                    <div class="modal-content">
                      <span class="close" id="addedToCartClose">&times;</span>
                      <div class="inputForm">
                      <h2>${orderDrinkname} added to cart!</h2>
                      <button class="viewCartAndCheckout" style="margin-top: 10px;" >View Cart and Checkout</button>
                      </div>
                    </div>
                  </div>
                  `
                                
                )

                const submitDrinkToCart = document.querySelector('.submitToCart');

                //calls function to add a drink to the cart
                submitDrinkToCart.addEventListener("click", (event) => {
                  event.preventDefault();

                  itemSubmit(orderCustomer_id, orderDrinkId, orderPrice, orderDrinkname, orderPrice);
                });

                const submitDrinkToCartPoints = document.querySelector('.submitToCartPoints');

                //calls function to add a drink to the cart paying with points instead of money
                submitDrinkToCartPoints.addEventListener("click", (event) => {
                  event.preventDefault();

                  itemSubmit(orderCustomer_id, orderDrinkId, 0, orderDrinkname, -(orderPrice*10));
                });
              });
          }
        });
    });
  }
}


//Creates an item object and then submits it to the addToCart function
function itemSubmit (customer_Id, drink_Id, drink_Price, drink_name, drink_points) {

  let item = {
    drinkId: drink_Id,
    customerId: customer_Id,
    basePrice: drink_Price,
    basePoints: drink_points,
    baseQuantity: 1,
  }

  //basePoints and basePrice represent the price of one item, while points and price will change as the item quantity changes
  item.price = item.basePrice;
  item.points = item.basePoints;
  item.quantity = item.baseQuantity;

  //this for loop checks to see if the item is already in local storage and, if it is, updates the quantity of the item in local storage instead of adding a new item to local storage
  for (const key in localStorage) {
    if (localStorage.length == 0 ) 
    {
      break;
    }

    if (localStorage.getItem(key) == null)
    {
      break;
    }

    if (key == "hasCodeRunBefore")
    {
      continue;
    }

    if (key == drink_name)
    {
      itemInCart = JSON.parse(localStorage.getItem(key));
      item.price = item.price + itemInCart.price;
      item.points = item.points + itemInCart.points;
      item.quantity = item.quantity + itemInCart.quantity;
    }

  }

  if (item.customerId == 0)
  {
    addToCartGuest(item, drink_name)
  }
  else {
  addToCart(item, drink_name);
  }
}

//adds an item to the shopping cart and displays a message informing the user
function addToCart(item, drink_name) {
  let item_serialized = JSON.stringify(item);

  localStorage.setItem(`${drink_name}`, item_serialized);

  //displays the modal for confirming the cart
  var modal = document.getElementById("cartConfirmModal");

  // Get the <span> element that closes the modal
  var addedToCartClose = document.getElementById("addedToCartClose");

  // When the user clicks the button, open the modal 

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  addedToCartClose.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  const viewCart = document.querySelector('.viewCartAndCheckout');

  //This calls the function to open the shopping cart
  viewCart.addEventListener("click", (event) => {
    event.preventDefault();

    viewShoppingCart();
  });
}

//generates a cart array from localStorage and then displays it to the user
function viewShoppingCart() {

  const hamMenu = document.querySelector('.ham-menu');

  const offScreenMenu = document.querySelector('.off-screen-menu');

  if (hamMenu.classList.contains('active')) {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
  }

  fetch("http://localhost:8080/loggedInUser", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((response) => {
    let cart = [];

    let mainDiv = document.getElementById('main');
    mainDiv.innerHTML = `<div class="cartHeader"><h2>Your Cart</h2></div>`;

    let cartSize = 0;
    let total = 0;
    
    for (const key in localStorage) {
      let item = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) == null)
      {
        break;
      }

      // console.log(key);

      if (key == "hasCodeRunBefore")
      {
        localStorage.removeItem(key);
      }
      else 
      {
        total = total + item.price;
        cart.push(item);
        console.log(item);
        cartSize++;
      }
    }

    let i = 0;

    if (cartSize == 0)
    {
      mainDiv.insertAdjacentHTML('beforeend', 
        `
        <div class="inputForm itemInCart">
        <p>Cart is empty.</p>
        </div>
        `);
    }

    while (i < cartSize) {
      if (cart[i] == null) {
        break;
      }

      if ( (response == true) && (cart[i].points > 0)) {

        mainDiv.insertAdjacentHTML('beforeend', 
          `
          <div class="inputForm itemInCart">
            <img class="cartImage" src="img/${localStorage.key(i)}.jpg" alt="A cup of ${localStorage.key(i)}" />
            <h2>${localStorage.key(i)}</h2>
            <span>Quantity: ${cart[i].quantity}<button class="changeQuantity minus">-</button><button class="changeQuantity plus">+</button></span>
            <p>Price: $${cart[i].price}.00</p>
            <p>Points Accrued: ${cart[i].points}</p>
            <p style="display: none">${localStorage.key(i)}</p>
            <button class="removeFromCart">Remove from Cart</button>
          </div>
          `);
      } else if ((response == true) && (cart[i].points <= 0)) {
        mainDiv.insertAdjacentHTML('beforeend', 
        `
        <div class="inputForm itemInCart">
          <img class="cartImage" src="img/${localStorage.key(i)}.jpg" alt="A cup of ${localStorage.key(i)}" />
          <h2>${localStorage.key(i)}</h2>
          <span>Quantity: ${cart[i].quantity}</span>
          <p>Price: $${cart[i].price}.00</p>
          <p>Points Accrued: ${cart[i].points}</p>
          <p style="display: none">${localStorage.key(i)}</p>
          <button class="removeFromCart">Remove from Cart</button>
        </div>
        `);
      } else {
        mainDiv.insertAdjacentHTML('beforeend', 
          `
          <div class="inputForm itemInCart">
            <img class="cartImage" src="img/${localStorage.key(i)}.jpg" alt="A cup of ${localStorage.key(i)}" />
            <h2>${localStorage.key(i)}</h2>
            <span>Quantity: ${cart[i].quantity}<button class="changeQuantity minus">-</button><button class="changeQuantity plus">+</button></span>
            <p>Price: $${cart[i].price}.00</p>
            <p style="display: none">${localStorage.key(i)}</p>
            <button class="removeFromCart">Remove from Cart</button>
          </div>
          `);        
      }

      i++;
    }

    mainDiv.insertAdjacentHTML('beforeend', `
    <div class="inputForm itemInCart">
        <h2>Order Total: $${total}.00</h2>
        <button class="finalOrderPlacement" id="finalOrderPlacement">Submit Order</button>
        </div>

        <!-- Modal for alerting somebody when they try to submit a cart with no items -->
        <div id="submitCartFailModal" class="modal">
  
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close" id="submitAlertClose">&times;</span>
            <p>Error: No items in cart! Cannot submit order.</p>
          </div>
  
        </div>
    `);

    removeFromCart();
    addQuantity();
    subtractQuantity();
    finalOrderPlacement();
  });

}

//submits the order to the database by building the cart from localStorage and submitting each item in the cart as a transaction
function finalOrderPlacement() {

  let finalOrderSubmit = document.querySelector('.finalOrderPlacement');

  finalOrderSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    let mainDiv = document.getElementById('main');

      let cart = [];
      let cartSize = 0;
      
      for (const key in localStorage) {
        if (localStorage.getItem(key) == null)
        {
          break;
        }

        if (key == "hasCodeRunBefore")
        {
          continue;
        }

        let storageItem = JSON.parse(localStorage.getItem(key));

        for (let i = 1; i <= storageItem.quantity; i++)
        {
          let item = {
            transactionId: 0,
            drinkId: storageItem.drinkId,
            customerId: storageItem.customerId,
            price: storageItem.basePrice,
            points: storageItem.basePoints
          }

          // console.log(item);
          console.log(item.points);
          cart.push(item);
          cartSize++;

          fetch("http://localhost:8080/loggedincustomer", {
            method: 'PUT',
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
            },
          })
        }
      }

      // console.log(cart);

      let i = 0;

      // console.log(cart.length);

      // console.log(cart);

      if (cartSize == 0)
      {
        var modal = document.getElementById("submitCartFailModal");

        // Get the <span> element that closes the modal
        var submitAlertClose = document.getElementById("submitAlertClose");

        // When the user clicks the button, open the modal 

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        submitAlertClose.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return;
      }

      while (i < cart.length) {
        console.log(cart[i]);

        fetch("http://localhost:8080/transaction", {
          method: 'POST', 
          mode: 'cors', 
          headers: {
            "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
         },
         body: JSON.stringify(cart[i])
        })

        i++;
      }

      mainDiv.innerHTML = `<div class="inputForm" align="center" style="position: relative, width: 50%; margin-left: auto; margin-right: auto;"><h2>Thank you for your order!</h2><h3>You'll be returned to the homepage shortly!</h3></div>`;

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "index.html";
      }, 2000);
  });

}

//removes an item from the cart by deleting it from localStorage
function removeFromCart() {
  const removeButtons = document.querySelectorAll(".removeFromCart");

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", (event) => {
      const keyToRemove = removeButtons[i].previousElementSibling.innerText;

      localStorage.removeItem(keyToRemove);

      if (localStorage.length > 0) 
      {
        viewShoppingCart();
      }
      else 
      {
        window.location.href = "index.html";
      }
    }
  )}
}

function addQuantity() {
  const addQuantityButtons = document.querySelectorAll(".plus");
  
  for (let i = 0; i < addQuantityButtons.length; i++) {
    addQuantityButtons[i].addEventListener("click", (event) => {
      const cartItemName = addQuantityButtons[i].parentElement.previousElementSibling.innerHTML;
      
      let item = JSON.parse(localStorage.getItem(cartItemName));
      item.price = item.price + item.basePrice;
      item.points = item.points + item.basePoints;
      item.quantity = item.quantity + item.baseQuantity;

      let item_serialized = JSON.stringify(item);

      localStorage.setItem(cartItemName, item_serialized);
      viewShoppingCart();
    });
  }
}

function subtractQuantity() {
  const subtractQuantityButtons = document.querySelectorAll(".minus");
  
  for (let i = 0; i < subtractQuantityButtons.length; i++) {
    subtractQuantityButtons[i].addEventListener("click", (event) => {

      const cartItemName = subtractQuantityButtons[i].parentElement.previousElementSibling.innerHTML;
      
      let item = JSON.parse(localStorage.getItem(cartItemName));

      if (item.quantity == 1) 
      {
        localStorage.removeItem(cartItemName);

        if (localStorage.length > 0)
        {
          viewShoppingCart();
        }
        else
        {
          window.location.href="index.html";
        }
      }
      else
      {
        item.price = item.price - item.basePrice;
        item.points = item.points - item.basePoints;
        item.quantity = item.quantity - item.baseQuantity;

        let item_serialized = JSON.stringify(item);

        localStorage.setItem(cartItemName, item_serialized);
        viewShoppingCart();
      }
    });
  }
}

function guestCheckout(orderButton) 
{
    let orderCustomer_id = 0;
    console.log(orderCustomer_id);

    let orderDrinkname = orderButton.previousElementSibling.previousElementSibling.innerText;
    console.log(orderDrinkname);

    let orderDrinkImg = orderButton.previousElementSibling.innerText;
    console.log(orderDrinkImg);

    let orderPrice = parseInt(orderButton.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
    console.log(orderPrice);

    let orderDrinkId = parseInt(orderButton.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
    console.log(orderDrinkId);

    let mainDiv = document.getElementById('main');
  mainDiv.innerHTML = ``;

  mainDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'>
        <a href="index.html"><button style="margin-top: 20px">Back to List</button></a>
        <h2>Order</h2>
        <img src="img/${orderDrinkImg}.jpg" class="orderImage" />
        <h3>${orderDrinkname}</h3>
        <p>$${orderPrice}.00 or ${orderPrice * 10} points<p>
      </div>`
  )
  
  mainDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'margin-top: 10px; margin-bottom: 10px;>

      <button style="pointer-events: none">Not Enough Points</button>
    </div>`             
  )

  mainDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px;'>

    <button class="submitToCart">Add to Cart - Pay With Money</button>
        
    </div>
    
    <!-- Modal that confirms an item was added to the cart -->
    <div id="cartConfirmModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" id="addedToCartCloseGuest">&times;</span>
        <div class="inputForm">
        <h2>${orderDrinkname} added to cart!</h2>
        <button class="viewCartAndCheckout" style="margin-top: 10px;" >View Cart and Checkout</button>
        </div>
      </div>
    </div>`
                  
  )

  const submitDrinkToCart = document.querySelector('.submitToCart');

  //calls function to add a drink to the cart
  submitDrinkToCart.addEventListener("click", (event) => {
    event.preventDefault();

    itemSubmit(orderCustomer_id, orderDrinkId, orderPrice, orderDrinkname, orderPrice);
  });
}

//adds an item to the shopping cart and displays a message informing the user
function addToCartGuest(item, drink_name) {
  let item_serialized = JSON.stringify(item);

  localStorage.setItem(`${drink_name}`, item_serialized);

  //displays the modal for confirming the cart
  var modal = document.getElementById("cartConfirmModal");

  // Get the <span> element that closes the modal
  var addedToCartCloseGuest = document.getElementById("addedToCartCloseGuest");

  // When the user clicks the button, open the modal 

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  addedToCartCloseGuest.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  const viewCart = document.querySelector('.viewCartAndCheckout');

  //This calls the function to open the shopping cart
  viewCart.addEventListener("click", (event) => {
    event.preventDefault();

    viewShoppingCart();
  });
}
