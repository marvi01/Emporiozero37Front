import jwtDecode from 'jwt-decode';
import {
    storeToken,
    retrieveToken,
    removeToken,
} from './auth';

const urlBase = "https://anorosa.com.br/Emporio037/api/"
export const authLogin = (email, password) => async dispatch => {
    try {
        const url = urlBase+"login";
        const body = JSON.stringify({ email, password });

        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body,
        });

        if (response.status !== 200) {
            return console.log("Falha ao fazer login ");
        }

        if (response.status === 200) {
            const value = await response.json();
            const token = value.token;

            storeToken(token);
        }
    } catch (error) {
        return "Erro no Servidor "
    }
};