const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    password: { type: String },
    token: { type: String },
    role: { type: String, enum: ["admin", "author", "user"], default: "user" },
    createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const DonationSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetAmount: { type: Number, required: true },
    collectedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ["Ongoing", "Completed", "Cancelled"], 
        default: "Ongoing" 
    },
    donors: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        amount: { type: Number, required: true }, 
        donatedAt: { type: Date, default: Date.now } 
    }],
    image: { type: String },
}, { timestamps: true });

const ArticleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
}, { timestamps: true });

module.exports = {
    User: mongoose.model("User", UserSchema),
    Donation: mongoose.model("Donation", DonationSchema),
    Article: mongoose.model("Article", ArticleSchema)
}