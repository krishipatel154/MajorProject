import LiveStream from "./LiveStream";

const Course = ({ course, isTeacher }) => {
  return (
    <div className="course-container">
      {course.isLive && (
        <LiveStream courseId={course._id} isTeacher={isTeacher} />
      )}
      {/* ... existing course content ... */}
    </div>
  );
};

export default Course;
