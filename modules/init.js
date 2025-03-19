import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";
import { delay } from "./delay.js";

export const initLikeCommet = () => {
    const commentsLikes = document.querySelectorAll(".like-button");

    for (const commentLike of commentsLikes) {
        commentLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = parseInt(commentLike.dataset.id);
            const comment = comments.find((c) => c.id === id);

            if (!comment) {
                console.error("Комментарий не найден!");
                return;
            }

            commentLike.disabled = true;
            commentLike.classList.add("-loading-like");

            delay(2000)
                .then(() => {
                    comment.likes = comment.liked
                        ? comment.likes - 1
                        : comment.likes + 1;
                    comment.liked = !comment.liked;

                    commentLike.classList.toggle("-active-like", comment.liked);
                    commentLike.previousElementSibling.textContent =
                        comment.likes;
                })
                .catch((error) => {
                    console.error("Ошибка при обработке лайка:", error);
                })
                .finally(() => {
                    commentLike.disabled = false;
                    commentLike.classList.remove("-loading-like");
                });
        });
    }
};

export const initReplyCommet = () => {
    const commentsReplys = document.querySelectorAll(".comment");
    const inputElName = document.getElementById("name");
    const inputElComment = document.getElementById("comment");

    for (const commentReply of commentsReplys) {
        commentReply.addEventListener("click", () => {
            const id = parseInt(commentReply.dataset.id);
            const comment = comments.find((c) => c.id === id);

            if (!comment) {
                console.error("Комментарий не найден!");
                return;
            }

            inputElName.value = comment.author.name;
            inputElComment.value = `"${comment.text}"`;

            renderComments();
        });
    }
};
