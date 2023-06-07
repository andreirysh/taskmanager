import { Form, Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ProjectsService } from "../../Projects.service";
import CommonButton from "../../../../common/components/CommonButton/CommonButton";
import { AlertContext } from "../../../../common/context/alert/AlertContext";

export const CreateProject = ({ showCreateModal, handleCreateModalClose }) => {

    const [loading, setLoading] = useState(false)
    const alert = useContext(AlertContext)

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        type: '',
        lead: '',
    })

    const [newProject, setNewProject] = useState({
        name: '',
        type: '',
        lead: '',
    });

    const clearValidationErrors = () => {
        setValidationErrors({
            name: '',
            type: '',
            lead: '',
        });
    };

    const onClose = () => {
        handleCreateModalClose()
        clearValidationErrors()
        setNewProject({
            name: '',
            key: '',
            type: '',
            lead: '',
        });
    }
    const handleCreateProject = () => {
        if (newProject.name === '' || newProject.type === '' || newProject.lead === '') {
            setValidationErrors({
                name: newProject.name === '' ? 'Name is required' : '',
                type: newProject.type === '' ? 'Type is required' : '',
                lead: newProject.lead === '' ? 'Lead is required' : '',
            });
            return;
        }
        setLoading(true)
        ProjectsService.createProject(newProject)
            .then((id) => {
                alert.show({ variant: 'info', text: 'Project has been created!' })
                onClose()
            })
            .catch(e => alert.show({ variant: 'danger', text: e.message }))
            .finally(() => setLoading(false))

        clearValidationErrors();
        handleCreateModalClose();
    };

    const handleNewProjectChange = (event) => {
        const { name, value } = event.target;
        setNewProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    return (
        <Modal show={showCreateModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Create Project</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            name="name"
                            value={newProject.name}
                            onChange={handleNewProjectChange}
                            isInvalid={validationErrors.name !== ''}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project type"
                            name="type"
                            value={newProject.type}
                            onChange={handleNewProjectChange}
                            isInvalid={validationErrors.type !== ''}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.type}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLead">
                        <Form.Label>Lead</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project lead"
                            name="lead"
                            value={newProject.lead}
                            onChange={handleNewProjectChange}
                            isInvalid={validationErrors.lead !== ''}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.lead}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <CommonButton variant="secondary" onClick={onClose} name={'Cancel'}>

                </CommonButton>
                <CommonButton loading={loading} variant="success" onClick={handleCreateProject} name={'Create'}>
                    Create
                </CommonButton>
            </Modal.Footer>
        </Modal>
    )
}