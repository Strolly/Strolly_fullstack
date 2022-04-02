import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import HowItWorks from '../components/HowItWorks';
import AppBar from '../components/AppBar';
import MapView from '../components/MapView';
import withRoot from '../modules/withRoot';
import { useAuth } from '../hooks/AuthContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AuthToken } from '../hooks/AuthContext';

mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlsc21oIiwiYSI6ImNreXExZDdkMjBmY2Uyb28zdWVycHF3MGkifQ.3NulJNKdg77Kj-o0FllTOA';

function ProtectedHome() {
    const { token, setToken } = useAuth();
    const [isAuth, setIsAuth] = useState<AuthToken | null | string>('');
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.421906);
    const [lat, setLat] = useState(63.446827);
    const [zoom, setZoom] = useState(12);

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

    useEffect(() => {
        const attachMap = (
            //setMap: React.Dispatch<React.SetStateAction<any>>,
            setMap: (value: any | null) => void,
            mapContainer: React.RefObject<HTMLDivElement>,
        ) => {
            if (!mapContainer.current) {
                return;
            }
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [lng, lat],
                zoom: zoom,
            });
            setMap(map);
        };

        !map && attachMap(setMap, mapContainer);
    }, [map]);

    return (
        <React.Fragment>
            <AppBar />
            {!isAuth ? (
                <Box width={1} sx={{ bgcolor: 'secondary.light', pt: '30px' }}>
                    <div
                        id="comparison-container"
                        style={{
                            position: 'relative',
                            height: '80vh',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
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
                        />
                    </div>
                </Box>
            ) : (
                <Box sx={{ bgcolor: 'secondary.light' }}>
                    <MapView />
                    <HowItWorks />
                </Box>
            )}
        </React.Fragment>
    );
}
export default withRoot(ProtectedHome);
