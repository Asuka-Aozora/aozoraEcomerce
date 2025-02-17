import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-900 py-6 px-4 text-center border-t border-gray-200 pt-4 w-full mt-5"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 ">
        <h2 className="text-lg font-semibold text-gray-900">Stay Connected</h2>
        <div className="flex gap-4 text-xl text-gray-900">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            className="hover:text-blue-500"
          >
            <FaFacebook className="text-gray-900" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            className="hover:text-blue-400"
          >
            <FaTwitter className="text-gray-900" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            className="hover:text-pink-500"
          >
            <FaInstagram className="text-gray-900" />
          </motion.a>
        </div>
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Hanamirai. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};


