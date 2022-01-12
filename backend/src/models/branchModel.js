import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    branchCity: { type: String, required: true },
    branchDescription: { type: String, required: true },
    branchImage: { type: String, required: true }
});

const branchModel = mongoose.model("Branch", branchSchema);

export default branchModel;