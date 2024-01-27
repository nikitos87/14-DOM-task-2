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

const tasksList = document.querySelector(".tasks-list");

function createTask(id, text) {
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
                <span class="task-item__text">
                    ${text}
                </span>
                </div>
                <button
                class="task-item__delete-button default-button delete-button"
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
