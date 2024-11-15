// script.js
const loginForm = document.getElementById('login-form');
const createAccountButton = document.getElementById('create-account');
const responseP = document.getElementById('response');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.login-container').classList.add('agenda'); // Adiciona a classe de animação ao container
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            username,
            password
        });

        if (response.data.token) {
            responseP.innerText = 'Login bem-sucedido!';
            responseP.style.color = 'green';
            localStorage.setItem('token', response.data.token); // Armazena o token no local storage

            // Adiciona a classe de animação ao botão
            const loginButton = e.target.querySelector('button[type="submit"]');
            loginButton.classList.add('agenda');

            // Redireciona após a animação
            setTimeout(() => {
                window.location.href = 'home.html'; // Redireciona para a página inicial
            }, 1000); // Tempo da animação em milissegundos
        } else {
            responseP.innerText = 'Erro ao autenticar. Verifique suas credenciais.';
            responseP.style.color = 'red';
        }
    } catch (error) {
        responseP.innerText = 'Erro ao autenticar. Verifique suas credenciais.';
        responseP.style.color = 'red';
        console.error(error);
    }
});

createAccountButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        responseP.innerText = 'Por favor, preencha o usuário e a senha.';
        responseP.style.color = 'red';
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            username,
            password
        });
        responseP.innerText = response.data.message || 'Conta criada com sucesso!';
        responseP.style.color = 'green';
    } catch (error) {
        responseP.innerText = 'Erro ao criar conta. Verifique suas informações.';
        responseP.style.color = 'red';
        console.error(error);
    }
});
