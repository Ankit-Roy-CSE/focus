const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

window.addEventListener('DOMContentLoaded', loadTodos)
todoButton.addEventListener('click',(e)=>{
    e.preventDefault();
    addTodo(todoInput.value)

    //Saving todo in localStorage
    if (todoInput.value !== ''){
        let todos=localStorage.getItem('todos');
        const text =todoInput.value;
        if (todos === null) {
            todos=[text];
            todos= JSON.stringify(todos)
            localStorage.setItem('todos', todos);
        }
        else{
            todos=JSON.parse(todos);
            todos.push(text);
            todos= JSON.stringify(todos);
            localStorage.setItem('todos', todos)
        }

        todoInput.value = '';
    }
    
});
todoList.addEventListener('click', deleteCheck);
function deleteCheck(e){
    const item = e.target;
    const todo = item.parentElement.parentElement;
    if (item.classList[0] === 'delete-btn'){
        todo.remove();
        removeTodo(todo);
    }
    if (item.classList[0] === 'completed-btn'){
        todo.classList.toggle('completed');
    }
}

function removeTodo(todo){
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    todos = JSON.stringify(todos);
    localStorage.setItem('todos', todos);
}    

function addTodo(text){
    const todoDiv = document.createElement('li')
    todoDiv.classList.add('todo-item')

    //Todo Content
    const newTodo = document.createElement('div')
    newTodo.classList.add('todo-content');
    if (text !== ''){
        newTodo.innerHTML = text
        todoDiv.appendChild(newTodo);

        //Todo Buttons
        const todoBtns = document.createElement('div')
        todoBtns.classList.add('todo-btns')
    
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check"></i>';
        completedButton.classList.add('completed-btn')
        todoBtns.appendChild(completedButton);
    
        //Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('delete-btn')
        todoBtns.appendChild(deleteButton);
    
        todoDiv.appendChild(todoBtns);
        todoList.appendChild(todoDiv);
    
    }
    


}

function loadTodos(){
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    // for (let i = 0; i < localStorage.length; i++) {
    //     addTodo(todos[i]);
    // }
    todos.forEach((text) => {
        addTodo(text);
    })
}
