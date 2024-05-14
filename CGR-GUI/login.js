const loginForm = document.getElementById('loginForm');
const loginFormPage = document.getElementById('loginFormPage');

const username = document.getElementById('username');
const usernamePage = document.getElementById('usernamePage');

const password = document.getElementById('password');
const passwordPage = document.getElementById('passwordPage');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    
    fetch('http://localhost:8080/customerlogin', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
        }).then(response => response.text())
            .then((response) => {
                console.log(response);

                for (const key in localStorage)
                {
                    if (key != "hasCodeRunBefore")
                    {
                        localStorage.removeItem(key);
                    }
                }

                if (response == "Login failed.") {
                    var modal = document.getElementById("loginFailModal");

                    // Get the button that opens the modal
                    var btn = document.getElementById("loginButton");

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    // When the user clicks the button, open the modal 
                    btn.onclick = function() {
                        modal.style.display = "block";
                    }

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else {
                    window.location.href="index.html";
                }
            })
            .catch(err => console.log(err));
});

loginFormPage.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(loginFormPage);
    const data = Object.fromEntries(formData);
    
    fetch('http://localhost:8080/customerlogin', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
        }).then(response => response.text())
            .then((response) => {
                console.log(response);

                for (const key in localStorage)
                {
                    if (key != "hasCodeRunBefore")
                    {
                        localStorage.removeItem(key);
                    }
                }

                if (response == "Login failed.") {
                    var modal = document.getElementById("loginFailModal");

                    // Get the button that opens the modal
                    var btn = document.getElementById("loginButton");

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    // When the user clicks the button, open the modal 
                    btn.onclick = function() {
                        modal.style.display = "block";
                    }

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else {
                    window.location.href="index.html";
                }
            })
            .catch(err => console.log(err));
});


