import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId : {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide a user"],
},
phone: {
    type: String,
        required: [true, "Please provide a phone"],
    },
    street: {
        type: String,
        required: [true, "Please provide a street"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
    },
    state: {
        type: String,
        required: [true, "Please provide a state"],
    },
    zip: {
        type: String,
        required: [true, "Please provide a zip"],
    },
    country: {
        type: String,
        required: [true, "Please provide a country"],
    },
    createdAt: Date,
});

export const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);