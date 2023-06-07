import React, { useEffect, useState } from "react";
import './TasksPage.css'
import { Task } from "./components/Task/Task";
import { CommonNoData } from "../../common/components/CommonNoData/CommonNoData";
import '../../common/components/CommonNoData/CommonNoData.css'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { CommonPageLoader } from "../../common/components/CommonPageLoader/CommonPageLoader";
import { DeleteTaskModal } from "./components/DeleteTaskModal/DeleteTaskModal";
import { EditTaskModal } from "./components/EditTaskModal/EditTaskModal";


export const TasksPage = () => {

    const [tasks, setTasks] = useState([])
    const [loader, setLoader] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)


    useEffect(() => {
        setLoader(true)
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const tasksData = [];
            snapshot.forEach((doc) => {
                tasksData.push({ id: doc.id, ...doc.data() });
            });
            setTasks(tasksData)
            setLoader(false)
        });

        return () => unsubscribe();
    }, []);

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false)
        setSelectedTask(null)
    }

    const handleDeleteModalOpen = (task) => {
        setSelectedTask(task)
        setOpenDeleteModal(true)
    }

    const handleEditModalClose = () => {
        setOpenEditModal(false)
        setSelectedTask(null)
    }

    const handleEditModalOpen = (task) => {
        setSelectedTask(task)
        setOpenEditModal(true)
    }

    if (loader) {
        return <CommonPageLoader />
    }

    return (
        <>
            <h1 className="tasks-title">Company Tasks</h1>
            {tasks.length ? (
                <div className='task-grid'>
                    {tasks.map((task) => (
                        <Task
                            handleDeleteModalOpen={handleDeleteModalOpen}
                            handleEditModalOpen={handleEditModalOpen}
                            key={task.id}
                            task={task}
                        />
                    ))}
                </div>
            )
                :
                <div className="no-data__container">
                    <CommonNoData
                        message={'No Tasks Were Found'}
                        className={'no-data'}
                    />
                </div>
            }

            {openDeleteModal && <DeleteTaskModal
                selectedTask={selectedTask}
                handleDeleteModalClose={handleDeleteModalClose}
                showDeleteModal={openDeleteModal} />
            }

            {openEditModal && <EditTaskModal
                selectedTask={selectedTask}
                handleEditModalClose={handleEditModalClose}
                showEditModal={openEditModal} />
            }
        </>
    )
}