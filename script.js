/*
// Задание #1

// Первый вариант
const body = document.querySelector("body");

body.innerHTML = `
    <form class="create-user-form">
        <label>
            Имя
            <input type="text" name="userName" placeholder="Введите ваше имя">
        </label>
        <label>
            Пароль
            <input type="password" name="password" placeholder="Придумайте Пароль">
        </label>
        <button type="submit">
            Подтвердить
        </button>
    </form>
`;

// Второй вариант
const form = document.createElement("form");
form.className = "create-user-form";
const nameLabel = document.createElement("label");
const nameInput = document.createElement("input");
nameLabel.textContent = " Имя ";
nameInput.setAttribute("type", "text");
nameInput.setAttribute("name", "userName");
nameInput.setAttribute("placeholder", "Введите ваше имя");
nameLabel.append(nameInput);

const passwordLabel = document.createElement("label");
const passwordInput = document.createElement("input");
passwordLabel.textContent = " Пароль ";
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("name", "password");
passwordInput.setAttribute("placeholder", "Придумайте Пароль");
passwordLabel.append(passwordInput);

const submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "submit");
submitBtn.textContent = " Подтвердить";
form.style.marginBottom = "20px";

form.prepend(submitBtn);
form.prepend(passwordLabel);
form.prepend(nameLabel);
body.prepend(form);
*/

// Задание #2

const tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Посмотреть новый урок по JavaScript",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Выполнить тест после урока",
  },
  {
    id: "1138465078063",
    completed: false,
    text: "Выполнить ДЗ после урока",
  },
];

const body = document.querySelector("body");
const tasksList = document.querySelector(".tasks-list");
const form = document.querySelector(".create-task-block");
let darkTheme = false;

function createTask(id, text, theme) {
  return `
        <div class="task-item" data-task-id=${id}>
            <div class="task-item__main-container">
                <div class="task-item__main-content">
                  <form class="checkbox-form">
                      <input
                      class="checkbox-form__checkbox"
                      type="checkbox"
                      id=${id}
                      />
                      <label for=${id}></label>
                  </form>
                  <span class='${
                    theme
                      ? "task-item__text task-item__text--dark"
                      : "task-item__text"
                  }'>
                      ${text}
                  </span>
                </div>
                <button
                class='${
                  theme
                    ? "task-item__delete-button default-button delete-button delete-button--dark"
                    : "task-item__delete-button default-button delete-button"
                }'
                >
                Удалить
                </button>
            </div>
        </div>
    `;
}

tasks.forEach(function (task) {
  const newTask = createTask(task.id, task.text);
  tasksList.innerHTML += newTask;
});

function validateTask(tasks, task) {
  const duplicate = tasks.some(({ text }) => task === text);

  let message = "";

  let errorBlock = form.querySelector(".error-message-block");

  if (errorBlock) {
    errorBlock.remove();
  }

  if (task === "") {
    message = "Название задачи не должно быть пустым";
  } else if (duplicate) {
    message = "Задача с таким названием уже существует.";
  }

  if (message) {
    errorBlock = document.createElement("span");
    errorBlock.classList.add("error-message-block");
    errorBlock.textContent = message;
    form.append(errorBlock);
  }

  return message;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = e.target.elements[0].value;

  const message = validateTask(tasks, taskText);

  if (!message) {
    const uniqueId = Date.now();

    tasks.push({
      id: uniqueId.toString(),
      completed: false,
      text: taskText,
    });
    const newTask = createTask(uniqueId, taskText, darkTheme);
    tasksList.innerHTML += newTask;
  }
});

// Задание #3

function createModal() {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal-overlay");
  modalWrapper.classList.add("modal-overlay_hidden");
  const modalDelete = document.createElement("div");
  modalDelete.classList.add("delete-modal");
  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("delete-modal__question");
  modalTitle.textContent = "Вы действительно хотите удалить эту задачу?";
  const modalButtons = document.createElement("div");
  modalButtons.classList.add("delete-modal__buttons");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("delete-modal__button");
  cancelButton.classList.add("delete-modal__cancel-button");
  cancelButton.textContent = "Отмена";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-modal__button");
  deleteButton.classList.add("delete-modal__confirm-button");
  deleteButton.textContent = "Удалить";

  modalButtons.append(cancelButton);
  modalButtons.append(deleteButton);
  modalDelete.append(modalTitle);
  modalDelete.append(modalButtons);
  modalWrapper.append(modalDelete);

  return modalWrapper;
}

const modalWindow = createModal();
body.append(modalWindow);

tasksList.addEventListener("click", function (e) {
  if (e.target.className.includes("task-item__delete-button")) {
    let taskToDeleteAttribute = e.target
      .closest(".task-item")
      .getAttribute("data-task-id");

    const modalWrapper = document.querySelector(".modal-overlay");
    modalWrapper.classList.remove("modal-overlay_hidden");

    const deleteButton = document.querySelector(
      ".delete-modal__confirm-button"
    );
    const cancelButton = document.querySelector(".delete-modal__cancel-button");

    deleteButton.addEventListener("click", function (e) {
      const taskItem = document.querySelector(
        `[data-task-id="${taskToDeleteAttribute}"]`
      );
      if (taskItem) {
        taskItem.remove();
        modalWrapper.classList.add("modal-overlay_hidden");

        // removing task item from the tasks array
        const itemIndex = tasks.findIndex(
          (task) => task.id === taskToDeleteAttribute
        );
        tasks.splice(itemIndex, 1);
        // console.log(tasks);
      }

      return tasks;
    });

    cancelButton.addEventListener("click", function (e) {
      modalWrapper.classList.add("modal-overlay_hidden");
      taskToDeleteAttribute = "";
    });
  }
});

// Задание #4

document.addEventListener("keydown", function (e) {
  // e.preventDefault();
  if (document.querySelector(".task-item")) {
    const taskItems = document.querySelectorAll(".task-item");
    const btns = document.querySelectorAll("button");

    if (e.key === "Tab" && !darkTheme) {
      darkTheme = true;
      body.style.backgroundColor = "#24292E";
      taskItems.forEach((taskItem) => (taskItem.style.color = "#ffffff"));
      btns.forEach((btn) => (btn.style.border = "1px solid #ffffff"));
    } else if (e.key === "Tab" && darkTheme) {
      darkTheme = false;
      body.style.backgroundColor = "initial";
      taskItems.forEach((taskItem) => {
        const taskItemSpans = document.querySelectorAll(".task-item__text");
        // console.log(taskItemSpans);
        taskItemSpans.forEach((taskItemSpan) => {
          if (taskItemSpan.classList.contains("task-item__text--dark")) {
            taskItemSpan.classList.remove("task-item__text--dark");
          }
        });
        // console.log(taskItem.children.children);
        taskItem.style.color = "initial";
      });
      btns.forEach((btn) => (btn.style.border = "none"));
    }
  }
});
