const router = require("express").Router();
const {
    Thought,
    User
} = require('../../models');

router.get('/', (req, res) => {
    Thought.find({})
        .then((data) => {
            res.json(data)
        })
});

router.get('/:id', ({params}, res) => {
    Thought.findOne({
            _id: params.id
        })
        .then((data) => {
            res.json(data)
        })
});

router.post('/', ({
    body
}, res) => {
    Thought.create({
            thoughtText: body.thoughtText,
            username: body.username
        })
        .then((data) => {
            User.findOneAndUpdate({
                _id: body.userId
            }, {
                $push: {
                    thoughts: data._id
                }
            }, {
                new: true
            })
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.post('/:thoughtId/reactions', ({
    params,
    body
}, res) => {
    Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $push: {
                reactions: body
            }
        }, {
            new: true
        })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'No thought found with this id!'
                });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
})

router.put('/:id', ({
    params,
    body
}, res) => {
    Thought.findOneAndUpdate({
            _id: params.id
        }, {
            $set: body
        }, {
            new: true
        })
        .then((docs) => {
            if (docs) {
                res.json(docs)
            } else {
                res.json("Invaid ID")
            }
        })
        .catch((err) => {
            res.json(err)
        })
})

router.delete('/:id', ({
    params
}, res) => {
    Thought.findOneAndDelete({
            _id: params.id
        })
        .then((docs) => {
            if (docs) {
                User.findOneAndUpdate({
                    username: docs.username
                }, {
                    $pull: docs._id
                })
                res.json(docs)
            } else {
                res.json("Invalid ID")
            }
        })
        .catch((err) => {
            res.json(err)
        })

});

router.delete('/:thoughtId/reactions/:reactionId', ({
    params
}, res) => {
    Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $pull: {
                reactions: {
                    _id: params.reactionId
                }
            }
        }, {
            new: true
        })
        .then((docs) => {
            if (docs) {
                res.json(docs)
            } else {
                res.json("Invaid ID")
            }
        })
        .catch((err) => {
            res.json(err)
        })
})

module.exports = router;