import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import './ProjectsPage.css';
import 'firebase/database';
import { CreateProject } from "./components/CreateProject/CreateProject";
import CommonInput from "../../common/components/CommonInput/CommonInput";
import { DeleteProject } from "./components/DeleteProject/DeleteProject";
import { EditProject } from "./components/EditProject/EditProject";
import CommonButton from '../../common/components/CommonButton/CommonButton';
import { CommonNoData } from '../../common/components/CommonNoData/CommonNoData';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { CommonPageLoader } from "../../common/components/CommonPageLoader/CommonPageLoader";
import { useDebounce } from "../../common/hooks/useDebounce";

export const ProjectsPage = () => {


    const [projects, setProjects] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null)
    const [loader, setLoader] = useState(false)
    const debounceSearchWord = useDebounce(searchValue, 1000)

    useEffect(() => {
        setLoader(true)
        const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
            const projects = [];
            snapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            setProjects(projects)
            setLoader(false)
        });

        return () => unsubscribe();

    }, [])


    const handleCreateModalOpen = () => {
        setShowCreateModal(true);
    };

    const handleCreateModalClose = () => {
        setShowCreateModal(false);
    };

    const handleDeleteModalOpen = (project) => {
        setSelectedProject(project)
        setShowDeleteModal(true)
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false)
        setSelectedProject(null)
    }

    const handleEditModalClose = () => {
        setShowEditModal(false)
        setSelectedProject(null)
    }

    const handleEditModalOpen = (project) => {
        setSelectedProject(project)
        setShowEditModal(true)
    }

    const filteredProjects = useMemo(() => {
        if (!debounceSearchWord.trim()) return projects
        return projects.filter((item) =>
            (item.name.toLowerCase()).includes(debounceSearchWord.toLowerCase()))
    }, [projects, debounceSearchWord])


    const handleSearchChange = (event) => {
        const query = event.target.value
        setSearchValue(query)
    }

    if (loader) {
        return <CommonPageLoader />
    }

    return (
        <>
            <h1 className="projects-title">Company Projects</h1>
            <div className="container">
                <div className="toolbar">
                    <Button variant="primary" onClick={handleCreateModalOpen} className="create-button">
                        Create
                    </Button>
                    <CommonInput
                        type={'text'}
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="search-input"
                        placeholder="Search by project name"
                    />
                </div>

                {filteredProjects.length ? <Table striped bordered hover className="projects-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Lead</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProjects.length > 0 && filteredProjects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>{project.type}</td>
                                <td>{project.lead}</td>
                                <td>
                                    <CommonButton variant="primary" onClick={() => handleEditModalOpen(project)} className={"edit-button"} name={'Edit'} />
                                    <CommonButton variant="danger" onClick={() => handleDeleteModalOpen(project)} className={"delete-button"} name={'Delete'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    :
                    <CommonNoData
                        message={'No Projects Were Found'}
                        className={'no-data'}
                    />
                }

            </div>

            <CreateProject
                handleCreateModalClose={handleCreateModalClose}
                showCreateModal={showCreateModal} />

            <DeleteProject
                selectedProject={selectedProject}
                handleDeleteModalClose={handleDeleteModalClose}
                showDeleteModal={showDeleteModal} />

            <EditProject
                selectedProject={selectedProject}
                handleEditModalClose={handleEditModalClose}
                showEditModal={showEditModal} />
        </>
    );
};
