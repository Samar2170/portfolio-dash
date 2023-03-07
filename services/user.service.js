import { BehaviorSubject } from 'rxjs';
import { Router } from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));


export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
};

function login(username, password) {
    console.log(baseUrl, 'Login');
    return fetchWrapper.post(`${baseUrl}login`, { username, password })
        .then(user => {
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user['token']));
            userSubject.next(user);
            return user;

        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

