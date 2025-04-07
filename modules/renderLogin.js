export const renderLogin = ({ onLoginSuccess }) => {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>Страница входа</h1>
        <div class="form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин">
                <input type="password" id="password-input" class="input" placeholder="Пароль">
            </div>
            <button class="button" id="login-button">Войти</button>
            <p>Нет аккаунта? <span id="go-to-register" style="color: blue; cursor: pointer;">Зарегистрироваться</span></p>
        </div>
    `;

    document.getElementById("login-button").addEventListener("click", () => {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        fetch("https://wedev-api.sky.pro/api/user/login", {
            method: "POST",
            body: JSON.stringify({ login, password }),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error("Неверный логин или пароль");
                }
                return response.json();
            })
            .then((data) => {
                onLoginSuccess({
                    token: data.user.token,
                    name: data.user.name,
                });
                document.getElementById("app").innerHTML = "";
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    document.getElementById("go-to-register").addEventListener("click", () => {
        import("./renderRegist.js").then((module) => {
            module.renderRegist({ onRegisterSuccess: onLoginSuccess });
        });
    });
};
