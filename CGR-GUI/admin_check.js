checkAdmin();

function checkAdmin() {
    fetch("http://localhost:8080/loggedInUser", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json())
        .then(response => {
            if (response == false)
            {
                window.location.href = "index.html";
            }
            else 
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
                    .then(response => {
                        if (response.admin == false)
                        {
                            window.location.href = "index.html";
                        }
                    })
            }
        })
}