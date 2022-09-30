console.log('Hola mundo')

const onSubmit = ({ target }) => {
    event.preventDefault();
    const { email, password } = target;

    console.log(email.value, password.value);
}