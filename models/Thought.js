const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(x) {
            return x.toString()
        }
    },
    username: {
        type: String,
        required: true,
    },
},
{
    toJSON: {
        getters: true
    },
    id: false
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 120
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(x) {
            return x.toString()
        }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const Thought = model('Thought', ThoughtSchema);

Thought.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

module.exports = Thought;