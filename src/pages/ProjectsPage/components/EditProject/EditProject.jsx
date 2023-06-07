import { Form, Modal } from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import { CommonSpinner } from "../../../../common/components/CommonSpinner/CommonSpinner";
import { ProjectsService } from "../../Projects.service";
import CommonButton from "../../../../common/components/CommonButton/CommonButton";
import {AlertContext} from "../../../../common/context/alert/AlertContext";

export const EditProject = ({ showEditModal, handleEditModalClose, selectedProject }) => {

    const [loading, setLoading] = useState(false)
    const alert = useContext(AlertContext)

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        type: '',
        lead: '',
    })

    const [project, setProject] = useState({
        name: '',
        type: '',
        lead: '',
    });

    useEffect(() => {
        setProject(selectedProject)
    }, [selectedProject])

    const clearValidationErrors = () => {
        setValidationErrors({
            name: '',
            type: '',
            lead: '',
        });
    };

    const onClose = () => {
        handleEditModalClose()
        clearValidationErrors()
    }

    const handleEditProjectChange = (event) => {
        const { name, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleSaveProject = () => {
        if (project.name === '' || project.type === '' || project.lead === '') {
            setValidationErrors({
                name: project.name === '' ? 'Name is required' : '',
                type: project.type === '' ? 'Type is required' : '',
                lead: project.lead === '' ? 'Lead is required' : '',
            });
            return;
        }
        setLoading(true)
        ProjectsService.updateProject(selectedProject.id, project)
            .then(() => {
                alert.show({variant: 'info', text: 'Project has been edited'})
                onClose()
            })
            .catch(e => alert.show({variant: 'danger', text: e.message}))
            .finally(() => setLoading(false))

        clearValidationErrors();
        onClose();
    }


    return (
        <Modal show={showEditModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            name="name"
                            value={project?.name}
                            onChange={handleEditProjectChange}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project type"
                            name="type"
                            value={project?.type}
                            onChange={handleEditProjectChange}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLead">
                        <Form.Label>Lead</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project lead"
                            name="lead"
                            value={project?.lead}
                            onChange={handleEditProjectChange}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <CommonButton variant="secondary" onClick={handleEditModalClose} name={'Cancel'}>
                    {loading ? <CommonSpinner /> : 'Cancel'}
                </CommonButton>
                <CommonButton loading={loading} variant="success" onClick={handleSaveProject}  name={'Save'}>
                    Save
                </CommonButton>
            </Modal.Footer>
        </Modal>

    )
}