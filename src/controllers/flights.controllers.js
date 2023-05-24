import {db} from "../dataBase/dataBase.connection";


export async function getFlights(req, res) {
try{
    const flights = await db.query('SELECT * FROM flights');
    if(flights.rows.length === 0){
        res.status(404).send("No flights found");
    }
    res.status(200).send(flights.rows);
}catch(err){
    res.status(500).err(err);
    console.log(err);
}
}