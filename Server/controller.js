require("dotenv").config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

module.exports = {
    seed: (req,res) => {
        sequelize.query(`
        CREATE TABLE restaurants (
            restaurant_id serial primary key,
            rating integer,
            name varchar,
            food_type varchar,
            address varchar, 
            website varchar);

        INSERT INTO restaurants (name)
            values ("Ima"),
            ("Maty's Cuisine"),
            ("Detroit Vegan Soul"), 
            ("Fusion Flare Kitchen & Cocktails"),
            ("The Jamaican Pot", "SavannahBlue"),
            ("Dime Store"),
            ("Central Kitchen + Bar"),
            ("They Say","Bert's Marketplace"), 
            ("Coop Detroit"),
            ("Norma G's");
        `).then(() => {
            console.log('Datebase seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding Database', err))
    },
    getRestaurants: (req, res) => {
        let{rating,
            name,
            food_type,
            address, 
            website} = req.body
        sequelize.query(`SELECT * FROM restaurants`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    addRestaurant:  (req, res) => {
        let {rating,
            name,
            food_type,
            address, 
            website
            } = req.body
        sequelize.query(`INSERT INTO restaurants(name, rating, countryId) 
        values (${rating},${name}, ${food_type}, ${address},${website})`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    editRating: (req, res) => {
        let {rating} = req.body
        sequelize.query(`UPDATE restaurants(rating) VALUES(${rating})`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
     },

    deleteRestaurant:  (req,res) => {
        let {id} = req.params
        sequelize.query(`DELETE from restaurants
        where restaurant_id = ${req.params.id}`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }   
}