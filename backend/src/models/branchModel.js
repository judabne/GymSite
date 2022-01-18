import mongoose, { Schema } from 'mongoose';

// create geolocation schema
const geoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

const branchSchema = new mongoose.Schema({
    branchCity: { type: String, required: true },
    branchDescription: { type: String, required: true },
    branchImage: { type: String, required: true },
    branchLocation: geoSchema
});

const branchModel = mongoose.model("Branch", branchSchema);

export default branchModel;