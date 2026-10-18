import React, { Component } from 'react'
import CarService from '../services/CarService'
import { Navigate } from 'react-router-dom';

export default class NewCarComponent extends Component {

    service = new CarService();

    cajaID = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        status: false
    }

    insertCar = async (event) => {
        event.preventDefault();
        let coche = {
            idCoche: parseInt(this.cajaID.current.value),
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        }

        console.log(coche);
        try {
            await this.service.insertCar(coche);
            this.setState({
                status: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to="/" />)
        } else {
            return (
                <div>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>Nuevo coche</h1>
                    <br />
                    <form onSubmit={this.insertCar}>
                        <label>ID: </label>
                        <input type='number' ref={this.cajaID} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                        <br /><br />
                        <label>Marca: </label>
                        <input type='text' ref={this.cajaMarca} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                        <br /><br />
                        <label>Modelo: </label>
                        <input type='text' ref={this.cajaModelo} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                        <br /><br />
                        <label>Conductor: </label>
                        <input type='text' ref={this.cajaConductor} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                        <br /><br />
                        <label>Imagen: </label>
                        <input type='text' ref={this.cajaImagen} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                        <br /><br />
                        <button className='px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-sm transition duration-200'>Confirmar</button>
                    </form>
                </div>
            )
        }
    }
}
