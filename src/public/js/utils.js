post = async (body, endpoint) => {
    let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    let data = await response.json();
    return data;
}

put = async (body, endpoint, id) => {
    let response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    let data = await response.json();
    return data;
}

del = async (endpoint, id) => {
    let response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
    });

    let data = await response.json();
    return data;
}

get = async endpoint => {
    let response = await fetch(endpoint);
    let data = await response.json();
    return data;
}

// Validate name
const validateName = (name, container, input) => {
    let nameRegex = /^[a-zA-ZÑñÁáÄäÉéÍíÓóÚúÜü\s]+$/;
    if (nameRegex.test(name)) {
        container.classList.remove('has-danger');
        input.classList.remove('is-invalid');
        container.classList.add('has-success');
        input.classList.add('is-valid');

        return true;
    } else {
        container.classList.add('has-danger');
        input.classList.add('is-invalid');

        return false;
    }
}

// Validate email
const validateMail = (email, container, input) => {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
        container.classList.remove('has-danger');
        input.classList.remove('is-invalid');
        container.classList.add('has-success');
        input.classList.add('is-valid');

        return true;
    } else {
        container.classList.add('has-danger');
        input.classList.add('is-invalid');

        return false;
    }
}

// Validate password
const validatePassword = (password, container, input) => {
    if (password.length >= 3 && password.length <= 12) {
        let mayuscula = false;
        let minuscula = false;
        let numero = false;

        for (let i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                mayuscula = true;
            }
            else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                minuscula = true;
            }
            else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                numero = true;
            }
        }
        if (mayuscula == true && minuscula == true && numero == true) {
            container.classList.remove('has-danger');
            input.classList.remove('is-invalid');
            container.classList.add('has-success');
            input.classList.add('is-valid');

            return true;
        }
    } else {
        container.classList.add('has-danger');
        input.classList.add('is-invalid');

        return false;
    }
}

//Validate passwords match
const passwordMatch = (pass1, pass2, container, input) => {
    if (pass1 != pass2 || pass1.length == 0) {
        container.classList.add('has-danger');
        input.classList.add('is-invalid');

        return false;
    } else {
        container.classList.remove('has-danger');
        input.classList.remove('is-invalid');
        container.classList.add('has-success');
        input.classList.add('is-valid');

        return true;
    }
}