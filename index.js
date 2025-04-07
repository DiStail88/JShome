import { renderComments } from "./modules/renderComments.js";
import { replaceDangerSymbol } from "./modules/replaceSymbol.js";
import { updateComments } from "./modules/comments.js";
import { renderLogin } from "./modules/renderLogin.js";
import {
    getToken,
    setToken,
    isAuthorized,
    setUserName,
} from "./modules/auth.js";

const loadingEl = document.getElementById("loading");
let isFirstLoad = true;

const personalKey = "slava-leb";
const API_URL = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;

export const fetchComments = () => {
    if (isFirstLoad) loadingEl.style.display = "block";

    const headers = isAuthorized()
        ? { Authorization: `Bearer ${getToken()}` }
        : {};

    fetch(API_URL, { headers })
        .then((response) => {
            if (!response.ok) throw new Error("Ошибка загрузки");
            return response.json();
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        })
        .catch((error) => {
            console.error("Ошибка при загрузке комментариев:", error);
        })
        .finally(() => {
            if (isFirstLoad) {
                loadingEl.style.display = "none";
                isFirstLoad = false;
            }
        });
};

fetchComments();

const buttonEl = document.getElementById("button");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

if (!isAuthorized()) {
    document.querySelector(".add-form").style.display = "none";
    renderLogin({
        onLoginSuccess: ({ token, name }) => {
            setToken(token);
            setUserName(name);
            document.querySelector(".add-form").style.display = "block";
            fetchComments();
        },
    });
}

buttonEl.addEventListener("click", () => {
    const name = replaceDangerSymbol(nameInput.value.trim());
    const comment = replaceDangerSymbol(commentInput.value.trim());

    if (name === "" || comment === "") {
        nameInput.classList.add("error");
        commentInput.classList.add("error");
        return;
    }

    buttonEl.disabled = true;
    buttonEl.textContent = "Добавляем...";

    fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ text: comment, name }),
    })
        .then((response) => {
            if (response.status === 201) return response.json();
            if (response.status === 400) throw new Error("Минимум 3 символа!");
            throw new Error("Ошибка отправки комментария");
        })
        .then(() => {
            fetchComments();
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            buttonEl.disabled = false;
            buttonEl.textContent = "Написать";
        });
});
