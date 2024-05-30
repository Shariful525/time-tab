import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Form({ handleSubmit }) {
  const [localFormData, setLocalFormData] = useState({
    projectName: "",
    workTitle: "",
    workHours: 0,
    workMinutes: 0,
  });

  // Handle local input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission and pass data to parent
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(localFormData);
    setLocalFormData({
      projectName: "",
      workTitle: "",
      workHours: 0,
      workMinutes: 0,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 text-white">
      <div className="flex flex-col gap-3.5 text-white ">
        <label>Project Name:</label>
        <input
          type="text"
          name="projectName"
          value={localFormData.projectName}
          onChange={handleChange}
          className="bg-transparent border focus:ring-2 focus:outline-blue-400 px-5 py-3.5  rounded-md"
          required
        />
      </div>
      <div className="flex flex-col gap-3.5 text-white ">
        <label>Work Title:</label>
        <input
          type="text"
          name="workTitle"
          value={localFormData.workTitle}
          onChange={handleChange}
          className="bg-transparent border focus:ring-2 focus:outline-blue-400 px-5 py-3.5  rounded-md"
          required
        />
      </div>
      <div className="flex flex-col gap-3.5 text-white ">
        <label>
          {" "}
          <small className="flex gap-1">
            Hours<span className="text-red-500">*</span>{" "}
          </small>
        </label>
        <input
          type="number"
          name="workHours"
          value={localFormData.workHours}
          onChange={handleChange}
          className="bg-transparent border focus:ring-2 focus:outline-blue-400 px-5 py-3.5  rounded-md"
          required
        />
      </div>
      <div className="flex flex-col gap-3.5 text-white ">
        <label>
          <small className="flex gap-1">
            Minutes<span className="text-red-500">*</span>{" "}
          </small>
        </label>
        <input
          type="number"
          name="workMinutes"
          value={localFormData.workMinutes}
          onChange={handleChange}
          className="bg-transparent border focus:ring-2 focus:outline-blue-400 px-5 py-3.5  rounded-md"
          required
        />
      </div>
      <button
        className="bg-black text-white py-3.5 rounded hover:scale-105 transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
