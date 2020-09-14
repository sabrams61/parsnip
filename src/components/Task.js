import React from 'react';

const Task = props => {
    return (
        <div className="task">
            <div className="task-header">
                <div className="task-title">{props.task.title}</div>
                <div className="select-status">
                    <select value={props.task.status} onChange={onStatusChange}>
                    {props.taskStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                    </select>
                </div>
            </div>
            <hr />
            <div className="task-body">{props.task.description}</div>
        </div>
    );

    function onStatusChange(e) {
        props.onStatusChange(props.task.id,  e.target.value);
    }
}

export default Task;