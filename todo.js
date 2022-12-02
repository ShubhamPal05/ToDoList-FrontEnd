const form= document.getElementById('form');
const input= document.getElementById('input');
const todoul= document.getElementById('todos');

//updating the local storage 
const updateLS = () =>{
    const sorageValues= [];//array to store all values
    const todoElement = document.querySelectorAll('li');
    todoElement.forEach((element) => {//storing all list items in array as object;
        sorageValues.push({
            iscompleted : element.classList.contains('completed'),
            text : element.innerText,
        });
    });
    localStorage.setItem('todoString', JSON.stringify(sorageValues));//localstorage stores data in the form of key value form and values are stored as string only i.e. JSON.stringify
};


const addtodo = (todosAlready, iscompleted) =>{

    let todotext= input.value;

    if(todosAlready){
        todotext=todosAlready;
    }

    // console.log(typeof(todotext));//string
    // console.log(Boolean(todotext));//when todotext is empty string o/p:false
    if(todotext){
        const todoElement= document.createElement('li');
        todoElement.innerText=todotext;
        todoul.appendChild(todoElement);

        if(iscompleted){
            todoElement.classList.add('completed');
        }

        todoElement.addEventListener('click', () =>{
            todoElement.classList.toggle('completed');
            updateLS();
        });

        todoElement.addEventListener('contextmenu', (e) =>{//contextmenu represents the right click of mouse
            todoElement.remove();
            updateLS();
        });

        input.value='';
        input.focus();
        updateLS();
    }
}

//checking whether there is already localData with key='todoString; if it is there then perform addtodo() 
const todosAlready = JSON.parse(localStorage.getItem('todoString'));//fetching the value associated to key='todoString' and converting them into object;
console.log(todosAlready);

//it requirs to put if check otherwise : Uncaught TypeError: Cannot read properties of null (reading 'forEach')
if(todosAlready){
    todosAlready.forEach((element) => {
        addtodo(element.text, element.iscompleted);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
   addtodo();
});
