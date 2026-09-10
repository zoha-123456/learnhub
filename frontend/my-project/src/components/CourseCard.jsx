import { Link } from "react-router-dom";

function CourseCard({course}){
    return(
        <div className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-card-body">
                <span className="course-category">{course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.description.slice(0, 80)}...</p>
                <div className="course-meta">
                    <span>{course.instructor}</span>
                    <span>{course.duration}</span>
                </div>
                <div className="course-meta">
                    <span className="course-price">${course.price}</span>
                    <Link to={`/courses/${course._id}`} className="btn btn-primary btn-small">
                    View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default CourseCard;