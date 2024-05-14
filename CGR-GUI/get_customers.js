function loadCustomers() {
  let table = document.getElementById("customers");

  fetch("http://localhost:8080/customersnotdeleted", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        let row = table.insertRow(i + 1);
        row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        row.insertCell(3);
        row.insertCell(4);
        row.insertCell(5);
        row.insertCell(6);
        table.rows[i + 1].cells[0].innerHTML = response[i].id;
        table.rows[i + 1].cells[1].innerHTML = response[i].username;
        table.rows[i + 1].cells[2].innerHTML = response[i].firstname;
        table.rows[i + 1].cells[3].innerHTML = response[i].lastname;
        table.rows[i + 1].cells[4].innerHTML = response[i].points;
        table.rows[i + 1].cells[5].innerHTML = response[i].admin;
        table.rows[i + 1].cells[6].innerHTML =
          '<a href="#" onclick="deleteCustomer(' +
          response[i].id +
          ')">' +
          "<Button style='background-color: darkred; padding: 5px 10px; margin: 5px 0;'>Delete</Button> </a>";
      }
    })
    .catch((error) => {
      console.log("Error loading history: ", error);
    });
}

function deleteCustomer(id) {
  let delConfirm = confirm("Are you sure you want to delete this customer?");
  if (delConfirm) {
    fetch("http://localhost:8080/customer/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        window.location.href = "/CGR-GUI/admin.html";
      })
      .catch((error) => {
        console.log("Error deleting customer ", error);
      });
  }
}
