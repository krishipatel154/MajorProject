import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-back via-back to-back dark:from-gray-900 dark:via-gray-900 dark:to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-indigo-500 rounded"></div>
              EduPlatform
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering learners worldwide with quality courses and resources for skill development and personal growth.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition transform hover:scale-110">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition transform hover:scale-110">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition transform hover:scale-110">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition transform hover:scale-110">
                <FaTelegramPlane size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded"></div>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-indigo-400 transition">
                  Books & Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded"></div>
              Support
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <FaHeadset size={14} /> Help & FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded"></div>
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" />
                <span>123 Learning Street, Education City, EC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-indigo-400" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400" />
                <span>support@eduplatform.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} EduPlatform. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-indigo-400 transition">
              Privacy
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-400 transition">
              Terms
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Background Effect */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
