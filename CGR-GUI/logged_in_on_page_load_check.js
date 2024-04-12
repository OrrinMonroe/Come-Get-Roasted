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
    if (response == true) {
      fetch("http://localhost:8080/loggedincustomer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const login = document.getElementById("login");
          const logout = document.getElementById("logout");
          const preferenceList = document.getElementById("preferenceList");

          if (window.screen.width >= 800) {
            const welcome = document.getElementById("welcome");
            welcome.innerHTML = `Welcome, ${response.username}! Points: ${response.points}  `;
          }
          if (window.screen.width < 800) {
            //FIX: Should display "Welcome username points x" on mobile versions of the site in place of "Welcome!".
            const welcomeMobile = document.getElementById("welcomeMobile");
            welcomeMobile.innerHTML = `Welcome, ${response.username}! Points: ${response.points}  `;
          }
          //welcome.innerHTML = `Welcome, ${response.username}! Points: ${response.points}  `;
          logout.style.display = null;
          login.style.display = "none";
          preferenceList.classList.replace("hidden", "nothidden");

          if (response.admin == true) {
            const newButton = document.getElementById("admin");
            newButton.onclick = function () {
              window.location.href = "/CGR-GUI/admin.html";
            };
          }

          preferenceList.classList.replace("hidden", "nothidden");

          fetch(`http://localhost:8080/mostCommonOrder/${response.id}`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }).then((response) =>
            response.json().then((response) => {
              preferenceList.insertAdjacentHTML(
                "afterbegin",
                `<div class="preferenceitem">
                                                    
                                                    <div style="text-align: center"><h2>Order It Again!</h2></div>
                                                    <img src="img/${
                                                      response.img
                                                    }.jpg" />
                                                    <p>${
                                                      response.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                      response.name.slice(1)
                                                    } 
                                                    - \$${response.price} 
                                                    or ${
                                                      response.price * 10
                                                    } points</p> 
                                                    <p>${
                                                      response.description
                                                    }</p>
  
                                                    <!--the following p tags send info to the addToOrder script-->
                                                    <p style="display: none">${
                                                      response.id
                                                    }</p>
                                                    <p style="display: none">${
                                                      response.price
                                                    }</p>
                                                    <p style="display: none">${
                                                      response.name
                                                    }</p>
                                                    <p style="display: none">${
                                                      response.img
                                                    }</p>
                                                    <button class="addToOrder">Order</button>
                                                </div>`
              );
            })
          );
        });
    }
  });
