import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || " ");
  const [lastName, setLastName] = useState(user.lastName || " ");
  const [age, setAge] = useState(user.age || " ");
  const [photoUrl, setPhotoURL] = useState(user.photoUrl || " ");
  const [skills, setSkills] = useState(user.skills || " ");
  const [about, setAbout] = useState(user.about || " ");
  const [gender, setGender] = useState(user.gender || " ");
  const [error, setError] = useState(" ");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveHandler = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, skills, about, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col md:flex-row gap-10 md:gap-20 my-10 px-5 md:px-20">
        <div className="flex-1 w-full max-w-lg mx-auto mt-10 md:mt-15">
          <div className="card bg-neutral-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-black mx-auto text-3xl font-bold">Edit Profile</h2>
              
              {/* First Name */}
              <div>
                <h1 className="text-black">First Name:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={firstName}
                  className="grow"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              {/* Last Name */}
              <div>
                <h1 className="text-black">Last Name:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={lastName}
                  className="grow"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              {/* Age */}
              <div>
                <h1 className="text-black">Age:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={age}
                  className="grow"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              {/* Gender */}
              <div>
                <h1 className="text-black">Gender:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={gender}
                  className="grow"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              {/* Photo URL */}
              <div>
                <h1 className="text-black">Photo URL:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={photoUrl}
                  className="grow"
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </label>

              {/* Skills */}
              <div>
                <h1 className="text-black">Skills:</h1>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="grow"
                />
              </label>

              {/* About */}
              <div>
                <h1 className="text-black">About:</h1>
              </div>
              <textarea
                className="textarea textarea-primary w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

              <p className="text-red-600 font-semibold">{error}</p>

              {/* Save Button */}
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn btn-primary w-24 font-bold text-2xl"
                  onClick={saveHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Card */}
        <div className="flex-1 w-full max-w-lg mx-auto mt-5 md:mt-20">
          <FeedCard
            user={{ firstName, lastName, age, photoUrl, skills, about, gender }}
          />
        </div>
      </div>

      {/* Toast message */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile edited successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
