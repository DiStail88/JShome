import { comments } from "./comments.js";
import { initLikeCommet, initReplyCommet } from "./init.js";

export const renderComments = () => {
    const listEl = document.getElementById("list");
    if (!listEl) {
        console.error("Элемент с ID 'list' не найден!");
        return;
    }

    if (!comments || !Array.isArray(comments)) {
        console.error("Комментарии не загружены или не являются массивом!");
        return;
    }

    const commentHtml = comments
        .map((comment) => {
            return `
    <li class="comment" data-id="${comment.id}">
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${new Date(comment.date).toLocaleString()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-id="${comment.id}"></button>
        </div>
      </div>
    </li>`;
        })
        .join("");

    listEl.innerHTML = commentHtml;

    initLikeCommet();
    initReplyCommet();
};
