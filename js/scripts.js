const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
var counter = 0;

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
    });
    document.querySelector(".todos").innerHTML = list
    var btns = document.querySelectorAll('button.clear')
    btns.forEach(btn => {

      btn.addEventListener('click', (e) => {
         const mother =  btn.parentNode
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

  }
}

function delete_butt(index) {
  var arr = JSON.parse(localStorage.getItem("todos"))
  arr.splice(index, 1)
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
  // setInterval(Show, 10)
  //Done the task
  // document.getElementById()

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
  //delete task
  // var btn = document.querySelectorAll('button')
  // console.log('b', btn);
  // btn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   for (const i of [...btn]) {
  //     console.log(i, "  ")
  //     if(i == e.target.index) {
  //       delete_butt(i);
  //     }
  //   }

  // })


}

document.addEventListener("DOMContentLoaded", main);
