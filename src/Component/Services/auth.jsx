 const TOKEN_KEY = "JWT_token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const retrieveToken = () => {
    return localStorage.getItem(key);
};

export const storeToken = token => {
    localStorage.setItem(key, token);
};

export const removeToken = () => {
    localStorage.removeItem(key);
};