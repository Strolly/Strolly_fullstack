import React, { useContext, useState, useEffect } from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import MenuButton from './MenuButton';
import { BrowserRouter, Router, Route, useNavigate } from 'react-router-dom';
import FacebookAuth from '../components/FacebookAuth';
import { AuthToken, useAuth } from '../hooks/AuthContext';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    height: 64,
    [theme.breakpoints.up('sm')]: {
        height: 70,
    },
}));

function AppBar(props: AppBarProps) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState<AuthToken | null | string>('');
    const { token, setToken } = useAuth();

    const checkStorage = (token: AuthToken | null) => {
        if (token == null) {
            const token = sessionStorage.getItem('access_token');
            setIsAuth(token);
        } else {
            setIsAuth(token);
        }
    };

    useEffect(() => {
        checkStorage(token);
    });
    return (
        <div>
            <MuiAppBar elevation={0} position="fixed" {...props}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}></Box>

                    <Link
                        //onClick={() => navigate('/')}
                        href="/"
                        variant="h6"
                        underline="none"
                        color="inherit"
                        sx={{ fontSize: 24 }}
                    >
                        {'Strolly'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <div>
                            {isAuth == null ? <FacebookAuth /> : <MenuButton />}
                            {/*Dosent work because isAuth is not a boolean value*/}
                        </div>
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
