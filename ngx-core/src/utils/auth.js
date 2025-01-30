// utils/auth.js
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const expiry = payload.exp; // Get the expiration time
        return Date.now() >= expiry * 1000; // Check if the token is expired
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If there's an error, assume the token is expired
    }
};

export const getTokenExpiryTime = (token) => {
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        return payload.exp * 1000; // Return expiration time in milliseconds
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};