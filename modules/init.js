import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";

export const initLikeCommet = () => {
    const commentsLikes = document.querySelectorAll(".like-button");

    for (const commentLike of commentsLikes) {
        commentLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const indexLike = commentLike.dataset.index;
            const comment = comments[indexLike];

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
            const indexReply = Array.from(commentsReplys).indexOf(commentReply);
            const comment = comments[indexReply];

            inputElName.value = comment.name;
            inputElComment.value = `"${comment.commentText}"`;

            renderComments();
        });
    }
};
