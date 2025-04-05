import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="main-footer bg-[#03506F] text-text w-full dark:bg-black">
        <div className="footer flex justify-around items-center text-white h-full">
          <div className="foot w-1/5 mt-10 h-[400px]">
            <h3 className="text-brown text-lg px-6 py-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white no-underline">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  International Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Find a Store
                </a>
              </li>
            </ul>
          </div>

          <div className="foot w-1/5 mt-10 h-[400px]">
            <h3 className="text-brown text-lg px-6 py-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white no-underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Offers & Contest Details
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Help & FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  About Tanishq
                </a>
              </li>
            </ul>
          </div>

          <div className="foot w-1/5 mt-10 h-[400px]">
            <h3 className="text-brown text-lg px-6 py-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white no-underline">
                  Write to Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  1800-266-0123
                </a>
              </li>
              <li>
                <a href="#" className="text-white no-underline">
                  Chat with Us
                </a>
              </li>
            </ul>
          </div>

          <div className="foot w-1/5 mt-10 h-[400px]">
            <h3 className="text-brown text-lg px-6 py-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#">
                  <FaFacebook className="text-white" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTwitter className="text-white" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaInstagram className="text-white" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTelegramPlane className="text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-white py-4">
          © 2025 Titan Company Limited. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
