import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";

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

            if (comment.liked) {
                comment.likes -= 1;
            } else {
                comment.likes += 1;
            }
            comment.liked = !comment.liked;

            renderComments();
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
