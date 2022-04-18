const db = require('../db/db.js')


async function location(req,res){
    try {
        const cities = await db.location.findAll({where:{IsActive:true}})
        res.status(200).json({"status":true, "data":cities, "message" : "api works"})
    } catch (error) {
        res.status(500).json({"status":false, "message" : "api not works"})
    }

}

module.exports = {
    location
}