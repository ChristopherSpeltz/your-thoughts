const { User } = require("../models");

const userController = {
    // get all Users
    getAllUsers(req, res) {
        User.find({})
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by Id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
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

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
    },
};

module.exports = userController;