import * as React from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    height: 64,
    [theme.breakpoints.up('sm')]: {
        height: 70,
    },
}));

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
                        {'Stroll'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            href="/premium-themes/onepirate/sign-in/"
                            sx={rightLink}
                        >
                            {'Sign In'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="/premium-themes/onepirate/sign-up/"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {'Sign Up'}
                        </Link>
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
