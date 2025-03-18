import PopularBooks from "../../component/Book/PopularBooks";
import PopularCourse from "../../component/Course/PopularCourse";
import Hero from "../../component/Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <PopularCourse />
      <PopularBooks />
    </>
  );
};

export default Home;
