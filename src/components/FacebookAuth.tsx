import React from 'react';
import { request_url } from '../constants/config';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import FacebookLogin from 'react-facebook-login';

interface FacebookResponse {
    accessToken: string;
    data_access_expiration_time: number;
    email: string;
    expiresIn: number;
    graphDomain: string;
    id: string;
    name: string;
    picture: any;
    signedRequest: string;
    userID: string;
}
function FacebookAuth() {
    const { token, setToken } = useAuth();

    const responseFacebook = (response: FacebookResponse) => {
        console.log('app_id:', request_url.url.SOCIAL_AUTH_FACEBOOK_KEY);
        console.log('convert token url:', request_url.url.API_CONVERT_TOKEN);
        console.log(response);
        axios
            .post(request_url.url.API_CONVERT_TOKEN, {
                token: response.accessToken,
                backend: 'facebook',
                grant_type: 'convert_token',
                client_id: request_url.url.CLIENT_ID,
                client_secret: request_url.url.CLIENT_SECRET,
            })
            .then((res) => {
                console.log(res);
                sessionStorage.setItem('access_token', res.data.access_token);
                sessionStorage.setItem('refresh_token', res.data.refresh_token);
                setToken(res.data.access_token);
            });
    };
    return (
        <FacebookLogin
            appId={request_url.url.SOCIAL_AUTH_FACEBOOK_KEY}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
        />
    );
}

export default FacebookAuth;
