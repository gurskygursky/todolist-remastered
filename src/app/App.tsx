import React from 'react';
import './App.css'
import {Container} from "@material-ui/core";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Header} from '../components/header/Header';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login/Login";

export function App() {
    console.log("App is called");

    return (
        <div className="app">
            <Header/>
            <div className={"content"}>
                <Container fixed>
                    <BrowserRouter>
                        <Routes>
                            <Route path={"/"} element={<TodolistList/>}/>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                            <Route path="*" element={<Navigate to={"/404"}/>}/>
                        </Routes>
                    </BrowserRouter>
                    {/*<TodolistList/>*/}
                </Container>
            </div>
        </div>
    );
}