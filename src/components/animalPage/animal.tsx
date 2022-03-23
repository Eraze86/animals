import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IAnimal } from "./modules/IAnimal";

export function Animal(){

    const [animalId, setAnimalId] = useState(0)
    const [animal, setAnimal] = useState<IAnimal[]>()
    const [fedAnimal, setFedAnimal] = useState(false)
    let params = useParams();

    useEffect(() => {
        if(params.id)
    setAnimalId(+params.id)
    },[])
    useEffect(()=> {
        let localAnimal = localStorage.getItem("animals") 
        if(localAnimal) {
            setAnimal(JSON.parse(localAnimal))
        }    
    },[animalId]);

    let showAnimals = animal?.map((animal: IAnimal)=>{
  
        if(animalId === animal.id){
        return(<>
            <div key={animal.id}>
            <img src={animal.imageUrl} alt={"img of"+ animal.latinName}></img>
            <p>{animal.name}</p>
            <p>{animal.longDescription}</p>
            <p>{animal.yearOfBirth}</p>
            <p>{animal.isFed}</p>
           
            <button onClick={()=> setFedAnimal(true)}>Mata</button>
            {fedAnimal && <p>Djuret är matat </p>} {animal.lastFed}
           </div>
            </>)
        }
    })
    return(<>
    <div>
    {showAnimals}
    </div>
    
    
    </>)

}

