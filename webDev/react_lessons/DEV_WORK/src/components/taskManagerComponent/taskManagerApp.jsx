import { useActionState, useEffect, useMemo, memo, useState } from "react"

async function taskFormSubmission (prevState, formData) { 
  const curDateCreated = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dateDeadline;

  if (formData.has("task-deadline")) dateDeadline = new Date(formData.get("task-deadline"));

  await new Promise(res => setTimeout(res, 3000));

  return {
    taskName: formData.get('task-name'),
    createdOn: {
      date: curDateCreated.getDate(),
      day: days[curDateCreated.getDay()],
      month: months[curDateCreated.getMonth()],
      year: curDateCreated.getFullYear()
    },
    deadlineOn: dateDeadline ? {
      date: dateDeadline.getDate(),
      day: dateDeadline.getDay(),
      month: months[dateDeadline.getMonth()],
      year: dateDeadline.getFullYear(),
    } : null,
  };
}

const MyTasks = memo(function Tasks ({tasks}) {
  return (
    <>
      {
        tasks.length === 0 ? <p className="text-red-500 font-bold">No Tasks</p> :
        tasks.map((v, i) => {
          return <p key={i}>{v.taskName}</p>
        }) 
      }
    </>
  )
});

export default function TryTaskManager () {
  const [taskLists, addNewTask] = useState([]);
  const [taskState, taskFormAction, isLoading] = useActionState(taskFormSubmission, null, "/task-form");

  useEffect(() => {
    if (taskState) {
      addNewTask(prev => [...prev, taskState]);
      console.log("New task added", taskLists);
    }
  }, [taskState]);

  return (
    <>
      <form action={taskFormAction} className="p-3 flex flex-col gap-3">
        <input 
          type="text" 
          name="task-name" 
          placeholder="Task Name"
          className="border-2 border-green-300 outline-none text-sm p-3 rounded-xl"
        />
        <input 
          type="datetime-local" 
          name="task-deadline"
          className="border-2 border-green-300 outline-none text-sm p-3 rounded-xl"
        />
        <button 
          type="submit"
          className="p-3 text-sm bg-green-300 rounded-xl text-white font-bold 
          hover:bg-green-600 transition duration-300 ease-in-out"
        >Create Task</button>
        <div className="mt-5 flex flex-col gap-3">
          {
            isLoading ? <p className="text-red-500 font-bold">Loading...</p>
            : <MyTasks tasks={taskLists} />
          }
        </div>
      </form>
    </>
  )
}