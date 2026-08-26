import React, { useState } from 'react'

interface TodoList{
    name:string,
    content:string,
}

function TodoTaskEnter() {

    const [task, setTask] = useState<TodoList>({
        name:'',
        content:''
    });

    const [tasks, setTasks] = useState<TodoList[]>([])


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        
        const { name, value } = e.target;
        setTask((prevTask)=>({
            ...prevTask,  //copied the existing properties 
            [name]: value  //the  key of value overright the existing one

        }));

    }

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();

        setTasks((prevList)=>[
            ...prevList,
            task
        ])

        setTask({
            name:'',
            content:''
        })

    }

     return (
        <>
            <div>Enter The Input</div>
            {/* 4. Connected inputs with matching 'name' attributes and controlled values */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={task.name} 
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label>Task Content: </label>
                    <input
                    type='email'
                    name='content'
                    value={task.content}
                    onChange={handleInput}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>


            {/* 5. Live UI preview of the state as you type */}
            <div className="task-list-container" style={{ marginTop: '20px' }}>
                <h3>Current Task Preview:</h3>
                <p><strong>Name:</strong> {task.name}</p>
                <p><strong>Content:</strong> {task.content}</p>
            </div>

            <div className="show-task-container">
                {tasks.map((task, index)=>(
                    <div key={index} style={{fontSize:20, }}>

                       <span>
                        Title : {task.name}
                        </span> 
                        <span  style={{marginLeft:35}}>

                            Task : {task.content}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TodoTaskEnter;