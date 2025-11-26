const{pool, DatabaseError} = require ('pg');
require ('dotenv').config() ;

const pool = new pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const probar = async () => {
    try {
    
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message );
    }
    
}