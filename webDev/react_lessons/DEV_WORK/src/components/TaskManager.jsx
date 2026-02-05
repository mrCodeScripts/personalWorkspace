import { useState, useReducer, useEffect} from 'react';

export function taskManagerCallback (state, action) {
  switch (action.type) {
    case 'add':
      return {tasks: [...state.tasks, action.payload]};
    case 'delete':
      return {tasks: state.tasks.filter(t => t !==action.payload)};  
    default:
      return state;
  }
}

export function apiCall () {

}

export function TaskManagerUsingUseReducer ({callback}) {
  const [input, modifInput] = useState('');
  
  useEffect(() => {
    console.log('Writing a task.');
  }, [input]);

  useEffect(() => {
    console.log("Inputed a task.");
  }, [state]);

  return (
    <>
      <div className='flex flex-col'>
        <div className="flex flex-row gap-4">
          <input
            type='text'
            value={input}
            className='rounded border border-black p-3 m-2 bg-blue-100'
            onInput={(e) => modifInput(e.target.value)}
          />
          <button
            className='border border-red-900 m-2 p-3 rounded bg-red-500 text-white font-bold'
            type='button'
            onClick={() => dispatch({type: 'add', payload: input})}
          >
            Add Tasks
          </button>
        </div>
        <ul className='m-2 p-3'>
          {state.tasks.length == 0 ? <span className='text-red-500 font-bold'>No Tasks</span> :
          state.tasks.filter(i => i !== '').map((v, index) => {
            return <p key={index}>{index} {v}</p>
          })}
        </ul>
      </div>
    </>
  )
}