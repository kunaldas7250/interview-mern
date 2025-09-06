
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import "../css/ResumeForm.css";

const Resume_builder_form = () => {
  const [resumeData, setResumeData] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      educations: [{ education: "" }],
      skills: [{ skill: "" }],
    },
  });

  const { fields: eduFields, append: addEducation, remove: removeEducation } =
    useFieldArray({ control, name: "educations" });

  const { fields: skillFields, append: addSkill, remove: removeSkill } =
    useFieldArray({ control, name: "skills" });

  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.photo && data.photo[0]) formData.append("photo", data.photo[0]);

      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("phonenumber", data.phonenumber);
      formData.append("experience", data.experience);
      formData.append("educations", JSON.stringify(data.educations));
      formData.append("skills", JSON.stringify(data.skills));

      const response = await axios.post("http://localhost:4000/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      setResumeData((prev) => [
        ...prev,
        {
          ...response.data,
          educations: response.data.educations || [],
          skills: response.data.skills || [],
        },
      ]);

      reset();
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/resume/${id}`);
      setResumeData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

 
  const handleView = (item) => {
    alert(`
      ID: ${item.id}
      Name: ${item.firstname} ${item.lastname}
      Education: ${Array.isArray(item.educations)
        ? item.educations.map((e) => e.education).join(", ")
        : ""}
      Experience: ${item.experience}
      Skills: ${Array.isArray(item.skills)
        ? item.skills.map((s) => s.skill).join(", ")
        : ""}
    `);
  };

  
const handleUpdate = async (item) => {
  try {
    
    const updatedItem = {
      ...item,
      educations: item.educations || [],
      skills: item.skills || [],
    };

    const response = await axios.put(
      `http://localhost:4000/resume/${item.id}`,
      updatedItem,
      { headers: { "Content-Type": "application/json" } }
    );

    setResumeData((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? response.data 
          : r
      )
    );
  } catch (error) {
    console.error("Update failed", error);
  }
};



  
  const handleDownload = (item) => {
    const blob = new Blob(
      [
        `ID: ${item.id}\n` +
          `Name: ${item.firstname} ${item.lastname}\n` +
          `Education: ${Array.isArray(item.educations)
            ? item.educations.map((e) => e.education).join(", ")
            : ""}\n` +
          `Experience: ${item.experience}\n` +
          `Skills: ${Array.isArray(item.skills)
            ? item.skills.map((s) => s.skill).join(", ")
            : ""}\n`,
      ],
      { type: "text/plain" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${item.firstname}_resume.txt`;
    link.click();
  };

  return (
    <motion.div
      className="parentform"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="resume-form"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <h2>Resume Builder</h2>

        <label>Photo</label>
        <input type="file" {...register("photo")} />

        <label>First Name:</label>
        <input {...register("firstname", { required: "First name is required" })} />
        {errors.firstname && <span>{errors.firstname.message}</span>}

        <label>Last Name:</label>
        <input {...register("lastname", { required: "Last name is required" })} />
        {errors.lastname && <span>{errors.lastname.message}</span>}

        <label>Phone Number:</label>
        <input {...register("phonenumber", { required: "Phone number is required" })} />
        {errors.phonenumber && <span>{errors.phonenumber.message}</span>}

        
        <h3>Education</h3>
        {eduFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <input
              {...register(`educations.${index}.education`, { required: "Education is required" })}
              placeholder={`Education ${index + 1}`}
            />
            <button type="button" onClick={() => removeEducation(index)}>❌ Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addEducation({ education: "" })}>➕ Add Education</button>

        <label>Experience:</label>
        <input {...register("experience", { required: "Experience is required" })} />
        {errors.experience && <span>{errors.experience.message}</span>}

       
        <h3>Skills</h3>
        {skillFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <input
              {...register(`skills.${index}.skill`, { required: "Skill is required" })}
              placeholder={`Skill ${index + 1}`}
            />
            <button type="button" onClick={() => removeSkill(index)}>❌ Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addSkill({ skill: "" })}>➕ Add Skill</button>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>

      <div className="parent">
        {resumeData.length > 0 && (
          <div className="button">
            {resumeData.map((item) => (
              <div key={item.id} className="resume-card">
                <p>ID: {item.id}</p>
                <p>Full Name: {item.firstname} {item.lastname}</p>
                <p>
                  Education:{" "}
                  {Array.isArray(item.educations) &&
                    item.educations.map((e, idx) => (
                      <span key={idx}>
                        {e.education}{idx < item.educations.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </p>
                <p>Experience: {item.experience}</p>
                <p>
                  Skills:{" "}
                  {Array.isArray(item.skills) &&
                    item.skills.map((s, idx) => (
                      <span key={idx}>
                        {s.skill}{idx < item.skills.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </p>
                <div className="actions">
                  <button onClick={() => handleDownload(item)}>Download</button>
                  <button onClick={() => handleView(item)}>View</button>
                  <button onClick={() => handleUpdate(item)}>Update</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Resume_builder_form;
