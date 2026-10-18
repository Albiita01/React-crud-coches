import React, { Component } from 'react'
import CarService from '../services/CarService'

export default class CarComponent extends Component {

    service = new CarService();

    state = {
        coche: null
    }

    loadCarById = async (idCoche) => {
        let datos = await this.service.getCarById(this.props.idCoche);
        this.setState({
            coche: datos
        })
        console.log(datos);
    }

    componentDidMount = async () => {
        await this.loadCarById(this.props.idCoche);
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.idCoche !== this.props.idCoche) {
            await this.loadCarById();
        }
    }

    render() {
        if (this.state.coche == null) {
            return <h1>Cargando...</h1>
        }

        return (
            <div>
                <h1 className="text-3xl font-bold mb-4">Coche ({this.state.coche.idCoche})</h1>
                <h3>{this.state.coche.marca}</h3>
                <h3>{this.state.coche.modelo}</h3>
                <h3>{this.state.coche.conductor}</h3>
                <img src={this.state.coche.imagen} />
            </div>
        )
    }
}
