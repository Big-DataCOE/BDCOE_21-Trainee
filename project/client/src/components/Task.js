import { useState } from 'react';
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';

import '../assets/Task.css';

export default function Task({ id, author, completed, created, description, due, modified, title }) {

    const user = auth.currentUser.displayName;
    const [rotate, setRotate] = useState("material-icons-round rotate");
    const [display, setDisplay] = useState("task-desc display-none");
    const [status, setStatus] = useState(completed);


    function toggleExpand() {
        if (rotate === "material-icons-round") {
            setRotate("material-icons-round rotate");
            setDisplay("task-desc display-none");
        } else {
            setRotate("material-icons-round");
            setDisplay("task-desc");
        }
    }

    function toggleStatus() {
        if (status) {
            const taskRef = doc(db, 'todos', id);
            setDoc(taskRef, { completed: false }, { merge: true });
            setStatus(false);
        } else {
            const taskRef = doc(db, 'todos', id);
            setDoc(taskRef, { completed: true }, { merge: true });
            setStatus(true);
        }
        const taskRef = doc(db, "user", id);
        setDoc(taskRef, { modified: user }, { merge: true });
    }

    async function deleteTask() {
        await deleteDoc(doc(db, "todos", id));
    }

    return (
        <div id="task">
            <div className="task-header">
                <button className="btn" id="expand-task" onClick={toggleExpand}><span className={rotate}>expand_more</span></button>
                <div className="task-status"><span className="material-icons-round">{(status) ? "task_alt" : "pending_actions"}</span></div>
                <h3 className="task-title">{title}</h3>
                <button className="btn" id="check-task" onClick={toggleStatus}><span className="material-icons-round">check</span></button>
                <button className="btn" id="delete-task" onClick={deleteTask}><span className="material-icons-round">delete_outline</span></button>
            </div>
            <div className={display}>{description}</div>
            <div className="task-info">
                <div className="time">Date Created: {created}</div>
                <div className="created-task">Created By: {author}</div>
                <div className="time">Deadline: {due}</div>
                <div className="modified-task">Last Modified By: {modified}</div>
            </div>
        </div>
    )
}