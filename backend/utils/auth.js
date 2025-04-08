// const { User } = require("../models/index.model");
// const { ERR } = require("./response");

// const checkToken = async (req, res, next) => {
//     const email = req.body.email || req.params.email;
//     const token = req.body.token || req.params.token;

//     if (!email || !token) {
//         return ERR(res, 400, "Error, No Data Provided");
//     }

//     try {
//         const user = await User.findOne({ email, token });
//         if (!user) {
//             return ERR(res, 401, "Error, Unauthorized");
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         return ERR(res, 500, "Error, Internal Server Error");
//     }
// };

// module.exports = { checkToken };

const { ERR } = require("./response");
const admin = require("../config/firebaseAdmin");

const checkToken = async (req, res, next) => {
    const token =  req.headers.authorization?.split(" ")[1];

    if (!token) return ERR(res, 401, "Unauthorized: No Token Provided");

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();

    } catch (error) {
        return ERR(res, 401, "Invalid or expired token")
    }
}

module.exports = { checkToken }