import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const location = useLocation();

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  const variants = {
    initial: {
      opacity: 0,
      y: "-100vh",
    },
    animate: {
      opacity: 1,
      y: 0,
      transition,
    },
    exit: {
      opacity: 0,
      y: "100vh",
      transition,
    },
  };

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="flex flex-col items-center justify-center min-h-screen bg-white"
    >
      <motion.h1
        className="text-8xl font-bold tracking-wide text-black"
        variants={variants}
      >
        404
      </motion.h1>
      <motion.p
        className="text-3xl font-semibold text-black"
        variants={variants}
      >
        Page Not Found!
      </motion.p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 text-black font-semibold text-lg transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900"
      >
        Back To Home
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;

