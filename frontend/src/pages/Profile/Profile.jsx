import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader/Loader";
import axios from "axios";
const Profile = () => {
  // const isLoggedIn = usSelector();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const fetch = async () => {
      const response = await axios.get("http://localhost:8089/user/user-info", {
        headers,
      });
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 md:px-12 px-2 flex md:flex-row flex-col w-full h-screen py-8 text-white">
      {!profile ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="md:w-1/6 w-full">
            <Sidebar data={profile} />
          </div>
          <div className="w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
