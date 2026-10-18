import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import HomeComponent from './components/HomeComponent'
import CarComponent from './components/CarComponent';
import MenuComponent from './components/MenuComponent';
import NewCarComponent from './components/NewCarComponent';
import UpdateCarComponent from './components/UpdateCarComponent';
import DeleteComponent from './components/DeleteComponent';

export default class Router extends Component {

    render() {

        function SearchCarByIdElement() {
            let { idCoche } = useParams();
            return <CarComponent idCoche={idCoche} />
        }

        function UpdateCarElement() {
            let { idCoche } = useParams();
            return <UpdateCarComponent idCoche={idCoche} />
        }

        function DeleteCarElement() {
            let { idCoche } = useParams();
            return <DeleteComponent idCoche={idCoche} />
        }

        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/coches/FindCoche/:idCoche' element={<SearchCarByIdElement />} />
                    <Route path='/nuevo-coche' element={<NewCarComponent />} />
                    <Route path='/coches/updateCoche/:idCoche' element={<UpdateCarElement />} />
                    <Route path='/eliminar/:idCoche' element={<DeleteCarElement />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
