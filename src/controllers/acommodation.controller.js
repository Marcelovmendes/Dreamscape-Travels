import {db} from "../dataBase/dataBase.connection.js";


export async function getAcommodationByPrice(req,res){

    const {minPrice,maxPrice} = req.query;
    try{
        const Acommodation =[];
        if(minPrice &&maxPrice){
          Acommodation = await db.query(`SELECT * FROM hotels WHERE price => $1 AND price <= $2`, [minPrice,maxPrice]);
        }else if(minPrice){
            Acommodation = await db.query(`SELECT * FROM hotels WHERE price >= $1`, [minPrice]);
        } else if(maxPrice){
            Acommodation = await db.query(`SELECT * FROM hotels WHERE price <= $1`, [maxPrice]);
        } else{
            Acommodation = await db.query(`SELECT * FROM hotels`);
        }

        if(Acommodation.rows.length === 0) return res.status(404).send("No hotels found");
        
         res.status(200).send(Acommodation.rows);
    }catch(err){
        res.status(500).err(err);
        console.log(err);
}
}