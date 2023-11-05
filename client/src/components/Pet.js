import React from "react";
import { useNavigate } from "react-router-dom";

function Pet({ pet }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/details-pet/${pet._id}`)}
    >
      <h1 className="card-title">
        {pet.name} 
      </h1>
      <hr />
      <div className="pet-image">
        <img
          src={pet.profilePic} 
          
        />
      </div>
      {/* <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p> */}
    </div>
  );
}

export default Pet;