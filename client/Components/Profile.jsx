import React, { useState } from "react";

const Profile = ({ userId }) => {
  const [editing, setEditing] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    skills: [],
    education: [
      { schoolName: "", courseYear: "", startDate: "", endDate: "" },
    ],
  });

  const updateEdu = (index, field, value) => {
    const updatedEdu = [...profile.education];
    updatedEdu[index][field] = value;
    setProfile({ ...profile, education: updatedEdu });
  };

  const addEducationField = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        { schoolName: "", courseYear: "", startDate: "", endDate: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://sportin.onrender.com/api/profile/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, userId }),
      });
      const data = await res.json();
      setProfile(data);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="container py-4">
      {editing ? (
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          <h2 className="mb-4">Edit Profile</h2>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="A short description about you"
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              placeholder="Skills (comma separated)"
              onChange={(e) =>
                setProfile({ ...profile, skills: e.target.value.split(",") })
              }
              required
            />
          </div>

          <h4 className="mt-4">Education</h4>
          {profile.education.map((edu, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-light">
              <div className="mb-2">
                <label className="form-label">School Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="School Name"
                  value={edu.schoolName}
                  onChange={(e) => updateEdu(idx, "schoolName", e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Course Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Year"
                  value={edu.courseYear}
                  onChange={(e) => updateEdu(idx, "courseYear", e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={edu.startDate}
                  onChange={(e) => updateEdu(idx, "startDate", e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={edu.endDate}
                  onChange={(e) => updateEdu(idx, "endDate", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addEducationField}
            >
              + Add Education
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </form>
      ) : (
        <div className="card p-4 shadow">
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>

          <h4 className="mt-4">Skills</h4>
          <ul className="list-group mb-3">
            {profile.skills.map((skill, index) => (
              <li key={index} className="list-group-item">
                {skill.trim()}
              </li>
            ))}
          </ul>

          <h4>Education</h4>
          {profile.education.map((edu, idx) => (
            <div key={idx} className="border rounded p-3 mb-3">
              <p><strong>School:</strong> {edu.schoolName}</p>
              <p><strong>Course Year:</strong> {edu.courseYear}</p>
              <p>
                <strong>Duration:</strong> {edu.startDate} to {edu.endDate}
              </p>
            </div>
          ))}

          <button
            className="btn btn-secondary"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
