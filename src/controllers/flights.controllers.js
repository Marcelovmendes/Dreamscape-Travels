  import { db } from "../dataBase/dataBase.connection.js";
// import newFlights from "../data/newFlights.js";
  
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
      } else if(maxPrice=== '100000' && minPrice === '0'){
        flights = await db.query("SELECT * FROM flights");
      }
      if (flights.rows.length === 0) return res.status(404).send("No flights found");

      res.status(200).send(flights.rows);
    }catch (err) {
      res.status(500).err(err);
      console.log(err);
    }
  }
  export async function addFlight() {
    try {
      await Promise.all(newFlights.map((flight) => {
        const {
          airlinId,
          departureCity,
          destinationCity,
          departureTime,
          arrivalTime,
          flightDate,
          price
        } = flight;
  
        const query = `INSERT INTO flights ("airlineId", "departureCity", "destinationCity", "departureTime", "arrivalTime", "flightDate", "price") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const values = [
          airlinId,
          departureCity,
          destinationCity,
          departureTime,
          arrivalTime,
          flightDate,
          price
        ];
  
        return db.query(query, values);
      }));
    } catch (err) {
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
