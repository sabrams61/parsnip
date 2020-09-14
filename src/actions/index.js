import * as api from '../api';
import { CALL_API } from "../middleware/api";

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks() {
    return {
        [CALL_API]: {
            types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
            endpoint: '/tasks',
            method: 'GET'
        },
    };
}

export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';

export function createTask({ title, description, status = 'Unstarted' }) {
    return {
        [CALL_API]: {
            types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
            endpoint: '/tasks',
            method: 'POST',
            body: {
                title,
                description,
                status
            }
        },
    };
}

// export const EDIT_TASK_STARTED = 'EDIT_TASK_STARTED';
// export const EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED';
// export const EDIT_TASK_FAILED = 'EDIT_TASK_FAILED';

// export function editTask(id, params = {}) {
//     const task = getTaskById(store.getState().tasks.tasks, id);
//     const updatedTask = Object.assign({}, task, params);
//     return {
//         [CALL_API]: {
//             types: [EDIT_TASK_STARTED, EDIT_TASK_SUCCEEDED, EDIT_TASK_FAILED],
//             endpoint: '/tasks/' + id,
//             method: 'POST',
//             body: updatedTask
//         },
//     };
// }

function getTaskById(tasks, id) {
    console.log('tasks', tasks);
    return tasks.find(task => task.id === id);
}

let _id = 1;
export function uniqueId() {
    return _id++;
}

// function createTaskSucceeded(task) {
//     return {
//         type : 'CREATE_TASK_SUCCEEDED',
//         payload : {
//             task
//         },
//         meta : {
//             analytics : {
//                 event : 'create_task',
//                 data : {
//                     id : task.id
//                 }   
//             }
//         }
//     };
// }

// export function createTask({ title, description, status = 'Unstarted' }) {
//     return dispatch => {
//         api.createTask({ title, description, status })
//         .then(resp => {
//             console.log('SUCCESS new task saved to server', resp.data);
//             dispatch(createTaskSucceeded(resp.data));
//         })
//         .catch(err => {
//             console.log('ERROR new task saved to server', err);
//         })
//     }
// }

export function editTaskSucceeded(task) {
    return {
        type : 'EDIT_TASK_SUCCEEDED',
        payload : {
            task
        },
        meta : {
            analytics : {
                event : 'edit_task',
                data : {
                    id : task.id
                }   
            }
        }
    };
}

export function editTask(id, params = {}) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = Object.assign({}, task, params);
        api.editTask(id, updatedTask)
        .then(resp => {
            console.log('SUCCESS edited task saved to server', resp.data);
            dispatch(editTaskSucceeded(resp.data));
        })
        .catch(err => {
            console.error('ERROR edited task saved to server', err);
        })
    }
}

// export function fetchTasksSucceeded(tasks) {
//     return {
//         type : 'FETCH_TASKS_SUCCEEDED',
//         payload : {
//             tasks
//         }
//     };
// }

// function fetchTasksStarted() {
//     return {
//         type : 'FETCH_TASKS_STARTED'
//     };
// }

// function fetchTasksFailed(error) {
//     return {
//         type : 'FETCH_TASKS_FAILED',
//         payload : {
//             error
//         }
//     };
// }

// export function fetchTasks() {
//     return dispatch => {
//         dispatch(fetchTasksStarted());

//         api.fetchTasks()
//         .then(resp => {
//             setTimeout(() => {
//                 console.log('SUCCESS fetched tasks', resp.data);
//                 dispatch(fetchTasksSucceeded(resp.data));
//             }, 2000);
//             // throw new Error('Oh noes! Unable to fetch tasks!');
//         })
//         .catch(err => {
//             dispatch(fetchTasksFailed(err.message));
//         })
//     }
// }