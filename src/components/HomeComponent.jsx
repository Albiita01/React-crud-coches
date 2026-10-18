import React, { Component } from 'react'
import CarService from '../services/CarService'
import { Navigate, NavLink } from 'react-router-dom';

export default class HomeComponent extends Component {

    service = new CarService();

    state = {
        coches: [],
        coche: null
    }

    // #1 · Borra al darle al botón de borrar de la tabla
    /*
    deleteCar = async (idCoche) => {
        try {
            await this.service.deleteCarById(idCoche);
            this.loadAllCars();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    */

    /* #2 · Para mostrar los datos en la misma página, debajo de la tabla
    loadCarById = async (idCoche) => {
        let datos = await this.service.getCarById(idCoche);
        this.setState({
            coche: datos
        })
        console.log(datos);
    }
    */

    loadAllCars = async () => {
        let datos = await this.service.getAllCars();
        this.setState({
            coches: datos
        })
        console.log(datos);
    }

    componentDidMount = async () => {
        await this.loadAllCars();
    }

    render() {
        return (
            <div>
                <h1>Coches</h1>
                <table class="w-full border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
                    <thead>
                        <tr>
                            <th>ID Coche</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Conductor</th>
                            <th>Imagen</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coches.map((c, index) => {
                                return (<tr key={index}>
                                    <td>{c.idCoche}</td>
                                    <td>{c.marca}</td>
                                    <td>{c.modelo}</td>
                                    <td>{c.conductor}</td>
                                    <td><img src={c.imagen} width="50px" /></td>
                                    <td><NavLink to={"/coches/FindCoche/" + c.idCoche} className='rounded-full bg-sky-300 px-4 py-2 text-white font-semibold hover:bg-sky-400'>Ver</NavLink></td>
                                    <td><NavLink to={"/coches/updateCoche/" + c.idCoche} className='rounded-full bg-orange-300 px-4 py-2 text-white font-semibold hover:bg-orange-400'>Editar</NavLink></td>
                                    {/** #1 · Para borrar desde la tabla directamente
                                     * <td><button onClick={() => this.deleteCar(c.idCoche)} className='rounded-full bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600'>Eliminar</button></td>
                                     */}
                                    {/** Con este NavLink te lleva al DeleteComponent donde hará una confirmación y se puede visualizar los datos del coche que vamos a borrar */}
                                    <td><NavLink to={"/eliminar/" + c.idCoche} className='rounded-full bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600'>Eliminar</NavLink></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                {/** #2 · Para mostrar los datos debajo de la tabla
                {
                    this.state.coche && (
                        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid black" }}>
                            <h2>Detalles del Coche a Editar</h2>
                            <p><strong>ID:</strong> {this.state.coche.idCoche}</p>
                            <p><strong>Marca:</strong> {this.state.coche.marca}</p>
                            <p><strong>Modelo:</strong> {this.state.coche.modelo}</p>
                            <p><strong>Conductor:</strong> {this.state.coche.conductor}</p>
                            <img src={this.state.coche.imagen} width="100px" alt="Coche" />
                        </div>
                    )
                }
                */}
            </div>
        )
    }
}
