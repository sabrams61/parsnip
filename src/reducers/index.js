const initialState = {
  tasks : [],
  isLoading : false,
  error : null
};

export default function tasks(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_TASKS_STARTED':
          return {
            ...state,
            isLoading : true
          };
        case 'FETCH_TASKS_SUCCEEDED':
          return {
            ...state,
            tasks : action.payload,
            isLoading : false
          };
        case 'FETCH_TASKS_FAILED':
            return {
              ...state,
              error : action.payload,
              isLoading : false
            };
        case 'CREATE_TASK_SUCCEEDED':
            return {
                ...state,
                tasks : state.tasks.concat(action.payload)
            };
        case 'CREATE_TASK_FAILED':
            return {
                ...state,
                error : action.payload
            };
        case 'EDIT_TASK_SUCCEEDED':
            const { payload } = action;
            const nextTasks = state.tasks.map(task => {
                if (task.id === payload.task.id) {
                    return payload.task;
                }
        
                return task;
            });
            return {
                ...state,
                tasks: nextTasks
            };
        case 'EDIT_TASK_FAILED':
            return {
                ...state,
                error : action.payload.error
            };
        default:
            return state;
    };
}