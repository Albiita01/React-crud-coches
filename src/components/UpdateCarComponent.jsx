import React, { Component } from 'react'
import CarService from '../services/CarService'
import { Navigate } from 'react-router-dom';

export default class UpdateCarComponent extends Component {

    service = new CarService();

    cajaID = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        status: false,
        coche: null,
        status: false
    }

    updateCar = async (event) => {
        event.preventDefault();

        let coche = {
            idCoche: parseInt(this.cajaID.current.value),
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        }

        try {
            console.log("Llega " + coche)
            await this.service.updateCar(coche);
            this.setState({
                status: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    // En el  componentDidMount() no llamo al updateCar() porque no quiero que se envíe el formulario nada más cargar la página
    componentDidMount = async () => {
        let id = this.props.idCoche;
        let cocheNuevo = await this.service.getCarById(id);
        this.setState({
            coche: cocheNuevo
        })
    }

    render() {
        if (this.state.status === true) {
            return <Navigate to="/" />;
        } else {
            return (
                <div>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>Actualizar coche</h1>
                    <br />
                    {
                        // Esto es para que no de error de idCoche null al cargar. Mientras carga, sale "Cargando datos del coche... y luego sale el formulario"
                        this.state.coche ? (
                            <form onSubmit={this.updateCar}>
                                <label>ID: </label>
                                <input type='number' disabled defaultValue={this.state.coche.idCoche} ref={this.cajaID} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                                <br /><br />
                                <label>Marca: </label>
                                <input type='text' defaultValue={this.state.coche.marca} ref={this.cajaMarca} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                                <br /><br />
                                <label>Modelo: </label>
                                <input type='text' defaultValue={this.state.coche.modelo} ref={this.cajaModelo} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                                <br /><br />
                                <label>Conductor: </label>
                                <input type='text' defaultValue={this.state.coche.conductor} ref={this.cajaConductor} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                                <br /><br />
                                <label>Imagen: </label>
                                <input type='text' defaultValue={this.state.coche.imagen} ref={this.cajaImagen} className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 bg-white transition duration-200'></input>
                                <br /><br />
                                <button className='px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-sm transition duration-200'>Actualizar datos</button>
                            </form>
                        ) : (
                            <p>Cargando datos del coche...</p>
                        )
                    }
                </div>
            )
        }
    }
}
