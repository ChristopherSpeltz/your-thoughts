const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

//get all thoughts....add thought
router.route("/")
    .get(getAllThoughts)
    .post(addThought);

//get/put/delete by id
router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//add reaction
router.route("/:thoughtId/reactions")
    .post(addReaction);

//delete reaction
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;