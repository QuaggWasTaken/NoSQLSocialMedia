const router = require("express").Router();
const {
    User
} = require('../../models');


// Get /api/users
router.get('/', (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data)
        })
});

//Get /api/users/1
router.get('/:id', ({
    params
}, res) => {
    User.findOne({
            _id: params.id
        })
        .populate('thoughts')
        .populate('friends')
        .then((data) => {
            res.json(data)
        })
});

//POST /api/users
router.post('/', ({
    body
}, res) => {
    User.create(body)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
});

//POST /api/users/1/friends/
router.post('/:userId/friends/:friendId', ({
    params
}, res) => {
    User.findOneAndUpdate({
            _id: params.userId
        }, {
            $push: {
                friends: params.friendId
            }
        }, {
            new: true
        })
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                res.json("Invaid ID")
            }
        })
        .catch(err => {
            res.json(err)
        })
})

//PUT /api/users/1
router.put('/:id', ({
    params,
    body
}, res) => {
    User.findOneAndUpdate({
            _id: params.id
        }, {
            $set: {
                username: body.username,
                email: body.email
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

//DELETE /api/users/1
router.delete('/:id', ({
    params
}, res) => {
    User.findOneAndDelete({
            _id: params.id
        })
        .then((docs) => {
            if (docs) {
                res.json(docs)
            } else {
                res.json("Invalid ID")
            }
        })
        .catch((err) => {
            res.json(err)
        })
});

//DELETE /api/users/1/friends/2
router.delete('/:userId/friends/:friendId', ({
    params
}, res) => {
    User.findOneAndUpdate({
            _id: params.userId
        }, {
            $pull: {
                friends: params.friendId
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