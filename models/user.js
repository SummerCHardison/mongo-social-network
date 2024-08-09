const { Schema, model } = require('mongoose');
// function to make sure email is valid email
const validateEmail = function(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email);
};
// new schema for user where username is a unique required string that is trimmed of unneeded whitespace. Email is a unique required string that must be validated and matched to valid email format. Thought is an array of object id that references thought model. Friends is a id that is self references
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// intializing model
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);
// exporting model
module.exports = User;