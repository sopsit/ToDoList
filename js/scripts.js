const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
var counter = 0;
var indexes = [];
function Show() {
  var arr = JSON.parse(localStorage.getItem("todos"))
  if (arr) {

    // addb.addEventListener('click',() => {
    let list = ""
    const todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(element => {
      list += `<li class="card" draggable="true">
        <div class="cb-container">
        <input type="checkbox" class="cb-input" />
        <span class="check"></span>
        </div>
        <p class="item">${element.item}</p>
        <button id='${counter++}' class="clear">
        <img src="./assets/images/icon-cross.svg" alt="Clear it" />
        </button>
        </li>`
        if(element.isCompleted) {
          indexes.push(counter -1);
        }
     
    });

    document.querySelector(".todos").innerHTML = list

    //show tasks which were done
    var tasks = document.querySelectorAll('li.card')
    var tasksArr = [...tasks]
    tasks.forEach(task => {
      if(indexes.includes(tasksArr.indexOf(task))) {
        task.classList.add('checked')
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = true;
      }
    })    
    // lenght of tasks

    var span = document.getElementById("items-left")
    span.textContent = document.querySelectorAll('.todos .card:not(.checked)').length;

    //delete
    var btns = document.querySelectorAll('button.clear')
    btns.forEach(btn => {

      btn.addEventListener('click', (e) => {
        const mother = btn.parentNode
        mother.classList.add('fall')
        let ind = [...document.querySelectorAll(".todos .card")].indexOf(mother)
        delete_butt(ind)
      })
    })

    //drag

    var tasks = document.querySelectorAll('li.card')
    tasks.forEach(task => {
      task.addEventListener('dragstart', () => {
        task.classList.add("dragging")
      })
      task.addEventListener('dragend', () => {
        task.classList.remove("dragging")
      })
    })

    //Done task
    var radios = document.querySelectorAll('input.cb-input')
    radios.forEach(radio => {
      radio.addEventListener('click', e => {
        const mother = radio.closest('li')
        let ind = [...document.querySelectorAll(".todos .card")].indexOf(mother)
        const check = radio.checked
        isCompleted(ind, check)
        check ? mother.classList.add('checked') : mother.classList.remove('checked')
       span.textContent = document.querySelectorAll('.todos .card:not(.checked)').length;
      })
    })
  }
}

function delete_butt(index) {
  var arr = JSON.parse(localStorage.getItem("todos"))
  arr.splice(index, 1)
  localStorage.setItem('todos', JSON.stringify(arr))
}

function isCompleted(index, state) {
  var arr = JSON.parse(localStorage.getItem("todos"))
  arr[index].isCompleted = state
  localStorage.setItem('todos', JSON.stringify(arr))

}

function main() {

  // Theme-Switcher
  themeSwitcherBtn.addEventListener("click", () => {
    bodyTag.classList.toggle("light");
    const themeImg = themeSwitcherBtn.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });

  //Add Todo In LocalStorage
  addBtn.addEventListener("click", () => {
    const item = todoInput.value.trim();
    if (item) {
      todoInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      const currentTodo = {
        item: item,
        isCompleted: false
      }

      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));

    }
  });
  //Show the tasks
  addBtn.addEventListener('click', Show)
  //add by enter key
  todoInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      addBtn.click();
    }
  })

  //dragover
  var ul = document.querySelector(".todos")
  ul.addEventListener('dragover', (e) => {
    e.preventDefault()
    var tasks = [...document.querySelectorAll('li.card')]
    if (e.target.classList.contains('card') && !e.target.classList.contains('dragging')) {
      var current = ul.querySelector('.dragging')
      const nextpos = tasks.indexOf(e.target), curpos = tasks.indexOf(current);
      if (curpos > nextpos) {
        ul.insertBefore(current, e.target)
      } else {
        ul.insertBefore(current, e.target.nextSibling)
      }
      var arr = JSON.parse(localStorage.getItem("todos"))
      const rem = arr.splice(curpos, 1)
      arr.splice(nextpos, 0, rem[0])
      localStorage.setItem('todos', JSON.stringify(arr))
    }

  })

}

document.addEventListener("DOMContentLoaded", main);
