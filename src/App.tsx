import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ProtectedHome from './pages/ProtectedHome';
import { request_url } from './constants/config';
import { AuthContextProvider, AuthContext, useAuth } from './hooks/AuthContext';

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

    // useEffect(() => {
    //     axios
    //         .get(user_request) // getting data from backend
    //         .then((response) => {
    //             setUser(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <AuthContextProvider>
            <ProtectedHome />
        </AuthContextProvider>
    );
}
export default App;
