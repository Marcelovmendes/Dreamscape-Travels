import { db } from "../dataBase/dataBase.connection.js";
 
export async function getAllFlights(req, res) {
  
  try {
    const flights = await db.query("SELECT * FROM flights");
    if (flights.rows.length === 0) return res.status(404).send("No flights found");
    
    res.status(200).send(flights.rows);
  } catch (err) {
    
    res.status(500).err(err);
  }
}
export async function getFlightsByPrice(req, res) {
  const { minPrice, maxPrice } = req.query;
  try {
    const flights = [];
    if (minPrice && maxPrice) {
      flights = await db.query(
        "SELECT * FROM flights WHERE price >= $1 AND  price <=  $2",
        [minPrice, maxPrice]
      );
    } else if (minPrice) {
      flights = await db.query("SELECT * FROM flights WHERE price >= $1", [
        minPrice,
      ]);
    } else if (maxPrice) {
      flights = await db.query("SELECT * FROM flights WHERE price <= $1", [
        maxPrice,
      ]);
    } else {
      flights = await db.query("SELECT * FROM flights");
    }
    if (flights.rows.length === 0)
      return res.status(404).send("No flights found");

    res.status(200).send(flights.rows);
  } catch (err) {
    res.status(500).err(err);
    console.log(err);
  }
}

export async function getFlightById(req, res) {
  const { id } = req.params;

  try {
    const flights = await db.query("SELECT * FROM flights WHERE id = $1", [id]);
    if (flights.rows.length === 0) {
      res.status(404).send("No flights found");
    }
    res.status(200).send(flights.rows);
  } catch (err) {
    res.status(500).err(err);
    console.log(err);
  }
}
