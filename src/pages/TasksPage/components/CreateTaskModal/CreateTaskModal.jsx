import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import CommonButton from '../../../../common/components/CommonButton/CommonButton';
import CommonDropDown from '../../../../common/components/CommonDropDown/CommonDropDown';
import CommonTextArea from '../../../../common/components/CommonTextArea/CommonTextArea';
import { ProjectsService } from '../../../ProjectsPage/Projects.service'
import { AlertContext } from "../../../../common/context/alert/AlertContext";
import { TasksService } from "../../Tasks.service";
import data from '../../../../data/data.json'

const CreateTaskModal = (props) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const alert = useContext(AlertContext);
  const [selectedProject, setSelectedProject] = useState('Select Project');
  const [selectedIssueType, setSelectedIssueType] = useState('Select Issue Type');
  const [selectedStatus, setSelectedStatus] = useState('Select Status');
  const [selectedAssignee, setSelectedAssignee] = useState('Select Assignee');
  const [selectedPriority, setSelectedPriority] = useState('Select Priority');
  const [assignees, setAssignees] = useState([]);

  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');

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

  useEffect(() => {
    setAssignees(data.assignee);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleAssigneeSelect = (assignee) => {
    setSelectedAssignee(assignee);
  };

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };


  const handleCreateTask = () => {
    setLoading(true)
    const newTask = {
      project: selectedProject,
      issueType: selectedIssueType,
      status: selectedStatus,
      assignee: selectedAssignee,
      priority: selectedPriority,
      description: description,
      summary: summary,
    };

    TasksService.createTask(newTask)
      .then(() => {
        alert.show({ variant: 'info', text: 'Task has been created!' })
        resetForm();
        props.handleClose();
      })
      .catch(e => {
        alert.show({ variant: 'danger', text: e.message })
        console.error("Error adding document: ", e);
      })
      .finally(() => setLoading(false))
  };

  const resetForm = () => {
    setSelectedProject('Select Project');
    setSelectedIssueType('Select Issue Type');
    setSelectedStatus('Select Status');
    setSelectedAssignee('Select Assignee');
    setSelectedPriority('Select Priority');
    setDescription('');
    setSummary('');
  };

  const isFormValid = () => {
    return (
      selectedProject !== 'Select Project' &&
      selectedIssueType !== 'Select Issue Type' &&
      selectedStatus !== 'Select Status' &&
      selectedAssignee !== 'Select Assignee' &&
      selectedPriority !== 'Select Priority' &&
      description.trim() !== '' &&
      summary.trim() !== ''
    );
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <CommonDropDown
              label={'Project'}
              variant={'outline-dark'}
              id={'dropdown-basic'}
              name={selectedProject}
              items={projects.map((project) => project.name)}
              onSelect={handleProjectSelect}
            />

            <CommonDropDown
              label={'Issue Type'}
              variant={'outline-dark'}
              id={'issue-type-dropdown'}
              name={selectedIssueType}
              items={['Task', 'Bug', 'Refactor']}
              onSelect={setSelectedIssueType}
            />

            <hr />

            <CommonDropDown
              label={'Status'}
              variant={'outline-dark'}
              id={'status-dropdown'}
              name={selectedStatus}
              items={['Backlog', 'In Progress', 'To-Do', 'Done']}
              onSelect={handleStatusSelect}
            />

            <CommonTextArea
              label={'Description'}
              rows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <CommonTextArea
              label={'Summary'}
              rows={5}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />


            <CommonDropDown
              label={'Assignee Team'}
              variant={'outline-dark'}
              id={'assignee-dropdown'}
              name={selectedAssignee}
              items={data.map((assignee) => assignee.name)}
              onSelect={handleAssigneeSelect}
            />


            <CommonDropDown
              label={'Priority'}
              variant={'outline-dark'}
              id={'priority-dropdown'}
              name={selectedPriority}
              items={['Low', 'Medium', 'High', 'Blocker']}
              onSelect={handlePrioritySelect}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CommonButton name={'Cancel'} variant={'secondary'} onClick={props.handleClose} />
          <CommonButton
            loading={loading}
            name={'Create'}
            variant={'primary'}
            disabled={!isFormValid() && loading}
            onClick={() => {
              if (isFormValid()) {
                handleCreateTask();
                props.handleClose();
              }
            }}
          />

        </Modal.Footer>
      </Modal>


    </>
  );
};

export default CreateTaskModal;