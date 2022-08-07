require('dotenv').config()




module.exports = {
    seed: (req,res) => {
        sequelize.query(`
        CREATE TABLE restaurants (
            restaurant_id serial primary key,
            rating integer,
            restaurant_name varchar,
            food_type varchar,
            address varchar, 
            website varchar)
        `).then(() => {
            console.log('Datebase seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding Database', err))
    },
    

}






//Random Restaurant generator, Pick 4 me button located at the top right corner


var restaurants = ["Ima","Maty's Cuisine","Detroit Vegan Soul", "Fusion Flare Kitchen & Cocktails", "The Jamaican Pot", "SavannahBlue","Dime Store","Central Kitchen + Bar","They Say","Bert's Marketplace", "Coop Detroit","Norma G's"]

randomRestaurant = Math.floor(Math.random()* restaurants.length);
console.log(random, restaurants[random])

let randomRestaurantButton = document.querySelector('#pick4mebutton')
randomRestaurant.addEventListener("click", randomRestaurant);