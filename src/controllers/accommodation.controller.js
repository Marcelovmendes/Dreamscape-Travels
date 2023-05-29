import { db } from "../dataBase/dataBase.connection.js";
import { newHotels } from "../data/newHotels.js";
//import {newHotels} from "../data/newHotels.js";

export async function addAccomodattion() {
  try {
    await Promise.all(newHotels.map((hotel) => {
      const { name, description, nightlyPrice, cityId } = hotel;

      const query = `INSERT INTO hotels ("name", "description", "nightlyPrice", "cityId") VALUES ($1, $2, $3, $4)`;
      const values = [name, description, nightlyPrice, cityId];

      return db.query(query, values);
    }));
  } catch (err) {
    console.log(err);
  }
}

export async function getAccommodationByPrice(req, res) {
  const { minPrice, maxPrice } = req.query;
  try {
    const Accommodation = [];
    if (minPrice && maxPrice) {
      Accommodation = await db.query(
        `SELECT * FROM hotels WHERE price => $1 AND price <= $2`,
        [minPrice, maxPrice]
      );
    } else if (minPrice) {
      Accommodation = await db.query(`SELECT * FROM hotels WHERE price >= $1`, [
        minPrice,
      ]);
    } else if (maxPrice) {
      Accommodation = await db.query(`SELECT * FROM hotels WHERE price <= $1`, [
        maxPrice,
      ]);
    } else if (maxPrice === '100000' && minPrice === '0') {
      Accommodation = await db.query(`SELECT * FROM hotels`);
    }

    if (Accommodation.rows.length === 0)
      return res.status(404).send("No hotels found");

    res.status(200).send(Accommodation.rows);
  } catch (err) {
    res.status(500).err(err);
    console.log(err);
  }
}
