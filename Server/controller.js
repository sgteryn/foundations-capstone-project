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
            rating float,
            name varchar,
            food_type varchar,
            address varchar, 
            website varchar);

        INSERT INTO restaurants(rating, name, food_type, address, website)
            values ('4.5', 'Ima', 'Japanese', '4870 Cass Ave, Detroit, MI 48201', 'https://imanoodles.com'),
            ('4.6', 'Maty''s Cuisine', 'West African', '21611 Grand River Ave, Detroit, MI 48219', 'https://matysdetroit.com'),
            ('4.4', 'Detroit Vegan Soul', 'Vegan Soul Food', '19614 Grand River Ave, Detroit, MI 48223', 'https://www.detroitvegansoul.com'), 
            ('4.7', 'Fusion Flare Kitchen & Cocktails', 'American & Soul Food', '16801 Plymouth Rd, Detroit, MI 48227', 'https://fusionflare.net'),
            ('4.2', 'The Jamaican Pot', 'Jamaican', '14615 W 8 Mile Rd Detroit, MI 48235', 'https://www.thejamaicanpot.com'), 
            ('4.4', 'SavannahBlue', 'Contemporary Soul Food', '1431 Times Square, Detroit, MI 48226', 'https://savannahbluedetroit.com'),
            ('4.6', 'Dime Store', 'Brunch', '719 Griswold Suite 180, Detroit, MI 48226', 'https://www.eatdimestore.com'),
            ('4.2', 'Central Kitchen + Bar', 'Creative American Comfort Food', '660 Woodward Ave Suite 4A, Detroit, MI 48226', 'https://www.centraldetroit.com'),
            ('4.2', 'They Say', 'American', '267 Jos Campau, Detroit, MI 48207', 'https://theysayrestaurant.com'),
            ('4.0', 'Bert''s Marketplace','Soul Food', '2727 Russell St, Detroit, MI 48207', 'https://www.eatatberts.com'), 
            ('4.0', 'Coop Detroit', 'Caribbean Fusion', '474 Peterboro St, Detroit, MI 48201','https://coopdetroit.com'),
            ('4.4', 'Norma G''s', 'Caribbean', '14628 E Jefferson, Detroit, MI 48215', 'https://www.normagscuisine.com');
        
            SELECT * FROM restaurants 
            ORDER BY name ASC;
            `).then(() => {
            console.log('Datebase seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding Database', err))
    },

    getRestaurants: (req, res) => {
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
        sequelize.query(`INSERT INTO restaurants (rating, name, food_type, address, website) 
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