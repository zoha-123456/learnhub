function StudentCard({student, onEdit, onDelete}){
    return(
        <div className="student-card">
            <h3>{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Age: {student.age}</p>
            <p>City: {student.city}</p>
            <p>Course: {student.course}</p>
            <p>{student.phone}</p>
            <div className="student-card-actions">
                <button className="btn btn-accent btn-small" onClick={()=>onEdit(student)}>
                    Edit
                </button>
                <button className="btn btn-danger btn-small" onClick={()=>onDelete(student._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
export default StudentCard;