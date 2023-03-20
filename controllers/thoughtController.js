const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => {
                console.log(thoughts)
                res.json(thoughts)
            })
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { username: thought.username },
                    {
                        $push: {
                            thoughts: thought._id
                        }
                    },
                    { new: true }
                );
                res.json(thought)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactionId: req.params.reactionId } },
            { new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No Reaction with that ID' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err))
    }
};