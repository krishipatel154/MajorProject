import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8089/user/user-info", {
        headers,
      });
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.targer;
    setValue({ ...value, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await axios.put("http://localhost:8089/user/user-info");
  };
  return (
    <div>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="p-0 h-[100%] md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor=""></label>
              <p className="mt-2 p-2 rounded bg-zinc-800 font-semibold">
                {profileData.FirstName}
              </p>
            </div>
            <div>
              <label htmlFor=""></label>
              <p className="mt-2 p-2 rounded bg-zinc-800 font-semibold">
                {profileData.Email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              rows="5"
              placeholder="Address"
              className="mt-2 p-2 rounded bg-zinc-800 font-semibold"
              id=""
              value={value.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 duration-300 transaction-all"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
