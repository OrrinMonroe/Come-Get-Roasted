const logOutButton = document.getElementById("logoutbtn");
const userLoginFormOut = document.getElementById("loginSpan");
const preferenceList = document.getElementById("preferenceList");
const logoutMobile = document.querySelector('.logoutMobile');

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

  const loginMobile = document.querySelector('.loginMobile');
  loginMobile.classList.replace("hidden", "nothiddenmobilemenu");
  loginMobile.classList.add("bottomBorder");

  logoutMobile.classList.replace("nothiddenmobilemenu", "hidden");
  logoutMobile.classList.remove("bottomBorder");

  const accountMobile = document.querySelector('.accountMobile');
  accountMobile.classList.replace("nothiddenmobilemenu", "hidden");
  accountMobile.classList.remove("bottomBorder");

  const adminMobile = document.querySelector('.adminMobile');
  adminMobile.classList.replace("nothiddenmobilemenu", "hidden");
  adminMobile.classList.remove("bottomBorder");

  //clears the cart when you log out
  localStorage.clear();

  //puts you back at the home page
  setTimeout(() => {
    window.location.href = "index.html";
  }, "1000");
  
});

logoutMobile.addEventListener("click", (event) => {
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

  const loginMobile = document.querySelector('.loginMobile');
  loginMobile.classList.replace("hidden", "nothiddenmobilemenu");
  loginMobile.classList.add("bottomBorder");

  logoutMobile.classList.replace("nothiddenmobilemenu", "hidden");
  logoutMobile.classList.remove("bottomBorder");

  const accountMobile = document.querySelector('.accountMobile');
  accountMobile.classList.replace("nothiddenmobilemenu", "hidden");
  accountMobile.classList.remove("bottomBorder");

  const adminMobile = document.querySelector('.adminMobile');
  adminMobile.classList.replace("nothiddenmobilemenu", "hidden");
  adminMobile.classList.remove("bottomBorder");

  //clears the cart when you log out
  localStorage.clear();

  //puts you back at the home page
  setTimeout(() => {
    window.location.href = "index.html";
  }, "1000");
  
});
