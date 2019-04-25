const authActions = require('./authActions');
const userActions = require('./userActions');
const postsActions = require('./postsActions');


module.exports ={
    ...userActions,
    ...authActions,
    ...postsActions,
}
//las accion son las que hacen la iteracion de la base de datos
//mediante al esquema es mejor hacer los modelos de la base de datos 
//y la interpretacion de los modelos de negocio