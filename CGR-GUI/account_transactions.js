function loadTransactions() {
  let table = document.getElementById("transactions");

  fetch("http://localhost:8080/transaction", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let total = 0;
      getDrinks().then((drinks) => {
        for (let i = 0; i < response.length; i++) {
          let row = table.insertRow(i + 1);
          row.insertCell(0);
          row.insertCell(1);
          row.insertCell(2);

          total += drinks[response[i].drinkId - 1].price;

          table.rows[i + 1].cells[0].innerHTML = response[i].transactionId;
          table.rows[i + 1].cells[1].innerHTML =
            drinks[response[i].drinkId - 1].name;
          table.rows[i + 1].cells[2].innerHTML =
            "$" + drinks[response[i].drinkId - 1].price + ".00";
        }
        document.getElementById("totalSpent").innerHTML += total;
      });
    })
    .catch((error) => {
      console.log("Error loading history: ", error);
    });
}

function loadPopular() {
  let table = document.getElementById("popular");

  fetch("http://localhost:8080/popularTransactions", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      getDrinks().then((drinks) => {
        let keys = Object.keys(response).sort((a, b) => a - b);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
          let row = table.insertRow(i + 1);
          row.insertCell(0);
          row.insertCell(1);
          // row.insertCell(2);
          // table.rows[i + 1].cells[0].innerHTML = i + 1;
          table.rows[i + 1].cells[0].innerHTML = drinks[keys[i] - 1].name;
          table.rows[i + 1].cells[1].innerHTML = response[keys[i]];
        }
      });
    })
    .catch((error) => {
      console.log("Error loading history: ", error);
    });
}

function exportAsCsv() {
  fetch("http://localhost:8080/transaction", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      getDrinks().then((drinks) => {
        let csvContent = "Id,Drink,Price\n";
        for (let i = 0; i < response.length; i++) {
          const id = response[i].transactionId;
          const drink = drinks[response[i].drinkId - 1].name;
          const price = "$" + drinks[response[i].drinkId - 1].price + ".00";
          csvContent += id + "," + drink + "," + price + "\n";
        }

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "export.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    })
    .catch((error) => {
      console.log("Error loading history: ", error);
    });
}

function loadUserTransactions() {
  let table = document.getElementById("transactions");

  getUser().then((user) => {
    console.log(user);
    fetch("http://localhost:8080/transactions/" + user.id, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getDrinks().then((drinks) => {
          for (let i = 0; i < response.length; i++) {
            let row = table.insertRow(i + 1);
            row.insertCell(0);
            row.insertCell(1);

            table.rows[i + 1].cells[0].innerHTML =
              drinks[response[i].drinkId - 1].name;
            table.rows[i + 1].cells[1].innerHTML =
              "$" + drinks[response[i].drinkId - 1].price + ".00";
          }
        });
      })
      .catch((error) => {
        console.log("Error loading history: ", error);
      });
  });
}

function getDrinks() {
  return fetch("http://localhost:8080/coffees", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching drinks: ", error);
    });
}

function getUser() {
  return fetch("http://localhost:8080/loggedincustomer", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching user: ", error);
    });
}

function showTransactions() {
  let transactionTable = document.getElementById("transactions");
  let popularityTable = document.getElementById("popular");

  transactionTable.style.display = null;
  popularityTable.style.display = "none";
}

function showPopularity() {
  let transactionTable = document.getElementById("transactions");
  let popularityTable = document.getElementById("popular");

  transactionTable.style.display = "none";
  popularityTable.style.display = null;
}
