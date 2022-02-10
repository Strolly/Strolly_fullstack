import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';

interface Comment {
    id?: string;
    name: string;
    description: string;
}

function App() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        axios // Localhost: http://localhost:8000/api/view/
            .get('https://gib-2-project.herokuapp.com/api/view/') // sending data to backend
            .then((response) => {
                setComments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addComment = () => {
        if (newComment) {
            axios //Localhost: http://localhost:8000/api/create/
                .post('https://gib-2-project.herokuapp.com/api/create/', {
                    name: newComment, //sending data to backend
                    description: 'This is a test from evenius  ' + comments.length,
                }) // sending data to backend
                .then((response) => {
                    console.log(response.data); // view the response
                    console.log('nils tester');
                })
                .catch((error) => {
                    console.log(error); // check if any error
                });
        }
    };
    return (
        <div className="App">
            <Home />
        </div>
    );
}

export default App;
