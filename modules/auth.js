let token = null;
let userName = "";

export function setToken(newToken) {
    token = newToken;
}

export function getToken() {
    return token;
}

export function isAuthorized() {
    return token !== null;
}

export function setUserName(name) {
    userName = name;
}

export function getUserName() {
    return userName;
}
