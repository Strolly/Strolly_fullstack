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

    const responseFacebook = (faceResponse: FacebookResponse) => {
        axios
            .post(request_url.url.API_CONVERT_TOKEN, {
                token: faceResponse.accessToken,
                backend: 'facebook',
                grant_type: 'convert_token',
                client_id: request_url.url.CLIENT_ID,
                client_secret: request_url.url.CLIENT_SECRET,
            })
            .then((res) => {
                // Success
                sessionStorage.setItem('access_token', res.data.access_token);
                sessionStorage.setItem('refresh_token', res.data.refresh_token);
                sessionStorage.setItem('id', faceResponse.id);
                setToken(res.data.access_token);

                // Checking if user exists
                axios
                    .get(request_url.url.API_URL_USER + '?id=' + faceResponse.id)
                    .then((userResponse) => {
                        // New User
                        if (userResponse.data.length == 0) {
                            axios
                                .post(request_url.url.API_URL_USER, {
                                    id: faceResponse.id,
                                    email: faceResponse.email,
                                    name: faceResponse.name,
                                    adresse: '',
                                    age: '',
                                    picture: faceResponse.picture.data.url,
                                })
                                .then((res) => {
                                    console.log('Successfully created a user for', faceResponse.name, '!');
                                })
                                .catch((error) => {
                                    console.log('Failed to create a user for', faceResponse.name, '...');
                                });
                            // Existing User
                        } else {
                            console.log('User', userResponse.data[0].name, 'already has an existing user');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
