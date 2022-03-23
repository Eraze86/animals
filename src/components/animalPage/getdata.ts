import axios from "axios"
import { IAnimal } from "./modules/IAnimal"

export function getDataProps(){
    axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
    .then((response)=>{ response.data

 })
}