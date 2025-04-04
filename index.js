import { renderComments } from "./modules/renderComments.js";
import { replaceDangerSymbol } from "./modules/replaceSymbol.js";
import { updateComments } from "./modules/comments.js";

const loadingEl = document.getElementById("loading");
let isFirstLoad = true;

const fetchComments = () => {
    if (isFirstLoad) {
        loadingEl.style.display = "block";
    }

    fetch("https://wedev-api.sky.pro/api/v1/slava-leb/comments", {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                return response.text().then((errorText) => {
                    throw new Error(
                        `Ошибка сети: ${response.status} - ${errorText}`,
                    );
                });
            }
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

buttonEl.addEventListener("click", () => {
    const inputElName = document.getElementById("name");
    const inputElComment = document.getElementById("comment");
    const name = replaceDangerSymbol(inputElName.value.trim());
    const comment = replaceDangerSymbol(inputElComment.value.trim());

    if (name === "" || comment === "") {
        inputElName.classList.add("error");
        inputElComment.classList.add("error");
        return;
    }

    buttonEl.disabled = true;
    buttonEl.textContent = "Добавляем комментарий ...";

    fetch("https://wedev-api.sky.pro/api/v1/slava-leb/comments", {
        method: "POST",
        body: JSON.stringify({
            text: comment,
            name: name,
        }),
    })
        .then(async (response) => {
            const text = await response.text();
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status} - ${text}`);
            }
            return JSON.parse(text);
        })
        .then(() => fetchComments())
        .then(() => {
            buttonEl.disabled = false;
            buttonEl.textContent = "Написать";
        })
        .catch((error) => {
            console.error("Ошибка при добавлении комментария:", error);
        });

    inputElName.value = "";
    inputElComment.value = "";
});
