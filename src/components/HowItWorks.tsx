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
    fontSize: 30,
    fontFamily: 'default',
    color: '#C7FDFF',
    fontWeight: 'medium',
};

function ProductHowItWorks() {
    return (
        <Box component="section" sx={{ display: 'flex', bgcolor: '#00B1B8', overflow: 'hidden' }}>
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
                <Typography variant="h4" component="h2" sx={{ mb: 14, color: 'white' }}>
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Typography variant="h5" align="center" sx={{ color: 'white' }}>
                                    Add your favorite route by clicking on the map to add points. A route will
                                    automatically be generated between the points.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Typography variant="h5" align="center" sx={{ color: 'white' }}>
                                    View all your saved routes.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Typography variant="h5" align="center" sx={{ color: 'white' }}>
                                    You can see all the routes which intersect on of your route to get
                                    inspired to try out new routes.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;
