const formEl = document.getElementById('createAccountForm');
const createUsername = document.getElementById('newUsername');
const createPassword = document.getElementById('newPassword');
const cpassword = document.getElementById('cpassword');
const birthdate = document.getElementById('birthdate');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    let valid = validateInputs();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    if (valid === 0) {
        return;
    }

    fetch('http://localhost:8080/customer', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            console.log(data);

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
                        // window.location.reload();
                    } else {
                        let script = document.createElement('script');
                        script.src = "logged_in_on_page_load_check.js";
                        document.body.append(script);
                    }
                })
            .catch(err => console.log(err));
            window.location.href = "account_creation_confirmed.html";
        });
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
}

let validateInputs = () => {
    const usernameValue = createUsername.value.trim();
    const passwordValue = createPassword.value.trim();
    const cpasswordValue = cpassword.value.trim();
    const birthdateValue = (birthdate.value);

    let userBool = true;
    let passBool = true;
    let cpassBool = true;
    let birthdateBool = true;

    if(usernameValue === '') {
        setError(createUsername, 'Username is required!');
        userBool = false;
    } else {
        setSuccess(createUsername);
    }

    if (passwordValue === '') {
        setError(createPassword, 'Password is required!');
        passBool = false;
    } else {
        setSuccess(createPassword);
    }

    if (cpasswordValue === '') {
        setError(cpassword, 'Please confirm your password.');
        cpassBool = false;
    } else if (cpasswordValue !== passwordValue) {
        setError(cpassword, 'Passwords must match.');
        cpassBool = false;
    } else {
        setSuccess(cpassword);
    }

    if (birthdateValue > '2011-01-01') {
        setError(birthdate, 'You must be at least 13 years old to make an account.');
        birthdateBool = false;
    } else {
        setSuccess(birthdate);
    }

    if ( (userBool === true) && (passBool === true) && (cpassBool === true) && (birthdateBool === true) ) {
        return 1;
    } else {
        return 0;
    }
};