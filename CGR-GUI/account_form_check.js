checkAccount();

function checkAccount() {
    fetch("http://localhost:8080/loggedInUser", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json())
      .then(response => {
        if (response == true) {
            window.location.href = "index.html";
        }
      })
}