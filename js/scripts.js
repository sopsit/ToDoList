const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");

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
        <button class="clear">
        <img src="./assets/images/icon-cross.svg" alt="Clear it" />
        </button>
        </li>`
      });
      document.querySelector(".todos").innerHTML = list

      //drag

      var tasks = document.querySelectorAll('li.card')
      for (const key in tasks) {
        tasks[key].addEventListener('dragstart', ()=>{
          tasks[key].classList.add("dragging")
        })
        tasks[key].addEventListener('dragend', () => {
          tasks[key].classList.remove("dragging")
        } )
      }
    }
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
    document.getElementById('add-btn').addEventListener('click', Show)
    // setInterval(Show, 10)
    //Done the task
    // document.getElementById()

    //dragover
    document.querySelector(".todos")
}

document.addEventListener("DOMContentLoaded", main);
