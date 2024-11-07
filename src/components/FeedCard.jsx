import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, photoUrl, skills } = user;
  return (
    <div className="card bg-neutral-content w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="UserProfile" />
      </figure>
      <div className="card-body text-black">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p></p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
