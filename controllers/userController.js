const { User } = require('../models');

module.exports = {
    //gets all users and also populates thoughts and friends for the users. Shows error if error
    async getUser(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // gets one user where id matches id from params. Shows error if error. Seperate error message for incorrect id
    async getSingleUser(req, res) {
        try {
            const users = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends')

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // creates new user with information from request body. Shows error if error
    async createUser(req, res) {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user where id matches id from params to now include info from request body. Shows error if error. Seperate error message for incorrect id
    async updateUser(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete user where id matches id from params. Shows error if error. Seperate error message for incorrect id
    async deleteUser(req, res) {
        try {
            const users = await User.findOneAndDelete({ _id: req.params.id })

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // adds friends to user's friend list where first id from params matches a user id to add a friend to, and second id from params matches an id of a user to be added to the friends list. Shows error if error. Seperate error message for incorrect id
    async addFriend(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // deletes friend from user's friend list where first id from params matches a user id to delete a friend from, and second id from params matches an id of a user to be deleted from the friends list. Shows error if error. Seperate error message for incorrect id
    async deleteFriend(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}