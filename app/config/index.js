const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {
    dev:{
        SECRET_KEY:"UJUIJOKOPKMNXXXXJKJ",
        db:{
            url: "mongodb+srv://usuario:hola12345@cluster0-zg4pg.mongodb.net/test?retryWrites=true"
        }
    },
    
    test:{
        SECRET_KEY: "UJUIJOKOEPKMNXXXXJKJ",
        db:{
        url: "mongodb+srv://usuario:hola12345@cluster0-zg4pg.mongodb.net/testeo?retryWrites=true"
        }
    },
    production:{
        SECRET_KEY:process.env.SECRET_KEY,
       // SECRET_KEY:process.env.MONGO_URL,
       db:{
           url:process.env.MONGO_URL,
       }
    },
};
module.exports = ENVS[NODE_ENV]