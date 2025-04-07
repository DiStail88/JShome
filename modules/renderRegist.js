export const renderRegist = ({ onRegisterSuccess }) => {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>Страница регистрации</h1>
        <div class="form">
            <h3 class="form-title">Форма регистрации</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин">
                <input type="text" id="name-input" class="input" placeholder="Имя">
                <input type="password" id="password-input" class="input" placeholder="Пароль">
            </div>
            <button class="button" id="register-button">Зарегистрироваться</button>
            <p>Уже есть аккаунт? <span id="go-to-login" style="color: blue; cursor: pointer;">Войти</span></p>
        </div>
    `;

    document.getElementById("register-button").addEventListener("click", () => {
        const login = document.getElementById("login-input").value;
        const name = document.getElementById("name-input").value;
        const password = document.getElementById("password-input").value;

        fetch("https://wedev-api.sky.pro/api/user", {
            method: "POST",
            body: JSON.stringify({ login, name, password }),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error(
                        "Пользователь с таким логином уже существует",
                    );
                }
                return response.json();
            })
            .then((data) => {
                onRegisterSuccess({
                    token: data.user.token,
                    name: data.user.name,
                });
                document.getElementById("app").innerHTML = "";
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    document.getElementById("go-to-login").addEventListener("click", () => {
        import("./renderLogin.js").then((module) => {
            module.renderLogin({ onLoginSuccess: onRegisterSuccess });
        });
    });
};
