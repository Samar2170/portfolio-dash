
export {decodeToken};

function decodeToken(tokenString) {
    return JSON.parse(atob(tokenString.split(".")[1]));

}