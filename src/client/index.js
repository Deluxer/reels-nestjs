var url = 'http://localhost:3001/';

const onSubmitRegister = async(event) => {
    event.preventDefault();
    
    const resp = await onFetch(`${ url }users`, event);
    
    if(!resp) {
        Swal.fire('¡Error al registrar usuario!', '', 'error');
        return;
    }
    const tabLogin = document.querySelector('#tab-login');
    tabLogin.click();
    
    Swal.fire('¡Usuario registrado!', '', 'success');
}

const onSubmitLogin = async(event) => {
    event.preventDefault();

    const resp = await onFetch(`${ url }users/login`, event);
    
    if(!resp) {
        Swal.fire('¡Error al iniciar sesion!', '', 'error');
        return;
    }

    localStorage.setItem('token', resp.token);
    window.location.href = `${ url }reels.html`;

}

const onFetch = async(_url, { target }) => {
    
    const token = localStorage.getItem('token');

    let user = {}
    for (let [key, value] of Object.entries(target)) {
        if (value.name.length > 0)
        user[value.name] = value.value;
        value.value = ''
    }

    try {
        const userResp = await fetch(_url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!userResp.ok) {  
            throw new Error('¡Error al registrar usuario!')
        }

        const resp = userResp.json();

        return resp;

    } catch (error) {
        return false;
    }
}
