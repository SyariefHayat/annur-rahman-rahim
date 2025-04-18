const mongoose = require("mongoose");

// const UserSchema = mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     bio: { type: String },
//     password: { type: String },
//     token: { type: String },
//     role: { type: String, enum: ["admin", "author", "user"], default: "user" },
//     notification: {
//         title: { type: String, required: true, },
//         description: { type: String },
//         read: { type: Boolean, default: false, },
//         createdAt: { type: Date, default: Date.now },
//         required: function() {return this.role === "user" || this.role === "author"}
//     },
//     createdAt: { type: Date, default: Date.now }
// },{ timestamps: true });

const UserSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: { type: String },
    password: { type: String },
    token: { type: String },
    role: {
        type: String,
        enum: ["admin", "author", "user"],
        default: "user"
    },
    notifications: [{
        title: { type: String, required: true },
        description: { type: String },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const DonationSchema = mongoose.Schema({
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetAmount: { type: Number, required: true },
    collectedAmount: { type: Number, default: 0 },
    // deadline: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Ongoing", "Completed", "Cancelled"],
        default: "Ongoing"
    },
    donors: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, default: "Orang baik" },
        amount: { type: Number, required: true },
        message: { type: String },
        amens: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        donatedAt: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

// const DonationSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     desc: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     targetAmount: { type: Number, required: true },
//     collectedAmount: { type: Number, default: 0 },
//     deadline: { type: Date, required: true },
//     status: { 
//         type: String, 
//         enum: ["Ongoing", "Completed", "Cancelled"], 
//         default: "Ongoing" 
//     },
//     donors: [{ 
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
//         amount: { type: Number, required: true }, 
//         donatedAt: { type: Date, default: Date.now } 
//     }],
//     image: { type: String },
// }, { timestamps: true });

const CommentSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        replies: [], // nanti ditimpa setelah deklarasi
        createdAt: { type: Date, default: Date.now }
    });

CommentSchema.add({
    replies: [CommentSchema] // ini kunci untuk membuat nested balasan
});

const ArticleSchema = mongoose.Schema({
    cover: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    content: [{
        type: {
            type: String,
            enum: ["heading-1", "heading-2", "heading-3", "text", "image"],
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, trim: true, maxlength: 20 }],
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [CommentSchema],
}, { timestamps: true });

module.exports = {
    User: mongoose.model("User", UserSchema),
    Donation: mongoose.model("Donation", DonationSchema),
    Article: mongoose.model("Article", ArticleSchema)
}