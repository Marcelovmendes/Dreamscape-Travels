import {db} from "../dataBase/dataBase.connection";
import { cities } from "../data/cities";

export async function addCity(){

  try{ await Promise.all(cities.map((c)=>{
    const query = `INSERT TO cities (name) VALUES ($1)`;
    const values = [c.name];
    return db.query(query,values)
  }))

  } catch(err){
    console.log(err);
  } 
}
addCity();

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