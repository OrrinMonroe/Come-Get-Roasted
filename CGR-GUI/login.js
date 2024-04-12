const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

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

                if (response == "Login failed.") {
                    window.alert("Login failed! Please try again.");
                    window.location.reload();
                } else {
                    let script = document.createElement('script');
                    script.src = "logged_in_check.js";
                    document.body.append(script);
                }
            })
            .catch(err => console.log(err));
});


