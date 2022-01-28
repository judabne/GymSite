import mongoose, { Schema } from 'mongoose';
import geoSchema from './LocationModel';

const branchSchema = new mongoose.Schema({
    branchCity: { type: String, required: true },
    branchDescription: { type: String, required: true },
    branchImage: { type: String, required: true },
    branchLocation: { type: geoSchema, required: true }
});

const branchModel = mongoose.model("Branch", branchSchema);

export default branchModel;