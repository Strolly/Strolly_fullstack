import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlsc21oIiwiYSI6ImNreXExZDdkMjBmY2Uyb28zdWVycHF3MGkifQ.3NulJNKdg77Kj-o0FllTOA';

const backgroundImage =
    'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

export default function MapView() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.421906);
    const [lat, setLat] = useState(63.446827);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        const attachMap = (
            setMap: React.Dispatch<React.SetStateAction<any>>,
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
        <Box width={1} sx={{ mt: 3 }}>
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
                ></Box>
            </div>
        </Box>
    );
}
