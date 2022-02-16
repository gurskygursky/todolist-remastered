import React from 'react';
import './App.css'
import {Container} from "@material-ui/core";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Header} from '../components/header/Header';

export function App() {
    console.log("App is called");

    return (
        <div className="app">
            <Header/>
            <div className={"content"}>
                <Container fixed>
                    <TodolistList/>
                </Container>
            </div>
        </div>
    );
}