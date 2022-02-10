import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { request_url } from './constants/config';

interface User {
    id?: string;
    name: string;
    age: Int16Array;
}

function App() {
    const [user, setUser] = useState<Comment[]>([]);
    const [path, setPath] = useState<string>('');

    const user_request = request_url.url.API_URL_USER; //localhost:8000/api/user/
    const path_geom_request = request_url.url.API_URL_PATH_GEOM; //localhost:8000/api/path_geom

    useEffect(() => {
        axios
            .get(user_request) // getting data from backend
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
            <Home />
        </div>
    );
}

export default App;
