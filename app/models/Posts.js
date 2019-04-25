const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const types = mongoose.Schema.Types;

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["TECH", "HEALTH", "GAME", "DEV"]
    },
    tags: [{
        type: String
    }],
    like: {
        type: Number,
        default: 0
    },
    author:{
        type: types.ObjectId,ref: "users"
    },
    is_active:{
        type: Boolean,
        default: true
    }
},{"collection": "posts", "timestamps": true});

mongoose.Types.ObjectId.prototype.valueOf = function (){
    return this.toString();
}

module.exports = mongoose.model("posts", PostSchema);