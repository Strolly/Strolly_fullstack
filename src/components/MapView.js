import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import {
    Button,
    IconButton,
    Grid,
    Box,
    Popover,
    Typography,
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Alert,
} from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import colors from '../constants/colors';
import { request_url } from '../constants/config';

mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlsc21oIiwiYSI6ImNreXExZDdkMjBmY2Uyb28zdWVycHF3MGkifQ.3NulJNKdg77Kj-o0FllTOA';

const path_geom_request = request_url.url.API_URL_PATH_GEOM; //localhost:8000/path_geom
const intersect_request = request_url.url.API_URL_INTERSECT; //localhost:8000/intersect

export default function MapView() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.390630736614895);
    const [lat, setLat] = useState(63.43230311853981);
    const [zoom, setZoom] = useState(12);
    const [finalPath, setFinalPath] = useState([]);
    const [path, setPath] = useState(turf.featureCollection([]));
    const [ownRoutes, setOwnRoutes] = useState(turf.featureCollection([]));
    const [createdRoute, setCreatedRoute] = useState(turf.featureCollection([]));
    const [openPopover, setOpenPopover] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [routeName, setRouteName] = useState('');
    const [routeType, setRouteType] = useState('walking');
    const [ownRouteNames, setOwnRouteNames] = useState([]);
    const [intersectRoute, setIntersectRoute] = useState(turf.featureCollection([]));
    const [intersectRouteName, setIntersectRouteName] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const attachMap = () => {
            if (!mapContainer.current) {
                return;
            }
            const mapInit = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [lng, lat],
                zoom: zoom,
            });
            setMap(mapInit);
        };
        const fillMap = () => {
            if (!mapContainer.current) {
                return;
            }
            map.on('load', async () => {
                map.loadImage(
                    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                    (error, image) => {
                        if (error) throw error;
                        map.addImage('home-marker', image);
                        // Add a GeoJSON source with 2 points
                        map.addSource('point-home', {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        // feature for Mapbox DC
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates: [lng, lat],
                                        },
                                        properties: {
                                            title: 'Home',
                                        },
                                    },
                                ],
                            },
                        });

                        // Add a symbol layer
                        map.addLayer({
                            id: 'point-home',
                            type: 'symbol',
                            source: 'point-home',
                            layout: {
                                'icon-image': 'home-marker',
                                'icon-size': 0.7,
                                // get the title name from the source's "title" property
                                'text-field': ['get', 'title'],
                                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                'text-offset': [0, 1.25],
                                'text-anchor': 'top',
                            },
                        });
                    },
                );
                map.addLayer({
                    id: 'point-symbol',
                    type: 'circle',
                    source: {
                        data: path,
                        type: 'geojson',
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#3887be',
                    },
                });
                map.addSource('route_created', {
                    type: 'geojson',
                    data: createdRoute,
                });

                map.addLayer({
                    id: 'route_created',
                    type: 'line',
                    source: 'route_created',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                    },
                });
                map.addSource('route_own', {
                    type: 'geojson',
                    data: [],
                });

                map.addLayer({
                    id: 'route_own',
                    type: 'line',
                    source: 'route_own',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': ['get', 'color'],
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                    },
                });
                map.addSource('route_intersect', {
                    type: 'geojson',
                    data: [],
                });

                map.addLayer({
                    id: 'route_intersect',
                    type: 'line',
                    source: 'route_intersect',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': ['get', 'color'],
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                    },
                });

                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                });
                map.on('mouseenter', 'route_own', (e) => {
                    const coordinates = e.lngLat.wrap();
                    const name = e.features[0].properties.name;
                    const length = e.features[0].properties.length;
                    const type = e.features[0].properties.type;
                    const popupContent =
                        'Name: ' +
                        name +
                        '<br />' +
                        'Type: ' +
                        type +
                        '<br />' +
                        'Length: ' +
                        (Math.round(length * 100) / 100).toFixed(2) +
                        ' km';
                    popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
                });

                map.on('mouseleave', 'route_own', () => {
                    popup.remove();
                });
                map.on('mouseenter', 'route_intersect', (e) => {
                    const coordinates = e.lngLat.wrap();
                    const name = e.features[0].properties.name;
                    const length = e.features[0].properties.length;
                    const type = e.features[0].properties.type;
                    const popupContent =
                        'Name: ' +
                        name +
                        '<br />' +
                        'Type: ' +
                        type +
                        '<br />' +
                        'Length: ' +
                        (Math.round(length * 100) / 100).toFixed(2) +
                        ' km';
                    popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
                });

                map.on('mouseleave', 'route_intersect', () => {
                    popup.remove();
                });

                await map.on('click', addPoints);
            });
        };

        !map && attachMap(mapContainer);
        map && fillMap(mapContainer);
    }, [map]);

    useEffect(() => {
        fetchOwnRoute();
    }, []);

    useEffect(() => {
        if ((ownRoutes.features.length > 0) & !!ownRoutes.features[0]) {
            if (!!map.getSource('route_own')) {
                map.getSource('route_own').setData(ownRoutes);
            }
        }
    }, [ownRoutes]);

    const fetchOwnRoute = async () => {
        await axios
            .get(path_geom_request)
            .then(function (response) {
                let owned_path = response.data.features.filter(
                    (path) => path.properties.userid === sessionStorage.getItem('id'),
                );
                setOwnRoutes((prevState) => ({
                    ...prevState,
                    features: [...owned_path],
                }));
            })
            .catch((error) => {
                console.log(error);
            });
        clearPath();
    };

    const fetchIntersectRoutes = async (route_name) => {
        clearPath();
        await axios
            .get(intersect_request, {
                params: { route: route_name },
            })
            .then(function (response) {
                for (let i = 0; i <= response.data.length - 1; i++) {
                    console.log(response.data[i][2].features[0]);
                    intersectRoute.features.push(response.data[i][2].features[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        displayIntersectRoutes();
    };

    const displayIntersectRoutes = () => {
        if (intersectRoute.features.length > 1) {
            map.getSource('route_intersect').setData(intersectRoute);
            let center = turf.center(intersectRoute.features[0].geometry);
            map.flyTo({ center: [center.geometry.coordinates[0], center.geometry.coordinates[1]], zoom: 13 });
        } else {
            setAlert(true);
        }
    };

    const getRouteNames = () => {
        let names = [];
        if (ownRoutes.features.length > 0) {
            for (let i = 0; i < ownRoutes.features.length; i++) {
                names.push(ownRoutes.features[i].properties.name);
            }
            setOwnRouteNames(names);
        }
    };

    // const testRouteName = () => {
    //     console.log(ownRouteNames);
    // };

    const addPoints = async (event) => {
        const coordinates = map.unproject(event.point);
        const newPoint = turf.point([coordinates.lng, coordinates.lat]);
        path.features.push(newPoint);
        map.getSource('point-symbol').setData(path);
        if (path.features.length > 2) {
            generateRoute();
        }
    };

    const generateRoute = async () => {
        const query = await fetch(queryURL(), { method: 'GET' });
        const response = await query.json();

        if (response.code !== 'Ok') {
            const handleMessage =
                response.code === 'InvalidInput'
                    ? 'Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors'
                    : 'Try a different point.';
            alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
            path.features.pop();
            return;
        }

        const routeGeoJSON = turf.featureCollection([turf.feature(response.trips[0].geometry)]);
        setFinalPath(routeGeoJSON);
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        map.getSource('route_created').setData(routeGeoJSON);
    };

    const queryURL = () => {
        let coordinates = [];

        for (let i = 0; i <= path.features.length - 1; i++) {
            coordinates.push(path.features[i].geometry.coordinates);
        }

        return `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinates.join(
            ';',
        )}?&overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken}`;
    };

    const savePath = () => {
        const length = turf.length(finalPath, 'kilometers');
        const coordinates = finalPath.features[0].geometry;
        axios.post(path_geom_request, {
            userid: sessionStorage.getItem('id'),
            geom: coordinates,
            length: length,
            type: routeType,
            name: routeName,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
        handleCloseDialog();
    };

    const clearPath = () => {
        map.getSource('route_created').setData(turf.featureCollection([]));
        map.getSource('route_own').setData(turf.featureCollection([]));
        map.getSource('route_intersect').setData(turf.featureCollection([]));
        map.getSource('point-symbol').setData(turf.featureCollection([]));
        while (path.features.length) {
            path.features.pop();
        }
        while (createdRoute.features.length) {
            createdRoute.features.pop();
        }
        while (intersectRoute.features.length) {
            intersectRoute.features.pop();
        }
    };

    const handleClickPopover = (event) => {
        getRouteNames();
        setAnchorEl(event.currentTarget);
        setOpenPopover(!openPopover);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSetRouteName = (event) => {
        setRouteName(event.target.value);
    };

    const handleSetRouteType = (event) => {
        setRouteType(event.target.value);
    };

    const handleSetIntersectRouteName = (event) => {
        fetchIntersectRoutes(event.target.value);
    };

    return (
        <Box width={1} style={{ paddingTop: '30px', marginBottom: '60px' }}>
            <div
                id="comparison-container"
                style={{
                    position: 'relative',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                onClick={() => setAlert(false)}
            >
                <Box
                    ref={mapContainer}
                    className="map-container"
                    style={{
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        width: '90%',
                        height: '80vh',
                        border: 3,
                        borderRadius: 8,
                        borderColor: 'primary.main',
                    }}
                >
                    <Grid
                        style={{
                            position: 'absolute',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'space-between',
                            paddingRight: 2,
                            paddingTop: 10,
                        }}
                    >
                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                width: '50%',
                            }}
                        >
                            <IconButton
                                aria-label="open"
                                aria-describedby={'simple-popover'}
                                style={{
                                    zIndex: 1,
                                }}
                                onClick={handleClickPopover}
                            >
                                <MenuIcon />
                                <Popover
                                    id={'simple-popover'}
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            '&:hover': {
                                                background: '#E0E0E0',
                                                cursor: 'pointer',
                                            },
                                        }}
                                        onClick={fetchOwnRoute}
                                    >
                                        <Typography sx={{ p: 2 }}>Get your saved routes</Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid
                                        sx={{
                                            '&:hover': {
                                                background: '#E0E0E0',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>
                                            Get routes which intersects with your route
                                        </Typography>
                                        <FormControl sx={{ width: '30%', ml: 2, mr: 2, mb: 2 }}>
                                            <InputLabel>Route</InputLabel>
                                            <Select
                                                autoFocus
                                                value={intersectRouteName}
                                                onChange={handleSetIntersectRouteName}
                                                label="route"
                                                sx={{ height: '40px' }}
                                            >
                                                {ownRouteNames?.map((name) => (
                                                    <MenuItem value={name}>{name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Popover>
                            </IconButton>
                        </Grid>
                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                width: '50%',
                            }}
                        >
                            <IconButton
                                aria-label="save"
                                style={{
                                    color: 'green',
                                    zIndex: 1,
                                }}
                                onClick={handleClickOpenDialog}
                            >
                                <SaveIcon />
                            </IconButton>
                            <IconButton
                                aria-label="save"
                                style={{
                                    color: 'red',
                                    zIndex: 1,
                                }}
                                onClick={() => clearPath()}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Create route</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the name and type of your route.
                                    </DialogContentText>
                                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Name"
                                            type="name"
                                            variant="standard"
                                            onChange={handleSetRouteName}
                                        />
                                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                            <InputLabel htmlFor="type">Type</InputLabel>
                                            <Select
                                                autoFocus
                                                value={routeType}
                                                onChange={handleSetRouteType}
                                                label="type"
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'type',
                                                }}
                                            >
                                                <MenuItem value="walking ">walking</MenuItem>
                                                <MenuItem value="running">running</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                    <Button onClick={savePath}>Create</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div
                styles={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {alert ? (
                    <Alert severity="info">There are no routes which intersect with your route!</Alert>
                ) : (
                    <></>
                )}
            </div>
        </Box>
    );
} //hei
