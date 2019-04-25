const Post = require('../models/Posts');

const createPost = (data) =>{
    return Post.create(data);
};

const getAllPost = () =>{
    return Post.find({is_active: true}).populate('Author');
};

const getPostById = (id) =>{
    return Post.findOne({_id: id, is_active: true});
};

const getPostByTag =(tag) =>{
    return Post.find({tags: {$in: tag}, is_active:true});
    //con in buscas dentro de un arreglo sintaxis $in
};

const getPostByCategory = (category) =>{
    return Post.find({category:category,is_active:true});
};

const UpdatePostById = (id) =>{
    return Post.findByIdAndUpdate(id, {$set:data}, {new:true});
};
const deletePostById = (id)=>{
    return Post.findByIdAndUpdate(
            {_id: id, is_active:true},
            {$set:{is_active:false}},
            {new: true});
}
module.exports = {
    createPost,
    getAllPost,
    getPostById,
    getPostByTag,
    getPostByCategory,
    UpdatePostById,
    deletePostById,
}