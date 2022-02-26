
const { User, Thought } = require("../models");

const thoughtController = {
    
    // get thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
    },

    // get by Id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // add thought
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No User found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update by Id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // delete by Id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: "No thought found with this id" });
            }
            return User.findOneAndUpdate(
                { username: deletedThought.username },
                { $pull: { thoughts: params.id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = thoughtController;