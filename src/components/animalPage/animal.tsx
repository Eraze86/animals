import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "./modules/IAnimal";

export function Animal() {
  const [animalId, setAnimalId] = useState(0);
  const [animal, setAnimal] = useState<IAnimal[]>();
  const [fedAnimal, setFedAnimal] = useState(false);
  const [disable, setDisable] = useState(false);
  let params = useParams();

  useEffect(() => {
    if (params.id) setAnimalId(+params.id);
  }, []);
  // hämta localStorage
  useEffect(() => {
    let localAnimal = localStorage.getItem("animals");
    if (localAnimal) {
      setAnimal(JSON.parse(localAnimal));
    }
  }, [animalId]);
  //mapa ut infon på djuret man tryckt på
  let showAnimals = animal?.map((animal: IAnimal) => {
    function feedTheAnimal() {
      //när knappen trycks visar texten att djuret är matat
      setFedAnimal(true);
      //knappen går inte längre att trycka på
      setDisable(true);
      //hämtar localstorage, ändrar värdet på isFed och lastFed
      //syncar inte riktigt utan man måste uppdatera sidan
      let localS = JSON.parse(localStorage.getItem("animals") || "");
      for (let i = 0; i < localS.length; i++) {
        if (i + 1 === +params.id!) {
          localS[i].isFed = true;
          localS[i].lastFed = new Date().toLocaleString();

          localStorage.setItem("animals", JSON.stringify(localS));
        }
      }
    }
    if (animalId === animal.id) {
      return (
        <>
          <div key={animal.id}>
            <img src={animal.imageUrl} alt={"img of" + animal.latinName}></img>
            <p>{animal.name}</p>
            <p>{animal.longDescription}</p>
            <p>{animal.yearOfBirth}</p>
            <p>{animal.isFed}</p>

            <button disabled={disable} onClick={() => feedTheAnimal()}>
              Mata
            </button>
            <div>
              {fedAnimal && <p>Djuret är matat </p>}
              <p>senast matat: {animal.lastFed}</p>
            </div>
          </div>
        </>
      );
    }
  });
  return (
    <>
      <div>{showAnimals}</div>
    </>
  );
}
