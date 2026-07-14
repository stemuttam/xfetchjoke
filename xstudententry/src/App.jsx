import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      student.name.trim() === "" ||
      student.age.trim() === "" ||
      student.grade === ""
    )
      return;

    setStudents([...students, student]);

    setStudent({
      name: "",
      age: "",
      grade: "",
    });
  };

  const handleClear = () => {
    setStudent({
      name: "",
      age: "",
      grade: "",
    });
  };

  const removeStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  return (
    <div className="container">

      <h1>Student Entry Form</h1>

      <p>Add students and review the list below.</p>

      <form onSubmit={handleSubmit}>

        <label>Name</label>

        <input
          type="text"
          name="name"
          placeholder="e.g. MS Dhoni"
          value={student.name}
          onChange={handleChange}
        />

        <label>Age</label>

        <input
          type="number"
          name="age"
          placeholder="e.g. 14"
          value={student.age}
          onChange={handleChange}
        />

        <label>Grade</label>

        <select
          name="grade"
          value={student.grade}
          onChange={handleChange}
        >
          <option value="">Select grade</option>

          {[1,2,3,4,5,6,7,8,9,10,11,12].map((g)=>(
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <div className="buttons">
          <button type="submit">
            Add Student
          </button>

          <button
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

      </form>

      <div className="student-list">

        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          students.map((s, index) => (
            <div className="card" key={index}>

              <div>
                <h3>{s.name}</h3>
                <p>{s.age}</p>
                <p>Class {s.grade}</p>
              </div>

              <button
                className="remove"
                onClick={() => removeStudent(index)}
              >
                Remove
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default App;