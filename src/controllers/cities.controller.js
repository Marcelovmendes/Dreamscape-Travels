import { db } from "../dataBase/dataBase.connection.js";
import { newCities } from "../data/newCities.js";

export async function addCity(){

  try{ await Promise.all(newCities.map((c)=>{
    const query = `INSERT INTO cities (name) VALUES ($1)`;
    const values = [c.name];
    return db.query(query,values)
  }))

  } catch(err){
    console.log(err);
  } 
}

export async function getCities(req, res) {
    
    try{
        const cities = await db.query('SELECT * FROM cities');
     if( cities.rows.length === 0){
         res.status(404).send("No cities found");
     }

        res.status(200).send(cities.rows);
    }catch(err){
        res.status(500).err(err);
        console.log(err);
    }
}