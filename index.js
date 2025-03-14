import { renderComments } from "./modules/renderComments.js";
import { replaceDangerSymbol } from "./modules/replaceSymbol.js";
import { comments } from "./modules/comments.js";

renderComments();

const buttonEl = document.getElementById("button");

buttonEl.addEventListener("click", () => {
    const inputElName = document.getElementById("name");
    const inputElComment = document.getElementById("comment");

    const name = replaceDangerSymbol(inputElName.value);
    const comment = replaceDangerSymbol(inputElComment.value);

    const currentDateTime = new Date();
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const year = String(currentDateTime.getFullYear()).slice(-2);
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

    if (inputElName.value === "" && inputElComment.value === "") {
        inputElName.classList.add("error");
        inputElComment.classList.add("error");
        return;
    }

    const NewComment = {
        name: name,
        dateTime: formattedDateTime,
        commentText: comment,
        likes: 0,
        liked: false,
    };
    comments.push(NewComment);

    renderComments();

    inputElName.value = "";
    inputElComment.value = "";
});
