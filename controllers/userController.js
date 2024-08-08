const { User, Thought } = require('../models');

module.exports = {
    async getUser(req, res) {
        try {
            const users = await User.find().populate('thoughts', 'friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const users = await User.findOne({ _id: req.params.id }).populate('thoughts', 'friends');

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
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