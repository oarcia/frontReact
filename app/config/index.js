const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {
    dev:{
        SECRET_KEY:"",
        db:{
            url: ""
        }
    },
    
    test:{
        SECRET_KEY: "",
        db:{
        url: ""
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
