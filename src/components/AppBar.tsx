import * as React from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { request_url } from '../constants/config';

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

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    height: 64,
    [theme.breakpoints.up('sm')]: {
        height: 70,
    },
}));

const responseFacebook = (response: FacebookResponse) => {
    console.log('app_id:', request_url.url.SOCIAL_AUTH_FACEBOOK_KEY);
    console.log('convert token url: request_url.url.API_CONVERT_TOKEN');
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
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
        });
};

const componentClicked = () => {
    console.log('hei');
};
function AppBar(props: AppBarProps) {
    return (
        <div>
            <MuiAppBar elevation={0} position="fixed" {...props}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/premium-themes/onepirate/"
                        sx={{ fontSize: 24 }}
                    >
                        {'Strolly'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <FacebookLogin
                            appId={request_url.url.SOCIAL_AUTH_FACEBOOK_KEY}
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                        />
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
