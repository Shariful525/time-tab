/* eslint-disable react/prop-types */
const Project = ({ project, onDeleteWork }) => {
  const totalTime = project.workDetails.reduce(
    (acc, work) => {
      acc.hours += parseInt(work.workHours);
      acc.minutes += parseInt(work.workMinutes);
      return acc;
    },
    { hours: 0, minutes: 0 }
  );

  totalTime.hours += Math.floor(totalTime.minutes / 60);
  totalTime.minutes = totalTime.minutes % 60;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xl text-cyan-500">{project?.projectName}</span>
        <div>
          <span className="flex items-center justify-center ">
            (<span className="text-emerald-500	">{totalTime.hours}</span>h
            <span className="text-emerald-500	">{totalTime.minutes}</span>min)
          </span>
        </div>
      </div>
      <hr className="h-0.5 bg-white" />

      <div className="flex flex-col gap-3.5 mt-4">
        {project.workDetails.map((work, index) => (
          <div className="flex items-center justify-between" key={index}>
            <span>{work?.workTitle}</span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-center">{work?.workHours}hours,</span>
              <span className="text-center">{work?.workMinutes}minutes</span>
            </div>
            <button
              className="group"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this work?")
                ) {
                  onDeleteWork(project.projectName, index);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-trash group-hover:text-red-600 transition-all"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
