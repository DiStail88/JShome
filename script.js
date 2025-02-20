const inputElName = document.getElementById("name");
const inputElComment = document.getElementById("comment");
const buttonEl = document.getElementById("button");
const listEl = document.getElementById("list");

const comments = [
    {
        name: "Глеб Фокин",
        dateTime: "12.02.22 12:18",
        commentText: "Это будет первый комментарий на этой странице",
        likes: 3,
        liked: false,
    },
    {
        name: "Варвара Н.",
        dateTime: "13.02.22 19:22",
        commentText: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
        liked: false,
    },
];

const initLikeCommet = () => {
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

const initReplyCommet = () => {
    const commentsReplys = document.querySelectorAll(".comment");

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

const renderComments = () => {
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

renderComments();

function replaceDangerSymbol(input) {
    return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

buttonEl.addEventListener("click", () => {
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
