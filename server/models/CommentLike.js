const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment:{
        type:'String',
    },
    like:{
        type:'number',
    }
},{ timestamps : true });

const Comment = mongoose.model("Comment" , commentSchema);

module.exports = Comment;