import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IAnimal } from "./modules/IAnimal";

export function Animal(){
 
    const [animalId, setAnimalId] = useState(0)
    const [animal, setAnimal] = useState<IAnimal[]>()
    const [fedAnimal, setFedAnimal] = useState(false)
    const [time, setTime] = useState(Date)
    const [disable, setDisable] = useState(false);
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

  function feedTheAnimal(){
    setFedAnimal(true)
    setDisable(true)
    const time = new Date();
    const date = `${time.getDate()}/${time.getMonth()+1} kl ${time.getHours()}:${time.getMinutes()}`;
    setTime(date)

   
    // let fed = JSON.parse(localStorage.getItem('animals') || '');
    // for(let i = 0; i < fed.length; i++){
    //     if(i ===fed.id){
    // fed[i].isFed = true;
    // // fed[i].lastFed = date
    // localStorage.setItem("animals", JSON.stringify(fed ) )
    // console.log(fed)
    // }
// }
  
  }
        if(animalId === animal.id){
        return(<>
            <div key={animal.id}>
            <img src={animal.imageUrl} alt={"img of"+ animal.latinName}></img>
            <p>{animal.name}</p>
            <p>{animal.longDescription}</p>
            <p>{animal.yearOfBirth}</p>
            <p>{animal.isFed}</p>
           
           <button disabled={disable} onClick={()=> feedTheAnimal()}>Mata</button>
            <div>
                {fedAnimal && <p>Djuret är matat {time}</p>}
                </div>
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

