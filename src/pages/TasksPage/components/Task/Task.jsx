import React from 'react';
import './Task.css';
import CommonButton from '../../../../common/components/CommonButton/CommonButton';

export const Task = ({ task, handleDeleteModalOpen, handleEditModalOpen }) => {
  return (
    <div className="task">
      <div className="task__container">
        <div className="task__page">
          <div className="task__description">
            <p>{task.description}</p>
            <hr className="task__divider" />
          </div>
          <div className="task__metadata">
            <span className="task__issue-type">{task.issueType}</span>
            <span className="task__priority">{task.priority}</span>
            {task.status === 'Backlog' ? (
              <span className="task__status task__status--backlog">{task.status}</span>
            ) : task.status === 'In Progress' ? (
              <span className="task__status task__status--in-progress">{task.status}</span>
            ) : task.status === 'To-Do' ? (
              <span className="task__status task__status--to-do">{task.status}</span>
            ) : task.status === 'Done' ? (
              <span className="task__status task__status--done">{task.status}</span>
            ) : (
              <span className="task__status">{task.status}</span>
            )}
            <hr className="task__divider" />
          </div>
          <div className="task__details">
            <h2 className="task__summary">{task.summary}</h2>
          </div>
          <hr className="task__divider" />
          <div className="task__footer">
            <div>
              <span className="task__assignee">Assignee: {task.assignee}</span>
              <span className="task__project">Project: {task.project}</span>
            </div>
            <div>
              <CommonButton variant="danger" onClick={() => handleDeleteModalOpen(task)} name="Delete" />
              <CommonButton variant="success" onClick={() => handleEditModalOpen(task)} name="Edit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
