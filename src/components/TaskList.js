import React from 'react';
import Task from './Task';

const TaskList = props => {
    return (
        <div className="task-list">
            <div className="task-list-title">
                <b>{props.status}</b>
            </div>
            {props.tasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    taskStatuses={props.taskStatuses}
                    onStatusChange={props.onStatusChange} 
                />
            ))}
        </div>
    );
}

export default TaskList;