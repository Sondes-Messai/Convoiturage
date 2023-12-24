import jwt_decode from "jwt-decode";

const TOKEN_NAME = "token";

/**
 * To save the JWT token using for the back end requests
 * Save in the local storage
 *
 * @param {string} token: to save
 * @author Peter Mollet
 */
export function setToken(token) {
	localStorage.setItem(TOKEN_NAME, token);
}

/**
 * To get the JWT token back-kend saved in the localstorage
 *
 * @return {string} token
 * @author Peter Mollet
 */
export function getToken() {
	return localStorage.getItem(TOKEN_NAME);
}

/**
 * Delete the token from the localstorage
 *
 * @author Peter Mollet
 */
export function removeToken() {
	localStorage.removeItem(TOKEN_NAME);
}

/**
 * Get the payload of the JWT Token (with experition date, login and roles)
 *
 * @return {object} payload of the token
 * @author Peter Mollet
 */
export function getPayloadToken(token) {
	return jwt_decode(token);
}

export function getEmail() {
	const token = getToken();
	const payload = getPayloadToken(token);
	return payload.sub;
}

export function getRole() {
	const token = getToken();
	const payload = getPayloadToken(token);
	return payload.role;
}

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 *
 * @return {boolean} true if user is authenticated
 * @author Peter Mollet
 */
export function isTokenValid(token) {
	try {
		const payload = getPayloadToken(token);
		const roles = payload.role;
		const expirationDate = payload.exp;
		const login = payload.sub;
		const dateNow = new Date();
		return (
			token != "" &&
			roles != "" &&
			login != "" &&
			expirationDate * 1000 > dateNow.getTime()
		);
	} catch {
		return false;
	}
}
