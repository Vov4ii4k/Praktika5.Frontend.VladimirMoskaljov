const Pool = require("pg").Pool;
const arr = new Pool({
    user: 't193085',
    host: 'dev.vk.edu.ee',
    database: 'world_student',
    password: 't193085',
    port: 5432

});
module.exports = arr;