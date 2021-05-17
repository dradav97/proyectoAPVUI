module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notaSecret!'
    },
    //mongo 
    mongo: {
        dbUser: process.env.DB_USER || "db_admin_apvui",
        dbPassword: process.env.DB_PASWORD || "APVUI",
        dbHost: process.env.DB_HOST || "cluster0.qzctd.mongodb.net",
        dbName:process.env.DB_NAME || "apvui_db"
    } 

}