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
            window.alert("You must be logged in to place an order!");
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

                  let item = JSON.parse(localStorage.getItem(key));
                  
                  if (item.points < 0)
                  {
                    pointsTotal = pointsTotal - item.points;
                  }                  
                }

                if (pointsTotal + (orderPrice * 10) < response.points)
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
                      
                  </div>`
                                
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
    transactionId: 0,
    drinkId: drink_Id,
    customerId: customer_Id,
    price: drink_Price,
    points: drink_points
  }

  addToCart(item, drink_name);
}

//adds an item to the shopping cart and displays a message informing the user
function addToCart(item, drink_name) {
  let item_serialized = JSON.stringify(item);

  localStorage.setItem(`${drink_name}`, item_serialized);

  let mainDiv = document.getElementById('main');
  mainDiv.innerHTML = `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'><h2>${drink_name} added to cart!</h2><a href="index.html"><button>Return to List</button></a><br /><button class="viewCartAndCheckout" style="margin-top: 10px;" >View Cart and Checkout</button></div>`

  const viewCart = document.querySelector('.viewCartAndCheckout');

  //This calls the function to open the shopping cart
  viewCart.addEventListener("click", (event) => {
    event.preventDefault();

    viewShoppingCart();
  });
}

//generates a cart array from localStorage and then displays it to the user
function viewShoppingCart() {
  if (localStorage.length == 0) {
    window.alert("Please add at least one item to cart.");
  } else {
    let cart = [];

    let mainDiv = document.getElementById('main');
    mainDiv.innerHTML = `<div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'><a href="index.html"><button style="margin-top: 20px">Back to List</button></a>`;

    let cartSize = 0;
    
    for (const key in localStorage) {
      let item = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) == null)
      {
        break;
      }
      cart.push(item);
      console.log(item);
      cartSize++;
    }

    let i = 0;

    while (i < cartSize) {
      if (cart[i] == null) {
        break;
      }

      mainDiv.insertAdjacentHTML('beforeend', 
        `
        <div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'>
          <h3>Item ${(i+1)}</h3>
          <p>${localStorage.key(i)}</p>
          <p>Price: $${cart[i].price}.00</p>
          <p>Points Accrued: ${cart[i].points}</p>
          <p style="display: none">${localStorage.key(i)}</p>
          <button class="removeFromCart">Remove from Cart</button>
        </div>
        `);

      i++;
    }

    mainDiv.insertAdjacentHTML('beforeend', `
    <div class="inputForm" align='center' style='position: relative, width: 50%; margin-left: auto; margin-right: auto;'>
        <button class="finalOrderPlacement">Submit Order</button>
        </div>
    `);

    removeFromCart();
    finalOrderPlacement();
  }
}

//submits the order to the database by building the cart from localStorage and submitting each item in the cart as a transaction
function finalOrderPlacement() {

  let finalOrderSubmit = document.querySelector('.finalOrderPlacement');

  finalOrderSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    let mainDiv = document.getElementById('main');

    if (localStorage.length == 0) {
      window.alert("Please add at least one item to cart.");
    } else {
      let cart = [];

      let cartSize = 0;
      
      for (const key in localStorage) {
        if (localStorage.getItem(key) == null)
        {
          break;
        }

        let item = JSON.parse(localStorage.getItem(key));

        cart.push(item);

        cartSize++;
      }

      let i = 0;

      while (i < cartSize) {
        if (cart[i] == null) {
          break;
        }

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
      localStorage.clear();

      window.location.href = "thank_you.html";
    }
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
