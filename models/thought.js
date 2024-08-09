const { Schema, model } = require('mongoose');
const Mongoose = require('mongoose');

//creating model for reactions where reaction id is an id and it's default is just a new id. Reaction body is a required string with max 280 characters. username is a required string. Created at is a date where default is current date
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Mongoose.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);
// creating schema for though model where thoughtText is a required string with a max length of 280 and min of 1. Created at is a date where default is current date. username is a required string. reactions is a reference to the reaction schema and holds an array with instances of it.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);
// initalizing model for thoughts
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);
// exporting model
module.exports = Thought;