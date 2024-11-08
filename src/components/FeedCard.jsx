import React from "react";

const FeedCard = ({ user }) => {
  const {firstName, lastName, photoUrl, skills, about, age, gender} = user;
  return (
    <div className="card bg-neutral-content w-96 shadow-xl">
      <figure>
        <img src={photoUrl} className="h-72 w-fit" alt="UserProfile" />
      </figure>
      <div className="card-body text-black ">
        <h2 className="card-title font-extrabold">{firstName + " " + lastName}</h2>
        <p className="font-semibold">{age + ", " + gender}</p>
        <p className="font-bold">{about}</p>
        <p className="font-semibold">Skills: {skills}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary font-bold">Ignore</button>
          <button className="btn btn-secondary font-bold">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
