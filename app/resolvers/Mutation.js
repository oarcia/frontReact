const actions = require("../actions");
const { getUserId } = require("../utils");
const { storeUpload } = require("../utils");
//const { storeUploadVideoAudio } = require("../utils")
// en esta parte de los resolvers la parte schema de graphql 
//la recomendcion es de hacer desde la base de datos.

const signup = async (_, args, context, info) =>{
  const { createReadStream } = await args.data.profile_image;
  const stream = createReadStream();
  const { url } = await storeUpload(stream);
 // const { url } = await storeUploadVideoAudio(stream);
  args.data.profile_image = url;

    return actions
        .signup(args.data)
        .then(token =>{
            return { message: "User created succesfully, token:",token: token}// esto es una promesa
        })
        .catch(e => e);
};

const login = (_, args, context, info)=>{
    return actions.login(args)
    .then((token)=>{
        return{message:"User logged succesfully",
        token}
    }).catch(e => e);
};
const createPost= async(_, args,context,info)=>{
    //retornamos la informacion del usuario
    const user = await getUserId(context);
    args.data.author = user._id;
    if(!user) throw new Error('user no encontrado');
    return actions.createPost(args.data)
    .then((post) =>{
        return actions.addPostToUser(user._id,post._id)
        .then((user) =>{
            context.pubSub.publish("NEWPOST", {newPost: post});//le mandamos la data que debe ser
            return post;
        }).catch(e => e);
    }).catch(e => e);
}

const deleteUser = (_, args, context, info) =>{
    return actions.deleteUserById(args._id).then((user) =>{
        if(!user) throw  new Error("Usuario no existe");
        return user
    }).catch(e => e);
}

const updateUser = (_, args, context, info) =>{
    return actions.updateUserById(args.id, args.data).then((user)=>{
        if(!user) throw new Error("Usuario no existe");
        return user
    }).catch( e => e);
}
module.exports ={
    signup,//checar como funcionan los strincs en nodejs
    login,
    createPost,
    deleteUser,
    updateUser

}