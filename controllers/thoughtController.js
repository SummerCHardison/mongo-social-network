const { Thought, User } = require('../models');
//exporting functions to be used in routes later
module.exports = {
    // route to get all thoughts. Finds all and responds with what it got back. Shows error if error
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // route to get one thought. Finds one thought where it's id matches the id included in the request parameters. If no data then no thought with this id message. If different error shows error
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.id });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // route to create a thought. Creates thought with information from request body, then updates a user with a matching username from the body to include that thought's id
    async createThought(req, res) {
        try {
            const thoughts = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thoughts._id } },
                { runValidators: true, new: true }
            );
            // if no data for user display message
            if (!user) {
                return res.status(404).json({ message: 'Thought created, but no user with that name' });
            }
            // display new thought
            res.json(thoughts);
            // if different error show error
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // route to update thought. updates thought with information from body where id matches id from parametes
    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            // if no data display message
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // display updated thought
            res.json(thoughts);
            // if different error show error
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // router to delete thought. Finds thought where id matches id from params and deletes it
    async deleteThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndDelete({ _id: req.params.id });

            // if no data display message
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // display updated data
            res.json(thoughts);
            // if different error show error
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // route to add reaction to thought where thought id matches id from params. Uses info from body to create reaction
    async addReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            // if no data display message
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // display updated data
            res.json(thoughts);
            // if different error show error
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // route to delete reaction from thought where thought id matches thought id from params, and reaction id matches reaction id from params as well.
    async deleteReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            // if no data display message
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // display updated data
            res.json(thoughts);
            // if different error show error
        } catch (err) {
            res.status(500).json(err);
        }
    }
}