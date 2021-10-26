import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    paymentIntent: { type: String, required: true, unique: true},
    paymentUser: {type: String, required: true},
    paymentPlan: {type: String, required: true},
    paymentPlanType: {type: String, required: true},
    paymentDate: {type: Date, required: true},
});

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;