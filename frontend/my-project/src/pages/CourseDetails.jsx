import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://localhost:5000/api/courses";

function CourseDetails(){
    const {id} = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCourse(){
            try{
                setLoading(true);
                const response = await fetch (`${API_URL}/${id}`);
                if(!response.ok) throw new Error("Course not found");
                const data = await response.json();
                setCourse(data);
                setError("");
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    if(loading) return <p className="container">Loading course....</p>;
    if (error) return <p className="container error-msg">{error}</p>;
    if (!course) return null;

    return(
        <section className="container">
            <div className="course-details">
                <img src={course.image} alt={course.title} />
                <div className="course-details-body">
                    <span className="course-category">{course.category}</span>
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>

                    <div className="course-details-meta">
                        <div><span>Instructor</span><strong>{course.instructor}</strong></div>
                        <div><span>Duration</span><strong>{course.duration}</strong></div>
                        <div><span>Level</span><strong>{course.level}</strong></div>
                        <div><span>Price</span><strong>{course.price}</strong></div>
                    </div>
                    <Link to="/register" className="btn btn-primary">Enroll Now</Link>
                </div>
            </div>
        </section>
    );
}
export default CourseDetails;