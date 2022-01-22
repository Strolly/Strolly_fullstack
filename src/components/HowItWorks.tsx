import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from './Button';

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
};

const image = {
    height: 55,
    my: 4,
};

function ProductHowItWorks() {
    return (
        <Box component="section" sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}>
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography variant="h4" component="h2" sx={{ mb: 14 }}>
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                {/* <Box
                                    component="img"
                                    src="/static/themes/onepirate/productHowItWorks1.svg"
                                    alt="suitcase"
                                    sx={image}
                                /> */}
                                <Typography variant="h5" align="center">
                                    Add your favorite route. You can share you route with other users if you
                                    want to.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                {/* <Box
                                    component="img"
                                    src="/static/themes/onepirate/productHowItWorks2.svg"
                                    alt="graph"
                                    sx={image}
                                /> */}
                                <Typography variant="h5" align="center">
                                    Take a look at others favorite routes and get inspired.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                {/* <Box
                                    component="img"
                                    src="/static/themes/onepirate/productHowItWorks3.svg"
                                    alt="clock"
                                    sx={image}
                                /> */}
                                <Typography variant="h5" align="center">
                                    Ask others to join you on a stroll.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    component="a"
                    href="/premium-themes/onepirate/sign-up/"
                    sx={{ mt: 8 }}
                >
                    Get started
                </Button>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;
