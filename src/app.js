
let host = 'http://localhost:3000';
const addButton = document.querySelector('#addButton')
const nameElem = document.querySelector('#name')
const cityElem = document.querySelector('#city')
const salaryElem = document.querySelector('#salary')
const tableBody = document.querySelector('#tableBody')

const editForm = document.querySelector(".editForm")
const saveButton = document.querySelector('#saveButton')
const editNameElem = document.querySelector('#nameEdit')
const editCityElem = document.querySelector('#cityEdit')
const editSalaryElem = document.querySelector('#salaryEdit')

const confirmDelButton = document.querySelector('#confirmDelButton')

var currentTr = null;

function renderEmployees(employees) {
  employees.forEach( employee => {
    let tr = document.createElement('tr')
    tr.id = employee.id
    let tdId = document.createElement('td')
    let tdName = document.createElement('td')
    let tdCity = document.createElement('td')
    let tdSalary = document.createElement('td')

    //delete

    let tdDelete = document.createElement('td')
    let delButton = document.createElement('button')
    delButton.className = "btn btn-danger"
    delButton.innerHTML = '<i class="bi bi-trash3-fill"></i>'

    delButton.addEventListener('click', () => {
      setDelEvent(confirmDelButton, employee.id)
    })

    delButton.setAttribute('data-bs-toggle', 'modal')
    delButton.setAttribute('data-bs-target', '#confirmDeletionModal')
    tdDelete.appendChild(delButton)

    // edit

    let tdEdit = document.createElement('td')
    let editButton = document.createElement('button')
    editButton.className = "btn btn-secondary"
    editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>'

    editButton.setAttribute('data-bs-toggle', 'modal')
    editButton.setAttribute('data-bs-target', '#editModal')

    setEditEvent(editButton, employee)
    tdEdit.appendChild(editButton)


    tableBody.appendChild(tr)
    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdCity)
    tr.appendChild(tdSalary)
    tr.appendChild(tdEdit)
    tr.appendChild(tdDelete)
    tdId.textContent = employee.id
    tdName.textContent = employee.name
    tdCity.textContent = employee.city
    tdSalary.textContent = employee.salary
  });
}

function getEmployees() {

  //delete existing table before new render
  tableBody.innerHTML = ''

  let endpoint = 'employees'
    fetch(`${host}/${endpoint}`)
    .then(res => res.json())
    .then(res => {
        renderEmployees(res);
    });
}

getEmployees()

//add

function addEmployee(name, city, salary) {

  let endpoint = 'employees'
    fetch(`${host}/${endpoint}`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            city: city,
            salary: salary
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        getEmployees()

        nameElem.value = ""
        cityElem.value = ""
        salaryElem.value = ""
    })
}

//delete

function delEmployee(id) {

  let endpoint = `employees/${id}`

  fetch(`${host}/${endpoint}`, {
    method: "DELETE"
  }).then(
    console.log("T??r??lve")
  )
}

//update

function updateEmployee(id, name, city, salary) {
  let endpoint = `employees/${id}`

  fetch(`${host}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      city: city,
      salary: salary
    })
    
  }).then(res => res.json()).then(res => console.log("Friss??tve"))
}


function setDelEvent(button, id) {
  // delButton.setAttribute('data-id', id);
  button.addEventListener('click', () => {

      currentTr = document.getElementById(id)

      delEmployee(id)
      currentTr.remove()

  });
}


function setEditEvent(button, employee) {
  // delButton.setAttribute('data-id', id);
  button.addEventListener('click', () => {

    editNameElem.value = employee.name
    editCityElem.value = employee.city
    editSalaryElem.value = employee.salary

    console.log("Lefut a setEditEvent");

    currentTr = button.parentElement.parentElement
  })
}

addButton.addEventListener('click', () => {
  const name = nameElem.value
  const city = cityElem.value
  const salary = salaryElem.value
  addEmployee(name, city, salary)

});

saveButton.addEventListener('click', () => {
  let id = currentTr.childNodes[0].textContent

  currentTr.childNodes[1].textContent = editNameElem.value
  currentTr.childNodes[2].textContent = editCityElem.value
  currentTr.childNodes[3].textContent = editSalaryElem.value

  //save to db
  updateEmployee(
    id,
    editNameElem.value,
    editCityElem.value,
    editSalaryElem.value
  )

  editNameElem.value = ""
  editCityElem.value = ""
  editSalaryElem.value = ""
})