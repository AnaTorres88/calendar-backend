const { Schema, model } = required('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
// sobreescribir json para
EventSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.object();
    object.id = __id;
    return object
});

module.exports = model('Event', EventSchema);

