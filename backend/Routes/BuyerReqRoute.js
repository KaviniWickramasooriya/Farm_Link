const express = require("express");
const router = express.Router();
const { upload } = require("../Utills/fileupload");
const BuyerReq = require("../Models/BuyerReqModel");

const {
    addPost,
    getAllPosts,
    getPostDetails,
    getBiddingDetailsByCategory,
    getBiddingsById,
    updatePost
} = require("../Controllers/BuyerReqController");

router.get("/getAllPosts", getAllPosts);
router.post("/createPost", upload.single("image"), addPost);
router.get("/getPost/:id", getPostDetails);
router.get("/category/:category", getBiddingDetailsByCategory);
router.get('/user-biddings/:id', getBiddingsById);
router.put("/update/:id", updatePost);


// DELETE delete bidding by ID
router.delete("/delete/:_id", async (req, res) => {
    const _id = req.params._id;
    try {
        const deletedBidding = await BuyerReq.findByIdAndDelete(_id);
        if (!deletedBidding) {
            return res.status(404).json({ error: "Bidding not found" });
        }
        res.json({ status: "Bidding deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting bidding" });
    }
});

module.exports = router;