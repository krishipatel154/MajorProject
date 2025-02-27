import "./Course.css";

const Course = ({ course }) => {
  return (
    <>
      <div className="mt-10 mb-5 w-[250px] h-[300px] border text-center flex-column justify-center align-items-center">
        <div className="w-[80%] h-[40%] m-auto mt-2">
          <img src="../src/images/demo.webp" alt="Course image" />
        </div>
        <div className="w-[80%] h-[60%] m-auto">
          <div className="flex-column">
            {/* <div className="rating-sect">
              <p>Veiw</p>
              <p>Rating</p>
            </div> */}
            <div className="text-xl font-bold pt-1 pb-1">
              <h3 className="course-name">{course.Name}</h3>
            </div>
            <div className="text-lg font-medium">
              <p className="faculty-name">{course.Faculty}</p>
            </div>
            <div className="price-sect">
              <p className="price">${course.Price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
