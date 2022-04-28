import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ProtectedHome from './pages/ProtectedHome';
import { request_url } from './constants/config';
import { AuthContextProvider, AuthContext, useAuth } from './hooks/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/Profile';

interface User {
    id?: string;
    name: string;
    age: Int16Array;
}

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<ProtectedHome />} />
                        <Route path="profile">
                            <Route index element={<ProfilePage />} />
                            <Route path=":userId" element={<ProfilePage />} />{' '}
                            {/* userId is param passed from Profile page*/}
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
export default App;
