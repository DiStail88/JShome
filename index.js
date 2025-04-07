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

    const MAX_RETRIES = 3; // Максимальное количество попыток
    let retryCount = 0;

    function sendComment() {
        fetch("https://wedev-api.sky.pro/api/v1/slava-leb/comments", {
            method: "POST",
            body: JSON.stringify({
                text: comment,
                name: name,
            }),
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    if (response.status === 400) {
                        throw new Error(
                            "Вы допустили ошибку, минимум 3 символа!",
                        );
                    }

                    if (response.status === 500) {
                        if (retryCount < MAX_RETRIES) {
                            retryCount++;
                            console.log(
                                `Повторная попытка ${retryCount}/${MAX_RETRIES}...`,
                            );
                            return sendComment();
                        } else {
                            throw new Error(
                                "Сервер не отвечает, поробуйте позже",
                            );
                        }
                    }

                    throw new Error("Что-то пошло не так");
                }
            })
            .then((responseData) => {
                console.log("Успешно отправлено:", responseData);
                fetchComments();
                inputElName.value = "";
                inputElComment.value = "";
            })
            .catch((error) => {
                if (error.message === "Failed to fetch") {
                    alert("Что-то пошло не так");
                    inputElName.value = "";
                    inputElComment.value = "";
                } else {
                    alert(error.message);
                }
            })
            .finally(() => {
                buttonEl.disabled = false;
                buttonEl.textContent = "Написать";
            });
    }

    sendComment();
});
