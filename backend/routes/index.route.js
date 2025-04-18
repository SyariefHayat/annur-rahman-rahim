const router = require("express").Router();
const { checkToken } = require("../utils/auth");
const upload = require('../middlewares/upload');
const userController = require("../controllers/index.controller");

router.get("/", (req, res) => {
    res.send("Server is running!");
})

router.post("/verify-token", userController.VerifyToken);

router.post("/sign-up", userController.SignUpUser);
router.post("/sign-in", userController.SignInUser);
router.get("/check-user/:email", userController.CheckEmail);
router.delete("/sign-in", checkToken, userController.SignOutUser);

router.put("/update-user/:id", checkToken, userController.UpdateUser);
router.post("/update-user-password/:id", checkToken, userController.UpdatePassword);

router.post("/notification", checkToken, userController.AddNotification);
router.get("/notification/:userId", checkToken, userController.GetNotification);
router.delete('/notification/:userId/:notificationId', checkToken, userController.DeleteNotification);

router.post("/donation", checkToken, upload.single('image'), userController.AddDonation);
router.get("/donation", userController.GetDonation);
router.get("/donation/:id", userController.GetDonationById);
router.put("/donation/:id", checkToken, upload.single('image'), userController.UpdateDonation);
router.delete("/donation/:id", checkToken, userController.DeleteDonation);

router.post("/create-transaction", userController.AddTransaction);

router.post("/article", checkToken, upload.fields([{ name: "cover", maxCount: 1 }, { name: "image", maxCount: 5 }]), userController.AddArticle);
router.get("/article", userController.GetArticle);
router.get("/article/:id", userController.GetArticleById);
router.post("/article/like/:id", checkToken, userController.LikeArticle);
router.post("/article/share/:id", checkToken, userController.ShareArticle);
router.put("/article/:id", upload.single('image'), userController.UpdateArticle);
router.delete("/article/:id", userController.DeleteArticle);

module.exports = router;