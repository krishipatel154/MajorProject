import React from "react";
import { RxCross1 } from "react-icons/rx";
const SeeUserData = ({ userDiv, userDivData, setUserDiv }) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
      ></div>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex justify-center items-center`}
      >
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setUserDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              User Name:
              <span className="font-semibold">{userDivData.FirstName}</span>
            </label>
          </div>

          <div className="mt-2">
            <label htmlFor="">
              User Email:
              <span className="font-semibold">{userDivData.Email}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
