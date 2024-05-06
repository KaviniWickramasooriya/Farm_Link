import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../components/card/Card";
import axios from "axios";
import GlobalStyles from '../../GlobalStyles';
import "./BiddingForm.scss";

const BiddingForm = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") setDescription(value);
    if (name === "location") setLocation(value);
    if (name === "category") setCategory(value);
    if (name === "title") setTitle(value);
    if (name === "startingPrice") setStartingPrice(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveBidding = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("startingPrice", startingPrice);
      formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/buyer/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data); // Assuming the backend returns the saved bidding data

      // Redirect to /addBidding after successful submission
      //history.push('/addBidding');
    } catch (error) {
      console.error("Error saving bidding:", error);
      // Optionally, you can display an error message to the user
    }
  };


  return (
    <div className="add-bidding">
        <GlobalStyles/>      
      <Card cardClass={"card"}>
      <h3 style={{alignSelf:'center'}}>Add A Bidding</h3>
        <form onSubmit={saveBidding}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />

          <label>Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={BiddingForm.modules}
            formats={BiddingForm.formats}
          />

          <label>Location:</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleInputChange}
          />

          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
          </select>

          <Card cardClass={"group"}>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="bidding" />
              </div>
            )}
          </Card>

          <label>Starting Price:</label>
          <input
            type="number"
            placeholder="Starting Price"
            name="startingPrice"
            value={startingPrice}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Submit Bidding
            </button>
          </div>
        </form>
      </Card>
    </div>  
  );
};

BiddingForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
BiddingForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default BiddingForm;
