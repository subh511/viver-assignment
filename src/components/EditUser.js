import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = ({ userId }) => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${userId}`)
      .then((response) => {
        const { email, first_name, last_name } = response.data.data;
        setFormData({ email, first_name, last_name });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    axios
      .put(`https://reqres.in/api/users/${userId}`, formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("User information updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to update user information.");
      });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
