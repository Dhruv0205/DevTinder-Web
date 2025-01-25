import React from "react";
import { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || " ");
  const [lastName, setLastName] = useState(user.lastName || " ");
  const [age, setAge] = useState(user.age || " ");
  const [photoUrl, setPhotoURL] = useState(user.photoUrl || " ");
  const [skills, setSkills] = useState(user.skills || " ");
  const [about, setAbout] = useState(user.about || " ");
  const [gender, setGender] = useState(user.gender || " ");
  const [error, setError] = useState(" ");
const[toast, setToast]=useState(false);

  const dispatch = useDispatch();

  const saveHandler = async () => {
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:205/profile/edit",
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
    <div className="flex justify-center">
      <div>
        <div className="card bg-neutral-content w-[150%] shadow-xl  my-[15%]">
          <div className="card-body">
            <h2 className="card-title text-black mx-auto text-3xl font-bold ">
              Edit Profile
            </h2>
            <div>
              <h1 className="text-black">FirstName:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={firstName}
                className="grow"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <div>
              <h1 className="text-black">LastName:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={lastName}
                className="grow"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
            <div>
              <h1 className="text-black">Age:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={age}
                className="grow"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </label>
            <div>
              <h1 className="text-black">Gender:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={gender}
                className="grow"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </label>
            <div>
              <h1 className="text-black">PhotoUrl:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={photoUrl}
                className="grow"
                onChange={(e) => {
                  setPhotoURL(e.target.value);
                }}
              />
            </label>
            <div>
              <h1 className="text-black">Skills:</h1>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
                className="grow"
              />
            </label>

            <div>
              <h1 className="text-black">About:</h1>
            </div>
            <textarea
              className="textarea textarea-primary"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            ></textarea>

            <p className="text-red-600 font-semibold">{error}</p>

            <div className="card-actions justify-center mt-10">
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
      <div className="mx-[13%] mt-[10%]">
        <FeedCard
          user={{ firstName, lastName, age, photoUrl, skills, about, gender }}
        />
      </div>
    </div>

   {toast && (<div class="toast toast-top toast-center">
  <div class="alert alert-success">
    <span>Profile edited successfully.</span>
  </div>
</div>)}
    </>
  );
};

export default EditProfile;
