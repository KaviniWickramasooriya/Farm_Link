const express= require("express");
const router= express.Router();
const { upload } = require("../Utills/fileupload");
// const {dele}

const {
    addPost,
    getAllPosts,
    getPostDetails,
    getBiddingDetailsByCategory,
    getBiddingsById

    // deleteItem
  } = require("../Controllers/BuyerReqController");

router.get("/getAllPosts", getAllPosts);
router.post("/createPost", upload.single("image"), addPost);
router.get("/getPost/:id", getPostDetails);
router.get("/category/:category", getBiddingDetailsByCategory);
router.get('/user-biddings/:id',getBiddingsById);
//router.delete("/delete/:id", deleteItem);

module.exports=router;