import React from "react";
import { useNavigate } from "react-router-dom";

function Volunter({ volunter }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${volunter._id}`)}
    >
      <h1 className="card-title">
        {volunter.name} 
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {volunter.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {volunter.address}
      </p>
      <p>
        <b>Timings : </b>
        {volunter.timings[0]} - {volunter.timings[1]}
      </p>
    </div>
  );
}

export default Volunter;