// import React, { useState } from 'react'
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// const Resume_builder_form = () => {
//     const [isshow,setisshow]=useState(false)
//     const [skillishsow,setskillishsow]=useState(false)
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm();

//       const onSubmit = (data) => {
//     console.log("Login Data:", data);
//     // Call API here
//   };
//   const handleeducation=()=>{
//     setisshow((prev)=>!prev)
//   }
//   const handleskill=()=>{
// setskillishsow((prev)=>!prev)
//   }
//   return (
//     <motion.div className='parentform'>
//       <motion.form onSubmit={handleSubmit(onSubmit)}>
//         <label>first name:</label>
//         <input {...register("firstname",{required:"firstname is required"})}/>
//         {errors.firstname && <span>First name is required</span>}

//         <label>lastname:</label>
//         <input {...register("lastname",{required:"lastname is required"})}/>
//         {errors.lastname && <span> lastname is required</span>}

//         <label>phone number:</label>
//         <input {...register("phonenumber",{required:"phone number is required"})}/>
//         {errors.phonenumber && <span>phone number is required</span>}

//         <label>Education</label>
//         <input {...register("education",{required:"education is required"})}/>
//         {errors.education && <span>Education is required</span>}
//         <button onClick={handleeducation}> Add education</button>
//         {isshow && (
//             <>
//             <label>Education</label>
//         <input {...register("education",{required:"education is required"})}/>
//         {errors.education && <span>Education is required</span>}
//         <button onClick={handleeducation}> Add education</button>
//         </>
//         )}
//         <label>Experiance</label>
//         <input {...register("experiance",{required:"Experiance is required"})}/>
//         {errors.experiance && <span>Experiance is required</span>}

//         <label>skill</label>
//         <input {...register("skill",{required:"skill"})}/>
//         {errors.skill && <span>Skill is required</span>}
//         <button onClick={handleskill}>Add skill</button>
//         {skillishsow && (
//             <>
//             <label>skill</label>
//         <input {...register("skill",{required:"skill"})}/>
//         {errors.skill && <span>Skill is required</span>}
//         <button onClick={handleskill}>Add skill</button>
//             </>
//         )}
//         <button> Submit</button>
//       </motion.form>
//     </motion.div>
//   )
// }

// export default Resume_builder_form



import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import "../css/ResumeForm.css"
const Resume_builder_form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      educations: [{ education: "" }],
      skills: [{ skill: "" }],
    },
  });

  // Dynamic Education fields
  const { fields: eduFields, append: addEducation, remove: removeEducation } =
    useFieldArray({
      control,
      name: "educations",
    });

  // Dynamic Skill fields
  const { fields: skillFields, append: addSkill, remove: removeSkill } =
    useFieldArray({
      control,
      name: "skills",
    });

  const onSubmit = (data) => {
    console.log("Resume Data:", data);
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

        {/* Personal Info */}
        <label>id:</label>
        <input {...register("id",{required:"give Number"})}/>
        {errors.id && <span>{errors.id.message}</span>}
        
        <label>First Name:</label>
        <input {...register("firstname", { required: "First name is required" })} />
        {errors.firstname && <span>{errors.firstname.message}</span>}

        <label>Last Name:</label>
        <input {...register("lastname", { required: "Last name is required" })} />
        {errors.lastname && <span>{errors.lastname.message}</span>}

        <label>Phone Number:</label>
        <input {...register("phonenumber", { required: "Phone number is required" })} />
        {errors.phonenumber && <span>{errors.phonenumber.message}</span>}

        {/* Education Section */}
        <h3>Education</h3>
        {eduFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <input
              {...register(`educations.${index}.education`, {
                required: "Education is required",
              })}
              placeholder={`Education ${index + 1}`}
            />
            <button type="button" onClick={() => removeEducation(index)}>
              ❌ Remove
            </button>
            {errors.educations?.[index]?.education && (
              <span>{errors.educations[index].education.message}</span>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addEducation({ education: "" })}>
          ➕ Add Education
        </button>

        {/* Experience */}
        <label>Experience:</label>
        <input {...register("experience", { required: "Experience is required" })} />
        {errors.experience && <span>{errors.experience.message}</span>}

        {/* Skills Section */}
        <h3>Skills</h3>
        {skillFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <input
              {...register(`skills.${index}.skill`, {
                required: "Skill is required",
              })}
              placeholder={`Skill ${index + 1}`}
            />
            <button type="button" onClick={() => removeSkill(index)}>
              ❌ Remove
            </button>
            {errors.skills?.[index]?.skill && (
              <span>{errors.skills[index].skill.message}</span>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addSkill({ skill: "" })}>
          ➕ Add Skill
        </button>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Resume_builder_form;
