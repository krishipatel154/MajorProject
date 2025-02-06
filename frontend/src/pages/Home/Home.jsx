import Course from "../../component/Course/Course";
import HeroSection from "../../component/HeroSection/HeroSection";
import LanguagesNav from "../../component/LanguagesNav/LanguagesNav";
import Navbar from "../../component/Navbar/Navbar";
import PopularCourses from "../../component/PopularCourses/PopularCourses";

const Home = () => {
  return (
    <>
      <hr className="w-[100%] h-[2px] bg-black border-0 dark:bg-gray-700" />
      <LanguagesNav />
    </>
  );
};

export default Home;
