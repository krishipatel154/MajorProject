import "./Course.css";

const Course = ({ course }) => {
  return (
    <>
      <div className="mt-10 mb-5 w-[250px] h-[300px] border">
        <div className="course-container-upper">
          <img src="../src/images/demo.webp" alt="Course image" />
        </div>
        <div className="course-container-bottom">
          <div className="course-container-bottom-inner">
            <div className="rating-sect">
              <p>Veiw</p>
              <p>Rating</p>
            </div>
            <div className="course-name-sect">
              <h3 className="course-name">{course.Name}</h3>
            </div>
            <div className="faculty-name-sect">
              <p className="faculty-name">{course.Author}</p>
            </div>
            <div className="price-sect">
              <p className="price">{course.Price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
