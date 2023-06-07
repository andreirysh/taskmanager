import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export class ProjectsService {
    static async getProjects() {
        const data = await getDocs(collection(db, 'projects'))
        return data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
    }

    static async deleteProject(id) {
        const projectsDoc = doc(db, "projects", id);
        await deleteDoc(projectsDoc);
    }

    static async createProject(data) {
        const docRef = await addDoc(collection(db, "projects"), data);
        return docRef.id
    }

    static async updateProject(id, data) {
        const projectDoc = doc(db, "projects", id);
        await updateDoc(projectDoc, data);
    }

}
