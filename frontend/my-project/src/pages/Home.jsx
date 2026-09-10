import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const API_URL = "https://localhost:5000/api/courses";

function Home(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchFeaturedCourses() {
            try{
                const response = await fetch(API_URL);
                const data = await response.json();
                setCourses(data.slice(0, 3));
            }
            catch(err){
                console.error("Could not load featured courses:", err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchFeaturedCourses();
    }, []);

    return(
        <div>
            <section className="hero">
                <h1>Learn New Skills, Anytime, Anywhere</h1>
                <p>
                    LearnHub is a student learning platform where you can explore real courses, register, and start building your future - one skill at a time.
                </p>
                <div className="hero-buttons">
                    <Link to="/courses" className="btn btn-accent">Explore Courses</Link>
                    <Link to="/register" className="btn btn-outline">Register Now</Link>
                </div>
            </section>
            <section className="section container">
                <div className="section-title">
                    <h2>Featured Courses</h2>
                    <p>A few of the courses our students love the most</p>
                </div>
                {loading && <p>Loading courses...</p>}
                {!loading && (
                    <div className="grid">
                        {courses.map((course)=>(
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}
            </section>
            <section className="section-container">
                <div className="section-title">
                    <h2>Why Choose LearnHub</h2>
                    <p>Everything you need to Learn, parctice, and grow</p>
                </div>
                <div className="why-us-grid">
                    <div className="why-us-card">
                        <div className="icon"></div>
                        <h3>Beginner Friendly</h3>
                        <p>Courses designed from zero, with real projects, not just theory.</p>
                    </div>
                    <div className="why-us-card">
                        <div className="icon"></div>
                        <h3>Expert Instructors</h3>
                        <p>"Learn from instructors who build reel software everyday.</p>
                    </div>
                    <div className="why-us-card">
                        <div className="icon"></div>
                        <h3>Hands-On Practice</h3>
                        <p>Every Course includes practical tasks and reel project work.</p>
                    </div>
                    <div className="why-us-card">
                        <div className="icon"></div>
                        <h3>Career Growth</h3>
                        <p>Build the exact skills employers are looking for today.</p>
                    </div>
                </div>
            </section>
            <section className="stats">
                <div>
                    <h3>6+</h3>
                    <p>Courses Available</p>
                </div>
                <div>
                    <h3>500+</h3>
                    <p>Students Enrolled</p>
                </div>
                <div>
                    <h3>10+</h3>
                    <p>Expert Instructors</p>
                </div>
                <div>
                    <h3>95%</h3>
                    <p>Satisfation Rate</p>
                </div>
            </section>
        </div>
    );
}
export default Home;