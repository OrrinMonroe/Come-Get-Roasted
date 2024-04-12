const logOutButton = document.getElementById("logoutbtn");
const userLoginFormOut = document.getElementById("loginSpan");
const preferenceList = document.getElementById("preferenceList");

logOutButton.addEventListener("click", (event) => {
  event.preventDefault();

  fetch("http://localhost:8080/logout", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => console.log(response));

  const login = document.getElementById("login");
  const logout = document.getElementById("logout");
  login.style.display = null;
  logout.style.display = "none";

  //clears the cart when you log out
  localStorage.clear();

  //puts you back at the home page
  window.location.href = "index.html";
});
