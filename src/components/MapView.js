import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import * as turf from '@turf/turf';
import { Button, IconButton, Grid, Box } from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlsc21oIiwiYSI6ImNreXExZDdkMjBmY2Uyb28zdWVycHF3MGkifQ.3NulJNKdg77Kj-o0FllTOA';

export default function MapView() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.421906);
    const [lat, setLat] = useState(63.446827);
    const [zoom, setZoom] = useState(12);
    const [finalPath, setFinalPath] = useState([]);
    const path = turf.featureCollection([]);
    const nothing = turf.featureCollection([]);

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
                map.addSource('route', {
                    type: 'geojson',
                    data: nothing,
                });

                map.addLayer(
                    {
                        id: 'routeline-active',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                        },
                    },
                    'waterway-label',
                );

                await map.on('click', addPoints);
            });
        };

        !map && attachMap(mapContainer);
        map && fillMap(mapContainer);
    }, [map]);

    const addPoints = async (event) => {
        const coordinates = map.unproject(event.point);
        const newPoint = turf.point([coordinates.lng, coordinates.lat]);
        path.features.push(newPoint);
        map.getSource('dropoffs-symbol').setData(path);
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
            // Remove invalid point
            path.features.pop();
            return;
        }

        const routeGeoJSON = turf.featureCollection([turf.feature(response.trips[0].geometry)]);
        setFinalPath(routeGeoJSON);
        console.log(routeGeoJSON);
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        map.getSource('route').setData(routeGeoJSON);
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

    return (
        <Box width={1} sx={{ mt: 3 }} style={{ marginTop: '0px' }}>
            <div
                id="comparison-container"
                style={{
                    position: 'relative',
                    height: '80vh',
                }}
            >
                <Box
                    ref={mapContainer}
                    className="map-container"
                    style={{
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        width: '100%',
                        height: '80vh',
                    }}
                >
                    <Grid style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                        <IconButton
                            aria-label="save"
                            style={{
                                color: 'green',
                                zIndex: 1,
                                margin: 1,
                            }}
                        >
                            <SaveIcon />
                        </IconButton>
                        <IconButton
                            aria-label="save"
                            style={{
                                color: 'red',
                                zIndex: 1,
                                margin: 1,
                            }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                </Box>
            </div>
        </Box>
    );
}
