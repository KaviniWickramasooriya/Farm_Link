import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdEditSquare } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import { BsCircle } from 'react-icons/bs';
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import GlobalStyles from '../../GlobalStyles';

const AddBidding = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/buyer/getAllPosts');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const jsonData = await response.json();
          console.log('API Response:', jsonData); // Log the API response
          setData(jsonData.response); // Update to access jsonData.response
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
     // Empty dependency array means this effect runs once after initial render
  
    console.log('Data state:', data); // Log the state of data for debugging
  
    return (
      <div style={{ color: 'black' }}>
            <GlobalStyles/>
          
        <h1 style={{ textAlign: 'center' }}>Bidding List</h1>
  
        <div className="btnn" style={{marginLeft:'200px'}}>
        <Link to="/biddingForm">
        <Button variant="primary" className="m-1" style={{display:'flex', gap:'20px'}}>
              <IoMdAddCircleOutline className="mb-1" style={{}}/> <span>Add a Bid</span>
          </Button></Link>
          
        </div>
        <div className="mt-5" style={{ zIndex: '5', width: '80%', marginTop: '100px', marginLeft: '150px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Description</th>
                <th>Category</th>
                <th>Location</th>
                <th>Title</th>
                <th>Starting Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((bidding) => (
                  <tr key={bidding._id}>
                    <td>{bidding.image ? (
                        <img src={bidding.image.filePath} alt={bidding.title} width="50" height="50" />
                      ) : (
                        <BsCircle size={30} />
                      )}</td>
                    <td>{bidding.description}</td>
                    <td>{bidding.category}</td>
                    <td>{bidding.location}</td>
                    <td>{bidding.title}</td>
                    <td>{bidding.startingPrice}</td>
                    <td>
                      <Button className="m-1 px-3" variant="danger" size="sm">
                        <AiTwotoneDelete className="mb-1 mx-1" />
                        <span>Delete</span>
                      </Button>
                      <Button className="m-1 px-3" variant="info" size="sm">
                        <MdEditSquare className="mb-1 mx-1" />
                        <span>Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
}

export default AddBidding