//definimos los canales
const NEWPOST = "NEWPOST";

const newPost = {
    subscribe:(parent, args, { pubSub }) =>{
        return pubSub.asyncIterator(NEWPOST);// ESTa FUNCION DEFINES EL CANAL
    }
}

module.exports = {
    newPost,
};