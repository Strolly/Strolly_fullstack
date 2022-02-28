import React, { useContext } from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import MenuButton from './MenuButton';
import { BrowserRouter, Router, Route, useNavigate } from 'react-router-dom';
import FacebookAuth from '../components/FacebookAuth';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    height: 64,
    [theme.breakpoints.up('sm')]: {
        height: 70,
    },
}));

function AppBar(props: AppBarProps) {
    const navigate = useNavigate();
    return (
        <div>
            <MuiAppBar elevation={0} position="fixed" {...props}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                        <MenuButton />
                    </Box>

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
                        <FacebookAuth />
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
