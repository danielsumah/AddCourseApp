// Input values
const signup_form = document.getElementById('signup_form');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submit = document.getElementById('submit');

// Event Listeners
signup_form.addEventListener('submit', signup);

// Get User details
function getRegistrationDetails() {
    // const user = {};
    const first_nameValue = signup_form.first_name.value.trim();
    const last_nameValue = signup_form.last_name.value.trim();
    const phoneValue = signup_form.phone.value.trim();
    const emailValue = signup_form.email.value.trim();
    const passwordValue = signup_form.password.value.trim();
    const password2Value = signup_form.password2.value.trim();

    // Check values for validation
    if (first_nameValue === '') {
        setError(first_name, 'First name cannot be blank');
        return;
    } else { removeError(first_name) }

    if (last_nameValue === '') {
        setError(last_name, 'Last name cannot be blank');
        return;
    } else { removeError(last_name) }

    if (phoneValue === '') {
        setError(phone, 'Phone number cannot be blank');
        return;
    } else { removeError(phone) }

    if (emailValue === '') {
        setError(email, 'Email cannot be blank');
        return;
    } else if ((!isEmail(emailValue))) {
        setError(email, 'Email is not valid');
        return;
    } else { removeError(email) }

    if (passwordValue === '') {
        setError(password, 'Password cannot be blank');
        return;
    } else { removeError(password) }

    if (password2Value === '') {
        setError(password2, 'Second password cannot be blank');
        return;
    } else if (password2Value !== passwordValue) {
        setError(password2, 'Passwords dont match');
        return;
    } else { removeError(password2) }



    return  {
        first_nameValue,
        last_nameValue,
        phoneValue,
        emailValue,
        passwordValue
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

// Send user details to server
function sendUserDetailsToServer(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Signup Function
function signup(e) {
    e.preventDefault();
    const users = [];
    const user = getRegistrationDetails();
    users.push(user)
    console.log(users);
    sendUserDetailsToServer(users)
}

