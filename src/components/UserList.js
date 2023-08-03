import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = ({ token }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUserList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div className="user-list-container">
      {userList.map((user) => (
        <div key={user.id} className="user-item">
          <img
            src={user.avatar}
            alt={`Avatar of ${user.first_name} ${user.last_name}`}
          />
          <p>{`${user.first_name} ${user.last_name}`}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
