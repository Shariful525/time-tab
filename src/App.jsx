import { useState } from "react";
import Form from "./components/Form";
import Project from "./components/Project";

function App() {
  const [projects, setProjects] = useState([]);

  // Handle form submission
  const handleSubmit = (newWork) => {
    setProjects((prevProjects) => {
      const existingProjectIndex = prevProjects.findIndex(
        (project) => project.projectName === newWork.projectName
      );

      if (existingProjectIndex !== -1) {
        const updatedProjects = [...prevProjects];
        updatedProjects[existingProjectIndex].workDetails.push({
          workTitle: newWork.workTitle,
          workHours: newWork.workHours,
          workMinutes: newWork.workMinutes,
        });
        return updatedProjects;
      } else {
        return [
          ...prevProjects,
          {
            projectName: newWork.projectName,
            workDetails: [
              {
                workTitle: newWork.workTitle,
                workHours: newWork.workHours,
                workMinutes: newWork.workMinutes,
              },
            ],
          },
        ];
      }
    });
  };

  const handleDeleteWork = (projectName, workIndex) => {
    setProjects((prevProjects) => {
      return prevProjects
        .map((project) => {
          if (project.projectName === projectName) {
            const updatedWorkDetails = project.workDetails.filter(
              (_, index) => index !== workIndex
            );
            if (updatedWorkDetails.length === 0) {
              return null;
            }
            return { ...project, workDetails: updatedWorkDetails };
          }
          return project;
        })
        .filter((project) => project !== null);
    });
  };

  const grandTotal = projects.reduce(
    (acc, project) => {
      project.workDetails.forEach((work) => {
        acc.totalHours += parseInt(work.workHours);
        acc.totalMinutes += parseInt(work.workMinutes);
      });
      return acc;
    },
    { totalHours: 0, totalMinutes: 0 }
  );

  // Convert minutes to hours if 60 or more
  grandTotal.totalHours += Math.floor(grandTotal.totalMinutes / 60);
  grandTotal.totalMinutes = grandTotal.totalMinutes % 60;

  const totalDecimalHours =
    grandTotal.totalHours + grandTotal.totalMinutes / 60;

  // calculate total payement
  const [rate, setRate] = useState(0);

  const handleTotalPaymentInput = (e) => {
    const payement = e.target.value;
    setRate(parseInt(payement));
  };

  const totalPayement = totalDecimalHours * rate;

  return (
    <main className="mx-auto md:p-10 p-6">
      <h1 className="text-white text-2xl underline text-center">
        Count Your Working Time
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mt-20 ">
        <div>
          <Form handleSubmit={handleSubmit} />
        </div>
        {projects.length ? (
          <div className="text-white md:col-span-2 text-center">
            {projects.map((project, index) => (
              <Project
                key={index}
                project={project}
                onDeleteWork={handleDeleteWork}
              />
            ))}
            {projects.length && (
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to clear all data?")
                  ) {
                    setProjects([]);
                  }
                }}
                className="bg-black rounded-md py-3.5 px-5 mt-10 hover:scale-105 transition-all"
              >
                Clear All Data
              </button>
            )}
          </div>
        ) : null}
        {projects.length ? (
          <div className="text-white  flex flex-col gap-5">
            <h2 className="text-3xl text-center">Grand Total</h2>
            <div className="text-center">
              <span>
                Project{" "}
                <span className="text-emerald-500	">{projects?.length}</span>,
                worked for <span className="text-emerald-500">{}</span> times!
              </span>
              <div className="flex items-center justify-center gap-2.5">
                <small className="font-semibold">
                  {" "}
                  <span className="text-emerald-500	">
                    {grandTotal.totalHours}
                  </span>
                  h
                </small>
                <small>
                  <span className="text-emerald-500	">
                    {grandTotal.totalMinutes}
                  </span>
                  min
                </small>
              </div>
            </div>
            <div className="flex items-center justify-center px-5 py-3.5 rounded-md bg-blue-500 w-48 mx-auto text-yellow-200 font-bold">
              Grand Total: <span>{totalDecimalHours.toFixed(2)}h</span>
            </div>
            <div>
              <label htmlFor="hourlyRate" className="flex flex-col gap-2.5">
                Pay for an hour
                <input
                  type="number"
                  className="px-5 py-3.5 border rounded-md bg-transparent"
                  name="hourlyRate"
                  onChange={handleTotalPaymentInput}
                  placeholder="enter hourly rate"
                />
              </label>
              <span className="mt-2.5 text-2xl">
                Your total payment:{" "}
                <span className="text-blue-500">
                  ${totalPayement ? totalPayement.toFixed(2) : "0.00"}
                </span>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
