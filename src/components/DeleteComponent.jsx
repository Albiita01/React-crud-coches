import React, { Component } from 'react'
import CarService from '../services/CarService'
import { Navigate, NavLink } from 'react-router-dom';

export default class DeleteComponent extends Component {

    service = new CarService();

    state = {
        coche: null,
        status: false
    }

    deleteCar = async (idCoche) => {
        try {
            await this.service.deleteCarById(idCoche);
            this.setState({
                status: true
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Para buscar el coche nada más cargue la página
    componentDidMount = async () => {
        let id = this.props.idCoche;
        let coche = await this.service.getCarById(id);
        this.setState({
            coche: coche
        })
    }

    render() {
        if (this.state.status === true) {
            return <Navigate to="/" />;
        } else {
            return (
                <div>

                    {
                        // Mostramos los datos del coche solo cuando ya se hayan descargado (evita el error de null)
                        this.state.coche ? (
                            <div className='bg-stone-100 p-6 rounded-lg shadow-md max-w-md'>

                                <h1>Eliminar coche {this.state.coche.idCoche}</h1>
                                <br />
                                <p className='mb-2'><strong>ID:</strong> {this.state.coche.idCoche}</p>
                                <p className='mb-2'><strong>Marca:</strong> {this.state.coche.marca}</p>
                                <p className='mb-2'><strong>Modelo:</strong> {this.state.coche.modelo}</p>
                                <p className='mb-2'><strong>Conductor:</strong> {this.state.coche.conductor}</p>
                                <div className='mb-4'>
                                    <strong>Imagen:</strong> <br />
                                    <img src={this.state.coche.imagen} width="150px" alt="Coche" className='mt-2 rounded' />
                                </div>

                                <div className='flex gap-4'>
                                    {/* Botón para confirmar la eliminación pasándole el idCoche */}
                                    <button
                                        onClick={() => this.deleteCar(this.state.coche.idCoche)}
                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm transition duration-200'>
                                        Eliminar definitivamente
                                    </button>

                                    {/* Botón / Enlace para cancelar y volver al home */}
                                    <NavLink
                                        to="/"
                                        className='px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-sm transition duration-200 text-center'>
                                        Cancelar
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                            <p>Cargando datos del coche...</p>
                        )
                    }
                </div>
            )
        }
    }
}
