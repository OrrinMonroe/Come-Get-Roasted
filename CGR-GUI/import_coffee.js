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
                    } 
                    - \$${drink.price} 
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
  });
