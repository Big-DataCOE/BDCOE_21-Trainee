import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

import Task from './Task';

import '../assets/Pinup.css';

export default function Pinup({pinDisplay}) {

    const user = auth.currentUser.displayName;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due, setDue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [display, setDisplay] = useState(true);

    // not-realtime
    // useEffect(() => {
    //     async function fetchTasks() {
    //         const q = query(collection(db, "todos"), orderBy("due"));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id);
    //             console.log(doc.data());
    //             setTasks(tasks => [...tasks, { id: doc.id, author: doc.data().author, completed: doc.data().completed, created: doc.data().created, description: doc.data().description, due: doc.data().due, modified: doc.data().modified, title: doc.data().title }]);
    //         })
    //     }
    //     fetchTasks();
    // }, []);

    // realtime
    useEffect(() => {
        const q = query(collection(db, "todos"), orderBy("due"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const doc = change.doc;
                if (change.type === "added") {
                    console.log("New task: ", doc.data());
                    setTasks(tasks => [...tasks, { id: doc.id, author: doc.data().author, completed: doc.data().completed, created: doc.data().created, description: doc.data().description, due: doc.data().due, modified: doc.data().modified, title: doc.data().title }]);
                }
                if (change.type === "modified") {
                    console.log("Modified task: ", doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed task: ", doc.data());
                    console.log(doc.id);
                    setTasks(tasks => tasks.filter((t) => t.id !== doc.id));
                }
            });
        });
    }, []);

    async function addTask() {
        setDisplay(!display);
        const date = new Date();
        const dnt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes();

        try {
            const docRef = await addDoc(collection(db, "todos"), {
                author: user,
                completed: false,
                created: dnt,
                description: description,
                due: due,
                modified: user,
                title: title
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setTitle("");
        setDescription("");
        setDue("");
    }

    return (
        <div id="pinup" style={{display: pinDisplay}} >
            <h2>List of tasks</h2>

            <div id="tasks">
                {tasks.map((task) => {
                    return (<Task key={task.id} id={task.id} author={task.author} completed={task.completed} created={task.created} description={task.description} due={task.due} modified={task.modified} title={task.title} />);
                })}
            </div>

            {(display) ?
                <button className="btn" id="btn-plus" onClick={() => { setDisplay(!display) }}><span className="material-icons-round">add_box</span></button>
                :
                <form id="add-task" onSubmit={(e) => { e.preventDefault() }}>
                    <input className="inp inp-title" type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <textarea className="inp inp-desc" placeholder="description" value={description} rows="3" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    <label htmlFor="inp-date" id="inp-date-label" >Deadline:</label>
                    <input className="inp" id="inp-date" type="datetime-local" value={due} onChange={(e) => { setDue(e.target.value) }} />
                    <button className="btn" id="btn-addtask" type="button" onClick={addTask}><span className="material-icons-round">add</span></button>
                    <button className="btn" id="float-cross" onClick={() => { setDisplay(!display) }}><span className="material-icons-round">close</span></button>
                </form>
            }
        </div>
    )
}