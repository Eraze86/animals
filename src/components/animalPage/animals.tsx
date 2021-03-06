import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "./modules/IAnimal";
import "./animals.css";
import { Link } from "react-router-dom";

export function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  useEffect(() => {
    //hämtar axios
    if (Animals.length > 0) return;
    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
        console.log(response.data);
        //sparar datan i localStorage
        localStorage.setItem("animals", JSON.stringify(response.data));
      });
  }, []);
  //skriver ut alla djuren i listan
  let listOfAnimals = animals.map((animal, i: number) => {
    //länkar router till startsidan
    let animalLink = `/animal/${animal.id}`;
    return (
      <>
        <div className="container" key={i}>
          <img src={animal.imageUrl} alt={"img of" + animal.latinName}></img>
          <Link to={animalLink}>{animal.name}</Link>
          <p>{animal.shortDescription}</p>
        </div>
      </>
    );
  });

  return <>{listOfAnimals}</>;
}
