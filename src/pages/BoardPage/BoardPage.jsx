import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './BoardPage.css';
import { Task } from '../TasksPage/components/Task/Task';
import { onSnapshot, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { CommonPageLoader } from '../../common/components/CommonPageLoader/CommonPageLoader';
import { EditTaskModal } from "../TasksPage/components/EditTaskModal/EditTaskModal";
import { DeleteTaskModal } from "../TasksPage/components/DeleteTaskModal/DeleteTaskModal";

const BoardPage = () => {

  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [columns, setColumns] = useState({
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      items: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      items: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'To-Do',
      items: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      items: [],
    },
  });

  useEffect(() => {
    setLoader(true)
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = [];
      const columnItems = {
        'column-1': [],
        'column-2': [],
        'column-3': [],
        'column-4': [],
      };

      snapshot.forEach((doc) => {
        const task = { id: doc.id, ...doc.data() };
        tasksData.push(task);

        if (task.status === 'Backlog') {
          columnItems['column-1'].push(task);
        } else if (task.status === 'In Progress') {
          columnItems['column-2'].push(task);
        } else if (task.status === 'To-Do') {
          columnItems['column-3'].push(task);
        } else if (task.status === 'Done') {
          columnItems['column-4'].push(task);
        }
      });

      setTasks(tasksData);
      setColumns((prevColumns) => ({
        ...prevColumns,
        'column-1': {
          ...prevColumns['column-1'],
          items: columnItems['column-1'],
        },
        'column-2': {
          ...prevColumns['column-2'],
          items: columnItems['column-2'],
        },
        'column-3': {
          ...prevColumns['column-3'],
          items: columnItems['column-3'],
        },
        'column-4': {
          ...prevColumns['column-4'],
          items: columnItems['column-4'],
        },
      }));
      setLoader(false)
    });

    return () => unsubscribe();
  }, []);

  if (loader) {
    return <CommonPageLoader />
  }

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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const draggedItem = sourceColumn.items.find((item) => item.id === draggableId);

    if (sourceColumn === destinationColumn) {
      const newItems = Array.from(sourceColumn.items);
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggedItem);

      const newColumn = {
        ...sourceColumn,
        items: newItems,
      };

      const newColumns = {
        ...columns,
        [sourceColumn.id]: newColumn,
      };

      setColumns(newColumns);
    } else {
      const newSourceItems = Array.from(sourceColumn.items);
      newSourceItems.splice(source.index, 1);

      const newDestinationItems = Array.from(destinationColumn.items);
      newDestinationItems.splice(destination.index, 0, draggedItem);

      const newColumns = {
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          items: newSourceItems,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          items: newDestinationItems,
        },
      };
      setColumns(newColumns);

      const taskRef = doc(db, 'tasks', draggableId);
      updateDoc(taskRef, { status: destinationColumn.title });
    }
  };

  return (
    <>
      <div>
        <h1 className='title-board'>Company Board</h1>
        <div className="board">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="board__columns board__container">
              {Object.values(columns).map((column) => (
                <div key={column.id} className="board__columns--container">
                  <div>{column.title}</div>
                  <Droppable droppableId={column.id} key={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="board__column"
                      >
                        <React.Fragment>
                          {column.items.map((task, index) => (
                            <Draggable draggableId={task.id} index={index} key={task.id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Task task={task}
                                    handleDeleteModalOpen={handleDeleteModalOpen}
                                    handleEditModalOpen={handleEditModalOpen} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </React.Fragment>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
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
};

export default BoardPage;
