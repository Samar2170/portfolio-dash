import { userService } from '../services/user.service';
import axios  from 'axios';
export const fetchWrapper = {
    get,
    post,
    postForm,
    downloadFile
};

function downloadFile(url,  encoding) {
    return axios({
        url: url,
        method: 'GET',
        responseType: encoding, // important
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userService.userValue}`
        },
    })
}

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);

}

function postForm(url , formData) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(url) },
        body: formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function authHeader(url) {
    const user = userService.userValue;
    let isLoggedIn = false;
    if (user) {
        isLoggedIn = true;
    }    
    const isApiUrl = url.startsWith(process.env.NEXT_PUBLIC_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user}` };
    }
    return {};
} 


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401,403].includes(response.status) && userService.userValue) {
                alert('Session expired. Please login again');
                location.reload(true);
            }
            else if (response.status === 400) {

                const error = (data && data.message) || response.statusText;
                alert(error);
                return Promise.reject(error);
            }

            const error = (data && data.message) || response.statusText;
            alert(error);
            return Promise.reject(error);
        }

        return data;
    });
}