// Input values
const login_form = document.getElementById('login_form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

// Event Listeners
login_form.addEventListener('submit', login);

// S T E P S
// Target Input fields
// Collect input field values
// Insert them into user object
// Send them to server

// Functions

// Get Authentication details
function getAuthDetails() {
    const usernameValue = login_form.username.value;
    const passwordValue = login_form.password.value;

    if (usernameValue === '') {
        setError(username, 'Username cannot be blank')
    } else { removeError(username) }

    if (passwordValue === '') {
        setError(password, 'Username cannot be blank')
    } else { removeError(password) }

    if (usernameValue !== '' && !isEmail(usernameValue)) {
        setError(username, 'Email is not valid');
    } else { removeError(username) }

    return {
        username: usernameValue,
        password: passwordValue
    }
}

// Set Error Message
function setError(input, message) {
    input.parentElement.classList.add('error');
    input.nextElementSibling.innerHTML = message;
}

// Remove error
function removeError(input) {
    input.parentElement.classList.remove('error');
    input.nextElementSibling.innerHTML = '';
}

// Validate email
function isEmail(email) {
    return (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    )

}

// Login function
function login(e) {
    e.preventDefault();
    getAuthDetails();
    console.log();
}
