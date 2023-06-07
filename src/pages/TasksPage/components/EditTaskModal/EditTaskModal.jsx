import { Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AlertContext } from "../../../../common/context/alert/AlertContext";
import { ProjectsService } from "../../../ProjectsPage/Projects.service";
import CommonDropDown from "../../../../common/components/CommonDropDown/CommonDropDown";
import CommonTextArea from "../../../../common/components/CommonTextArea/CommonTextArea";
import CommonButton from "../../../../common/components/CommonButton/CommonButton";
import data from '../../../../data/data.json'
import { TasksService } from "../../Tasks.service";

export const EditTaskModal = ({ selectedTask, handleEditModalClose, showEditModal }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)
    const alert = useContext(AlertContext)

    const [task, setTask] = useState(null);

    useEffect(() => {
        setTask(selectedTask)
    }, [selectedTask])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData = await ProjectsService.getProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error('error', error);
                alert.show({ variant: 'danger', text: error.message })
            }
        };

        fetchProjects();
    }, []);


    const isFormValid = useMemo(() => {
        return (task &&
            task.description.trim() &&
            task.summary.trim())
    }, [task])

    const hdlEditTask = () => {
        if (isFormValid) {
            setLoading(true)
            TasksService.updateTask(selectedTask.id, task)
                .then(() => {
                    alert.show({ variant: 'info', text: 'Task has been edited' })
                    handleEditModalClose()
                })
                .catch(e => alert.show({ variant: 'danger', text: e.message }))
                .finally(() => setLoading(false))
        }
    }

    const handleProjectSelect = (project) => {
        setTask({ ...task, project });
    };

    const handleStatusSelect = (status) => {
        setTask({ ...task, status });
    };

    const handleAssigneeSelect = (assignee) => {
        setTask({ ...task, assignee });
    };

    const handlePrioritySelect = (priority) => {
        setTask({ ...task, priority });
    };

    const handleIssueSelect = (issueType) => {
        setTask({ ...task, issueType });
    }

    return (
        <>
            {
                task && <Modal show={showEditModal} onHide={handleEditModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <CommonDropDown
                                label={'Project'}
                                variant={'outline-dark'}
                                id={'dropdown-basic'}
                                name={task.project}
                                items={projects.map((project) => project.name)}
                                onSelect={handleProjectSelect}
                            />

                            <CommonDropDown
                                label={'Issue Type'}
                                variant={'outline-dark'}
                                id={'issue-type-dropdown'}
                                name={task.issueType}
                                items={['Task', 'Bug', 'Refactor']}
                                onSelect={handleIssueSelect}
                            />

                            <hr />

                            <CommonDropDown
                                label={'Status'}
                                variant={'outline-dark'}
                                id={'status-dropdown'}
                                name={task.status}
                                items={['Backlog', 'In Progress', 'To-Do', 'Done']}
                                onSelect={handleStatusSelect}
                            />

                            <CommonTextArea
                                label={'Description'}
                                rows={1}
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                            />

                            <CommonTextArea
                                label={'Summary'}
                                rows={5}
                                value={task.summary}
                                onChange={(e) => setTask({ ...task, summary: e.target.value })}
                            />

                            <CommonDropDown
                                label={'Assignee'}
                                variant={'outline-dark'}
                                id={'assignee-dropdown'}
                                name={task.assignee}
                                items={data.map((assignee) => assignee.name)}
                                onSelect={handleAssigneeSelect}
                            />


                            <CommonDropDown
                                label={'Priority'}
                                variant={'outline-dark'}
                                id={'priority-dropdown'}
                                name={task.priority}
                                items={['Low', 'Medium', 'High', 'Blocker']}
                                onSelect={handlePrioritySelect}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <CommonButton name={'Cancel'} variant={'secondary'} onClick={handleEditModalClose} />
                        <CommonButton
                            loading={loading}
                            name={'Create'}
                            variant={'primary'}
                            disabled={!isFormValid && loading}
                            onClick={hdlEditTask}
                        />

                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}