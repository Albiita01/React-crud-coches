import axios from "axios"
import Global from "../Global"

export default class CarService {

    async getAllCars() {
        let url = Global.urlApiCoches;
        let request = "api/Coches";
        let response = await axios.get(url + request);
        return response.data;
    }

    async getCarById(idCoche) {
        let url = Global.urlApiCoches;
        let request = "api/Coches/FindCoche/" + idCoche;
        let response = await axios.get(url + request);
        return response.data;
    }

    async insertCar(coche) {
        let url = Global.urlApiCoches;
        let request = "api/coches/insertCoche/";
        let response = await axios.post(url + request, coche);
        return response.data;
    }

    async updateCar(coche) {
        let url = Global.urlApiCoches;
        let request = "api/coches/updateCoche/";
        let response = await axios.put(url + request, coche);
        console.log("A " + response)
        return response.data;
    }

    async deleteCarById(idCoche) {
        let url = Global.urlApiCoches;
        let request = "api/coches/deletecoche/" + idCoche;
        let response = await axios.delete(url + request);
        console.log("Eliminando coche " + idCoche + response);
        return response.data;
    }
}