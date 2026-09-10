import { useState, useEffect } from 'react';
import StudentCard from '../components/StudentCard';

const API_URL = 'http://localhost:5000/api/students';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to load students');
      const data = await response.json();
      setStudents(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete student');
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setEditForm(student);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${editingStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) throw new Error('Failed to update student');
      const updated = await response.json();
      setStudents(students.map((s) => (s._id === updated._id ? updated : s)));
      setEditingStudent(null);
      setEditForm(null);
    } catch (err) {
      setError(err.message);
    }
  }

  const courses = [...new Set(students.map((s) => s.course))];
  const filteredStudents = students
    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((s) => (courseFilter ? s.course === courseFilter : true));

  return (
    <section className="section container">
      <div className="section-title">
        <h2>Registered Students</h2>
        <p>All students currently registered on LearnHub</p>
      </div>

      {editingStudent && (
        <div className="form-box" style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 16 }}>Edit Student</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={editForm.name} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={editForm.email} onChange={handleEditChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input name="age" type="number" value={editForm.age} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input name="city" value={editForm.city} onChange={handleEditChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Course</label>
                <input name="course" value={editForm.course} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={editForm.phone} onChange={handleEditChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update Student</button>
            <button
              type="button"
              className="btn btn-small"
              style={{ marginLeft: 10 }}
              onClick={() => setEditingStudent(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="count-badge">{filteredStudents.length} Students</span>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && !error && filteredStudents.length === 0 && (
        <p>No students found.</p>
      )}

      {!loading && !error && (
        <div className="grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Students;
