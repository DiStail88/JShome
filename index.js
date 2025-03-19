import { renderComments } from "./modules/renderComments.js";
import { replaceDangerSymbol } from "./modules/replaceSymbol.js";
import { updateComments } from "./modules/comments.js";

const fetchComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/slava-leb/comments", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateComments(data.comments);
            renderComments();
        })
        .catch((error) =>
            console.error("Ошибка при загрузке комментариев:", error),
        );
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
        .catch((error) => {
            console.error("Ошибка при добавлении комментария:", error);
        });

    inputElName.value = "";
    inputElComment.value = "";
});
