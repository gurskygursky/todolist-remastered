import React, {useEffect} from 'react';
import './App.css'
import {CircularProgress, Container} from "@material-ui/core";
import {TodolistList} from "../features/todolists/TodolistList";
import {Header} from '../components/header/Header';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../features/login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../state/app-reducer";
import {AppRootStateType} from "../state/store";

export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                </Container>
            </div>
        </div>
    );
}