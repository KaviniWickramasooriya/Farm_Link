import React, { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../components/card/Card";
import axios from 'axios';
import GlobalStyles from '../../GlobalStyles';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "./BiddingForm.scss";

function UpdateBiddingForm() {
    const { id } = useParams(); // Access the bidding ID from URL parameter
    const navigate = useNavigate(); // Get the navigate function
    const [bidding, setBidding] = useState({
        _id: "", // Add _id field to the initial state
        title: "",
        location: "",
        category: "",
        image: "",
        startingPrice: "",
        description: "",
    });

    useEffect(() => {
        if (id) {
            fetchBidding(id);
        }
    }, [id]);

    const fetchBidding = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/buyer/getPost/${id}`);
            const { _id, title, location, category, image, startingPrice, description } = response.data.bidding;
            setBidding({
                _id,
                title,
                location,
                category,
                //image: image.filePath, // Assuming filePath is the URL of the image
                startingPrice,
                description,
            });
        } catch (error) {
            console.error('Error fetching bidding:', error);
        }
    };

    /*const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBidding(prevState => ({
            ...prevState,
            [name]: value
        }));
    };*/
    const handleInputChange = (e) => {
      // Check if e exists and e.target is defined
      if (e && e.target) {
          const { name, value } = e.target;
          setBidding(prevState => ({
              ...prevState,
              [name]: value
          }));
      }
  };
  

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!bidding._id) {
            console.error("Bidding ID is undefined.");
            console.log(`Bidding id ${bidding._id}`)
            return; // Skip the update if _id is undefined
        }
        console.log("Bidding data:", bidding); // Log the bidding object
        axios.put(`http://localhost:5000/api/buyer/update/${bidding._id}`,bidding)
            .then((res) => {
                toast.success("Bidding updated successfully");
                console.log("Updated");
                // Navigate to addBidding page after successful update
                navigate('/addBidding');
            })
            .catch((err) => {
                console.error("Error updating Bidding:", err);
                toast.error("Error occurred while updating Bidding. Please try again later.");
            });
    };
  

    return (
        <div className="add-bidding">
            <GlobalStyles/>
            <Card cardClass={"card"}>
                <h2 style={{alignSelf:'center'}}>Edit Bidding</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={bidding.title}
                        onChange={handleInputChange}
                    />

                    <label>Description:</label>
                    <ReactQuill
                        theme="snow"
                        value={bidding.description}
                        //onChange={(value) => setBidding(prevState => ({ ...prevState, description: value }))}
                        onChange={handleInputChange}
                        modules={UpdateBiddingForm.modules}
                        formats={UpdateBiddingForm.formats}
                    />

                    <label>Location:</label>
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={bidding.location}
                        onChange={handleInputChange}
                    />

                    <label>Category:</label>
                    <select
                        name="category"
                        value={bidding.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Grain">Grain</option>
                    </select>

                    

                    <label>Starting Price:</label>
                    <input
                        type="number"
                        placeholder="Starting Price"
                        name="startingPrice"
                        value={bidding.startingPrice}
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
}

UpdateBiddingForm.modules = {
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
UpdateBiddingForm.formats = [
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

export default UpdateBiddingForm;
