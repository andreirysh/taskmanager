import React, { useContext, useState } from "react";
import { ProjectsService } from "../../Projects.service";
import { AlertContext } from "../../../../common/context/alert/AlertContext";
import CommonDeleteModal from "../../../../common/components/CommonDeleteButton/CommonDeleteModal";

export const DeleteProject = ({ showDeleteModal, handleDeleteModalClose, selectedProject }) => {

    const [loading, setLoading] = useState(false)
    const alert = useContext(AlertContext)

    const handleDeleteProject = () => {
        setLoading(true)
        ProjectsService.deleteProject(selectedProject.id)
            .then(() => {
                alert.show({ variant: 'info', text: `Project ${selectedProject.name} has been deleted` })
                handleDeleteModalClose()
            })
            .catch(e => alert.show({ variant: 'danger', text: e.message }))
            .finally(() => setLoading(false))

    }

    return (
        <CommonDeleteModal
            show={showDeleteModal}
            modaltitle={'Delete Project'}
            modalname={'Are You Sure You Want Delete Project?'}
            onHide={handleDeleteModalClose}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeleteTask={handleDeleteProject}
            loading={loading}
        />
    )
}