import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    city: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

const branchModel = mongoose.model("Branch", branchSchema);

export default branchModel;