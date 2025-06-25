
export function createTodo(todoData){
  const div = document.createElement('div');
  div.id = todoData.id

  const span = document.createElement('span');

  const editBtn = document.createElement('button');
  editBtn.className="edit"
  editBtn.innerText="✍"

  const deleteBtn = document.createElement('button');
  deleteBtn.className="delete"
  deleteBtn.innerText="✖"

  const checkBox = document.createElement('input')
  checkBox.className="check"
  checkBox.setAttribute('type', 'checkBox');
  checkBox.checked = todoData.completed;

  span.innerText = todoData.title;

  div.append(checkBox)
  div.append(span)
  div.append(editBtn)
  div.append(deleteBtn)
  return div;
}
