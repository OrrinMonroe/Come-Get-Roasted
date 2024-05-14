const listEl = document.getElementById("drinklist");

fetch("http://localhost:8080/coffees", {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((drink) => {
      listEl.insertAdjacentHTML(
        "beforeend",
        `<div class="menuitem">
                    <img src="img/${drink.img}.jpg" />
                    <p>${
                      drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                    }</p> 
                    <p>$${drink.price} 
                    or ${drink.price * 10} points</p>  
                    <p class="desc">${drink.description}</p>

                    <!--the following p tags send info to the addToOrder script-->
                    <p style="display: none">${drink.id}</p>
                    <p style="display: none">${drink.price}</p>
                    <p style="display: none">${drink.name}</p>
                    <p style="display: none">${drink.img}</p>
                    <button class="addToOrder">Order</button>
                </div>`
      );
    });
  });

const clear = document.querySelector('.clear');
const espresso = document.querySelector('.espresso');
const americano = document.querySelector('.americano');
const cold = document.querySelector('.cold');
const point = document.querySelector('.points');

clear.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((drink) => {
      listEl.insertAdjacentHTML(
        "beforeend",
        `<div class="menuitem">
                    <img src="img/${drink.img}.jpg" />
                    <p>${
                      drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                    }</p> 
                    <p>$${drink.price} 
                    or ${drink.price * 10} points</p> 
                    <p>${drink.description}</p>

                    <!--the following p tags send info to the addToOrder script-->
                    <p style="display: none">${drink.id}</p>
                    <p style="display: none">${drink.price}</p>
                    <p style="display: none">${drink.name}</p>
                    <p style="display: none">${drink.img}</p>
                    <button class="addToOrder">Order</button>
                </div>`
      );
    });

    const shoppingCart = document.createElement('script');

    shoppingCart.setAttribute('src', 'shopping_cart.js');

    document.body.appendChild(shoppingCart);
  });
  
});

espresso.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.add('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.add('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Espresso")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p>  
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>
                    `
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

americano.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.add('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.add('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Americano")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p> 
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>`
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

cold.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.add('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.add('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Cold Drink")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p> 
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>`
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

point.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.add('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.add('filterActive');

  listEl.innerHTML = ``;

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
          if (response == false) 
          {
            return;
          }
          else if (response == true)
          {
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

                let userPoints = response.points;

                fetch("http://localhost:8080/coffees", {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                  }
                })
                  .then((response) => response.json())
                  .then((data) => {
                    data.forEach((drink) => {
                      if (userPoints >= (drink.price * 10))
                      {
                        listEl.insertAdjacentHTML(
                          "beforeend",
                          `<div class="menuitem">
                                      <img src="img/${drink.img}.jpg" />
                                      <p>${
                                        drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                                      }</p> 
                                      <p>$${drink.price} 
                                      or ${drink.price * 10} points</p>  
                                      <p>${drink.description}</p>
                  
                                      <!--the following p tags send info to the addToOrder script-->
                                      <p style="display: none">${drink.id}</p>
                                      <p style="display: none">${drink.price}</p>
                                      <p style="display: none">${drink.name}</p>
                                      <p style="display: none">${drink.img}</p>
                                      <button class="addToOrder">Order</button>
                                  </div>`
                        );
                      }
                    });

                    const shoppingCart = document.createElement('script');

                    shoppingCart.setAttribute('src', 'shopping_cart.js');
              
                    document.body.appendChild(shoppingCart);
                  });
              });
        }
      })

      
});

const clearMobile = document.querySelector('.clearMobile');
const espressoMobile = document.querySelector('.espressoMobile');
const americanoMobile = document.querySelector('.americanoMobile');
const coldMobile = document.querySelector('.coldMobile');
const pointMobile = document.querySelector('.pointsMobile');

clearMobile.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((drink) => {
      listEl.insertAdjacentHTML(
        "beforeend",
        `<div class="menuitem">
                    <img src="img/${drink.img}.jpg" />
                    <p>${
                      drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                    }</p> 
                    <p>$${drink.price} 
                    or ${drink.price * 10} points</p> 
                    <p>${drink.description}</p>

                    <!--the following p tags send info to the addToOrder script-->
                    <p style="display: none">${drink.id}</p>
                    <p style="display: none">${drink.price}</p>
                    <p style="display: none">${drink.name}</p>
                    <p style="display: none">${drink.img}</p>
                    <button class="addToOrder">Order</button>
                </div>`
      );
    });

    const shoppingCart = document.createElement('script');

    shoppingCart.setAttribute('src', 'shopping_cart.js');

    document.body.appendChild(shoppingCart);
  });
  
});

espressoMobile.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.add('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.add('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Espresso")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p>  
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>`
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

americanoMobile.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.add('filterActive');
  cold.classList.remove('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.add('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Americano")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p> 
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>`
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

coldMobile.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.add('filterActive');
  point.classList.remove('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.add('filterActive');
  pointMobile.classList.remove('filterActive');

  listEl.innerHTML = ``;

  fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((drink) => {
        if (drink.category == "Cold Drink")
        {
          listEl.insertAdjacentHTML(
            "beforeend",
            `<div class="menuitem">
                        <img src="img/${drink.img}.jpg" />
                        <p>${
                          drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                        }</p> 
                        <p>$${drink.price} 
                        or ${drink.price * 10} points</p> 
                        <p>${drink.description}</p>
    
                        <!--the following p tags send info to the addToOrder script-->
                        <p style="display: none">${drink.id}</p>
                        <p style="display: none">${drink.price}</p>
                        <p style="display: none">${drink.name}</p>
                        <p style="display: none">${drink.img}</p>
                        <button class="addToOrder">Order</button>
                    </div>`
          );
        }
      });

      const shoppingCart = document.createElement('script');

      shoppingCart.setAttribute('src', 'shopping_cart.js');

      document.body.appendChild(shoppingCart);
    });
});

pointMobile.addEventListener("click", event => {
  event.preventDefault();

  espresso.classList.remove('filterActive');
  americano.classList.remove('filterActive');
  cold.classList.remove('filterActive');
  point.classList.add('filterActive');
  espressoMobile.classList.remove('filterActive');
  americanoMobile.classList.remove('filterActive');
  coldMobile.classList.remove('filterActive');
  pointMobile.classList.add('filterActive');

  listEl.innerHTML = ``;

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
          if (response == false) 
          {
            return;
          }
          else if (response == true)
          {
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

                let userPoints = response.points;

                fetch("http://localhost:8080/coffees", {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                  }
                })
                  .then((response) => response.json())
                  .then((data) => {
                    data.forEach((drink) => {
                      if (userPoints >= (drink.price * 10))
                      {
                        listEl.insertAdjacentHTML(
                          "beforeend",
                          `<div class="menuitem">
                                      <img src="img/${drink.img}.jpg" />
                                      <p>${
                                        drink.name.charAt(0).toUpperCase() + drink.name.slice(1)
                                      }</p> 
                                      <p>$${drink.price} 
                                      or ${drink.price * 10} points</p>  
                                      <p>${drink.description}</p>
                  
                                      <!--the following p tags send info to the addToOrder script-->
                                      <p style="display: none">${drink.id}</p>
                                      <p style="display: none">${drink.price}</p>
                                      <p style="display: none">${drink.name}</p>
                                      <p style="display: none">${drink.img}</p>
                                      <button class="addToOrder">Order</button>
                                  </div>`
                        );
                      }
                    });

                    const shoppingCart = document.createElement('script');

                    shoppingCart.setAttribute('src', 'shopping_cart.js');
              
                    document.body.appendChild(shoppingCart);
                  });
              });
        }
      })

      
});
