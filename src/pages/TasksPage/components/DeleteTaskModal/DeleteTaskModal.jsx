import React, { useContext, useState } from "react";
import { AlertContext } from "../../../../common/context/alert/AlertContext";
import { TasksService } from "../../Tasks.service";
import CommonDeleteModal from "../../../../common/components/CommonDeleteButton/CommonDeleteModal";

export const DeleteTaskModal = ({ showDeleteModal, handleDeleteModalClose, selectedTask }) => {

    const [loading, setLoading] = useState(false)
    const alert = useContext(AlertContext)

    const handleDeleteProject = () => {
        setLoading(true)
        TasksService.deleteTask(selectedTask.id)
            .then(() => {
                alert.show({ variant: 'info', text: `Task has been deleted` })
                handleDeleteModalClose()
            })
            .catch(e => alert.show({ variant: 'danger', text: e.message }))
            .finally(() => setLoading(false))

    }

    return (
        <CommonDeleteModal
            show={showDeleteModal}
            modaltitle={'Delete Task'}
            modalname={'Are You Sure You Want Delete Task?'}
            onHide={handleDeleteModalClose}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeleteTask={handleDeleteProject}
            loading={loading}
        />
    )
}