loginCheck();

function loginCheck() {
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
            if (document.getElementById("preferenceList") != null) {
              const preferenceList = document.getElementById("preferenceList");
            }

            if (window.screen.width >= 800) {
              const welcome = document.getElementById("welcome");
              welcome.innerHTML = `Welcome,  ${response.firstname} ${response.lastname}! Points: ${response.points}  `;
            }
            

            const welcomeMobile = document.getElementById("welcome-mobile");
            
            if (welcomeMobile != null) {
              welcomeMobile.innerHTML = `<h3>Welcome, ${response.firstname} ${response.lastname}! Points: ${response.points}</h3>`;
            }

            fetch("http://localhost:8080/loggedincustomer", {
              method: "PUT",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
            //welcome.innerHTML = `Welcome, ${response.username}! Points: ${response.points}  `;
            logout.style.display = null;
            login.style.display = "none";
            if (document.getElementById("preferenceList") != null) {
              preferenceList.classList.replace("hidden", "nothidden");
            }

            if (document.getElementById("preferenceList") != null) {
              preferenceList.classList.replace("hidden", "nothidden");
            }

            let userID = response.id;

            const loginMobile = document.querySelector('.loginMobile');
            console.log("yay!");
            loginMobile.classList.replace("nothiddenmobilemenu", "hidden");
            loginMobile.classList.remove("bottomBorder");

            const logoutMobile = document.querySelector('.logoutMobile');
            logoutMobile.classList.replace("hidden", "nothiddenmobilemenu");
            logoutMobile.classList.add("bottomBorder");

            const accountMobile = document.querySelector('.accountMobile');
            accountMobile.classList.replace("hidden", "nothiddenmobilemenu");

            const adminMobile = document.querySelector('.adminMobile');

            const adminButton = document.querySelector(".admin");

            if (response.admin == true) {
              console.log(response.admin);
              adminButton.classList.replace("hidden", "nothidden");
              adminMobile.classList.replace("hidden", "nothiddenmobilemenu");
              accountMobile.classList.add("bottomBorder");
            } else {
              adminButton.classList.replace("nothidden", "hidden");
              adminMobile.classList.replace("nothiddenmobilemenu", "hidden");
            }

            fetch(`http://localhost:8080/mostCommonOrder/${response.id}`, {
              method: "GET",
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }).then((response) =>
              response.json().then((response) => {
                let name1 = response.name;
                if (document.getElementById("preferenceList") != null) {
                  preferenceList.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="preferenceitem">
                                  
                                  <div style="text-align: center"><h2>Order It Again!</h2></div>
                                  <img src="img/${response.img}.jpg" />
                                  <p>${
                                    response.name.charAt(0).toUpperCase() +
                                    response.name.slice(1)
                                  } 
                                  - \$${response.price} 
                                  or ${response.price * 10} points</p>

                                  <!--the following p tags send info to the addToOrder script-->
                                  <p style="display: none">${response.id}</p>
                                  <p style="display: none">${response.price}</p>
                                  <p style="display: none">${response.name}</p>
                                  <p style="display: none">${response.img}</p>
                                  <button class="addToOrder">Order</button>
                              </div>`
                  );
                }
                fetch(`http://localhost:8080/recommendedOrders/${userID}`, {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                  },
                }).then((response) =>
                  response.json().then((response) => {
                    let recommend;

                    if (response[0].name == name1 && response.length > 1) {
                      recommend = response[1];
                    } else {
                      recommend = response[0];
                    }
                    
                    preferenceList.insertAdjacentHTML(
                      "beforeend",
                      `<div class="preferenceitem">
                                  
                                  <h2>Suggested for You!</h2>
                                  <img src="img/${recommend.img}.jpg" />
                                  <p>${
                                    recommend.name.charAt(0).toUpperCase() +
                                    recommend.name.slice(1)
                                  } 
                                  - \$${recommend.price} 
                                  or ${recommend.price * 10} points</p>

                                  <!--the following p tags send info to the addToOrder script-->
                                  <p style="display: none">${recommend.id}</p>
                                  <p style="display: none">${
                                    recommend.price
                                  }</p>
                                  <p style="display: none">${recommend.name}</p>
                                  <p style="display: none">${recommend.img}</p>
                                  <button class="addToOrder">Order</button>
                              </div>`
                    );

                    if (localStorage.getItem("hasCodeRunBefore") === null) {
                      localStorage.setItem("hasCodeRunBefore", true);
                      window.location.reload();
                    }
                  })
                );
              })
            );
          });
      }
    });
}
