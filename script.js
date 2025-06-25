import {createTodo} from './controller.js'

let store = [];

//const cont = document.querySelector('.cont');
const list = document.querySelector('.list');
const input = document.querySelector('.mainInput');
const button = document.querySelector('.addBtn');
const deletAllBtn = document.querySelector('.deletAll')
const extBtnBox = document.querySelector('.extbtnbox')
const select = document.querySelector('select')


if(localStorage.getItem('todo')){
  store = JSON.parse(localStorage.getItem('todo'));
  store.forEach(todoData => {
    const todo = createTodo(todoData);
    list.append(todo)
    extBtnBox.style.display='flex'
  });
}

button.addEventListener('click', ()=>{
  if(!input.value.trim()) return;
  const todoData = {
    id :  list.children.length,
    title : input.value,
    completed : false,
  };
  const todo = createTodo(todoData);
  list.append(todo)
  input.value = ""

  store.push(todoData);

  localStorage.setItem('todo', JSON.stringify(store))
  extBtnBox.style.display='flex'
})

list.addEventListener('click', (event)=>{
  const targetElementId = event.target.parentElement.id;
  const targetElement = event.target.parentElement;
  const action = event.target.className;

  switch (action){
    case 'delete' : {
      targetElement.remove();
      store = store.filter(item => item.id != targetElementId);
      localStorage.setItem('todo', JSON.stringify(store))
      break;
    }

    case 'check' : {
      targetElement.firstChild.checked = targetElement.firstChild.checked;
      store = store.map(item => {
        if(item.id == targetElementId){
          item.completed = !item.completed ;
        } 
        return item;
      });
      localStorage.setItem('todo', JSON.stringify(store))
      break;
    }

    case 'edit' : {
      const oldText = targetElement.children[1].innerText;
      targetElement.children[1].remove()

      const input = document.createElement('input');
      input.value= oldText;

      input.onblur = function(){
        const span = document.createElement('span')
        span.innerText = input.value;
        targetElement.firstChild.after(span);
        input.remove();

        store = store.map(item => {
          if(item.id == targetElementId){
            item.title = input.value
          }
          return item;
        })
      }
      targetElement.firstChild.after(input)
      break;
    }

  }
})

deletAllBtn.addEventListener('click', ()=>{
  console.log("deleted")
  list.innerHTML=""
  store.length = 0;
  localStorage.removeItem('todo');
  extBtnBox.style.display='none'
})


select.addEventListener('change', (event)=>{
  const filterBy = event.target.value
  store = JSON.parse(localStorage.getItem('todo'))
  if(filterBy == 'completed'){
    store = store.filter(item => item.completed)
  } else if(filterBy == 'pending') {
    store = store.filter(item => !item.completed)
  }

  list.innerHTML=""

  store.forEach(todoData => {
    const todo = createTodo(todoData);
    list.append(todo)
    extBtnBox.style.display='flex'
  });

})





















