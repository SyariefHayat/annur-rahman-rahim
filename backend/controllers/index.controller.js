require("dotenv").config();
const argon2 = require("argon2");
const midtransClient = require('midtrans-client');

const { User, Donation, Article } = require("../models/index.model");
const { SUCC, ERR } = require("../utils/response");
const admin = require("../config/firebaseAdmin");
const path = require("path");
const fs = require("fs");

const { CLIENT_KEY, SERVER_KEY } = process.env;

const snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true jika sudah produksi
    serverKey: SERVER_KEY,
    clientKey: CLIENT_KEY,
});

const VerifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;

        const user = await User.findOne({ email });
        if (!user) return ERR(res, 404, "User not found");

        return SUCC(res, 200, user, "Email registered");
    } catch (error) {
        console.error(error);
        return ERR(res, 401, "Token tidak valid");
    }
}

const CheckEmail = async (req, res) => {
    const email = req.params.email;

    try {
        if (!email) return ERR(res, 400, "Email is required");

        const user = await User.findOne({ email });
        if (!user) return ERR(res, 404, "Email not registered yet");

        return SUCC(res, 200, user, "Email registered");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error checking email");
    }
}

const SignUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    let hassPass;

    try {
        if (!name || !email) return ERR(res, 400, "Name and email is required");

        if (password) hassPass = await argon2.hash(password);

        const userName = await User.findOne({ name });
        if (userName) return ERR(res, 409, "Name alredy exists");

        const user = await User.findOne({ email });
        if (user) return ERR(res, 409, "Email already exists");

        const addNewUser = new User({ name, email, password: hassPass });
        await addNewUser.save();

        return SUCC(res, 201, addNewUser._id, "User created succesfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, error);
    }
}

const SignInUser = async (req, res) => {
    const { email, password, token } = req.body;

    try {
        if(!email || !token) return ERR(res, 400, "Email and token is required");

        let user = await User.findOne({ email });
        if (!user) return ERR(res, 404, "User not found");

        if (password) {
            const decodedPass = await argon2.verify(user.password, password);
            if (!decodedPass) return ERR(res, 401, "Invalid password");
        }
        
        user.token = token;
        await user.save();

        return SUCC(res, 200, user, "Success signing in token")
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error signing in token")
    }
}

const SignOutUser = async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email });
        
        user.token = null;
        await user.save();

        return SUCC(res, 204, null, "Success signing out token")
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error signing out token")
    }
}

const AddDonation = async (req, res) => {
    // const data = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const { title, desc, targetAmount, createdBy, deadline } = req.body;

    try {
        // if (!data) return ERR(res, 400, "Data not found");
        if (!title || !desc || !targetAmount || !createdBy) {
            return ERR(res, 400, "All fields are required");
        }

        // const newDonation = new Donation(data);
        const newDonation = new Donation({
            title,
            desc,
            targetAmount,
            createdBy,
            image: imageUrl,
            deadline,
        });
        await newDonation.save();

        return SUCC(res, 201, newDonation, "Donation created succesfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Donation created failed");
    }
}

const GetDonation = async (req, res) => {
    try {
        const donations = await Donation.find().populate("createdBy donors.userId");
        return SUCC(res, 200, donations, "Success getting data");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
};

const GetDonationById = async (req, res) => {
    const donationId = req.params.id;

    try {
        if (!donationId) return ERR(res, 400, "Data not found");

        const donation = await Donation.findById(donationId).populate("createdBy donors.userId");
        if (!donation) return ERR(res, 404, "Donation not found");
        
        return SUCC(res, 200, donation, "Success getting data");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
}

const UpdateDonation = async (req, res) => {
    const donationId = req.params.id;
    const data = req.body;
    const image = req.file;

    try {
        if (!donationId || !data) return ERR(res, 400, "Data not found");

        const donation = await Donation.findById(donationId);
        if (!donation) return ERR(res, 404, "Donation not found");

        if (donation.image && image) {
            const imagePath = path.join(__dirname, "..", donation.image);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
        }

        if (image) {
            data.image = "/uploads/" + image.filename;
        }

        const updateDonation = await Donation.findByIdAndUpdate(donationId, data, { new: true });
        return SUCC(res, 201, updateDonation, "Update Success");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Update Error");
    }
};

const DeleteDonation = async (req, res) => {
    const donationId = req.params.id;

    try {
        if (!donationId) return ERR(res, 400, "Data not found");

        // Cari donasi yang akan dihapus
        const donation = await Donation.findById(donationId);
        if (!donation) return ERR(res, 404, "Donation not found");

        // Jika ada gambar, hapus gambar dari folder uploads
        if (donation.image) {
            const imagePath = path.join(__dirname, "..", donation.image);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
        }

        // Hapus donasi dari database
        await Donation.findByIdAndDelete(donationId);

        return SUCC(res, 200, null, "Donation removed successfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Remove Error");
    }
};

const AddTransaction = async (req, res) => {
    const { orderId, amount, email } = req.body;
    try {

        const transactionDetails = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount
            },
            customer_details: {
                email: email,
            },
            callbacks: {
                finish: "http://localhost:5173" // Finish Redirect URL
            }
        };

        const transaction = await snap.createTransaction(transactionDetails);
        res.json({ token: transaction.token });
    } catch (error) {
        console.error(error);
        return ERR(500, "Create transaction failed");
    }
}

const AddArticle = async (req, res) => {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const { title, content, createdBy, tags } = req.body;

    try {
        if (!title || !content || !createdBy || !tags) {
            return ERR(res, 400, "Data not found");
        }

        const newArticle = new Article({
            title,
            content,
            createdBy,
            image: imageUrl,
            tags
        })
        await newArticle.save();

        return SUCC(res, 201, newArticle, "Article created succesfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Internal server error");
    }
};

const GetArticle = async (req, res) => {
    try {
        const articles = await Article.find().populate("createdBy");
        return SUCC(res, 200, articles, "Success getting data");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Error getting data");
    }
};

const GetArticleById = async (req, res) => {
    const articleId = req.params.id;

    try {
        if (!articleId) return ERR(res, 200, "Data not found");

        const article = await Article.findById(articleId).populate("createdBy");
        if (!article) return ERR(res, 404, "Article not found");

        return SUCC(res, 200, article, "Success getting data");
    } catch (error) {
        console.error(error);
        return (res, 500, "Error getting data");
    }
};

const UpdateArticle = async (req, res) => {
    const articleId = req.params.id;
    const data = req.body;
    const image = req.file;

    try {
        if (!articleId || !data) return ERR(res, 400, "Data not found");

        const article = await Article.findById(articleId);
        if (!article) return ERR(res, 404, "Article not found");

        if (article.image && image) {
            const imagePath = path.join(__dirname, "..", article.image);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
        }

        if (image) {
            data.image = "/uploads/" + image.filename;
        }

        const updateArticle = await Article.findByIdAndUpdate(articleId, data, { new: true });
        return SUCC(res, 201, updateArticle, "Update success");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Update error");
    }
};

const DeleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        if (!articleId) return ERR(res, 200, "Data not found");

        const article = await Article.findById(articleId);
        if (!article) return ERR(res, 404, "Article not found");

        if (article.image) {
            const imagePath = path.join(__dirname, "..", article.image);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                }
            });
        }

        await Article.findByIdAndDelete(articleId);
        return SUCC(res, 200, null, "Article removed succesfully");
    } catch (error) {
        console.error(error);
        return ERR(res, 500, "Remove error");
    }
};

module.exports = {
    VerifyToken,
    CheckEmail,
    SignUpUser, 
    SignInUser, 
    SignOutUser, 
    AddDonation, 
    GetDonation, 
    GetDonationById, 
    UpdateDonation, 
    DeleteDonation,
    AddTransaction,
    AddArticle,
    GetArticle,
    GetArticleById,
    UpdateArticle,
    DeleteArticle,
}