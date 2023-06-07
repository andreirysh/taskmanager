import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export class TasksService {
  static async getTasks() {
    const data = await getDocs(collection(db, 'tasks'));
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
  }

  static async deleteTask(id) {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  }

  static async createTask(data) {
    const docRef = await addDoc(collection(db, "tasks"), data);
    return docRef.id;
  }

  static async updateTask(id, data) {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, data);
  }
}
