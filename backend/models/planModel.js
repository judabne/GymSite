import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    planName: { type: String, required: true, unique: true},
    planDuration: {type: Number, requred: true},
    planPrice: {type: Number, required: true},
    planType: {type: String, default: "Regular"},
    planDescription: {type: String},
    planAvailable: {type: Boolean, default: true} //if a plan is not available, those who purchased it will still benefit from it. but it wont show to new buyers
});

const planModel = mongoose.model("Plan", planSchema);

export default planModel;