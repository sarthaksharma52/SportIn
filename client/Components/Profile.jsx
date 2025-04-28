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
      const res = await fetch("http://localhost:3000/api/profile/save", {
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
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            required
          />

          <textarea
            placeholder="A short description about you"
            value={profile.description}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            onChange={(e) =>
              setProfile({ ...profile, skills: e.target.value.split(",") })
            }
            required
          />

          <h3>Education</h3>
          {profile.education.map((edu, idx) => (
            <div
              key={idx}
              style={{ border: "1px solid #ccc", padding: "0.5rem", marginBottom: "0.5rem" }}
            >
              <input
                type="text"
                placeholder="School Name"
                value={edu.schoolName}
                onChange={(e) => updateEdu(idx, "schoolName", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Course Year"
                value={edu.courseYear}
                onChange={(e) => updateEdu(idx, "courseYear", e.target.value)}
                required
              />
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => updateEdu(idx, "startDate", e.target.value)}
                required
              />
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => updateEdu(idx, "endDate", e.target.value)}
                required
              />
            </div>
          ))}

          <button type="button" onClick={addEducationField}>
            + Add Education
          </button>
          <br />
          <button type="submit">Save Profile</button>
        </form>
      ) : (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>

          <h3>Skills</h3>
          <ul>
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>

          <h3>Education</h3>
          {profile.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <p><strong>School:</strong> {edu.schoolName}</p>
              <p><strong>Course Year:</strong> {edu.courseYear}</p>
              <p>
                <strong>Duration:</strong> {edu.startDate} to {edu.endDate}
              </p>
            </div>
          ))}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
