import { comments } from "./comments.js";
import { initLikeCommet, initReplyCommet } from "./init.js";

export const renderComments = () => {
    const listEl = document.getElementById("list");
    const commentHtml = comments
        .map((comment, index) => {
            return `
        <li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.dateTime}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.commentText}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.liked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
        })
        .join("");

    listEl.innerHTML = commentHtml;

    initLikeCommet();

    initReplyCommet();
};
