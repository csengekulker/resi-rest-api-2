
const host = 'http://localhost:3000';
const addButton = document.querySelector('#addButton')
const nameElem = document.querySelector('#name')
const cityElem = document.querySelector('#city')
const salaryElem = document.querySelector('#salary')
const tableBody = document.querySelector('#tableBody')


const saveButton = document.querySelector('#saveButton')
const editNameElem = document.querySelector('#nameEdit')
const editCityElem = document.querySelector('#cityEdit')
const editSalaryElem = document.querySelector('#salaryEdit')

var currentTr = null;

addButton.addEventListener('click', () => {
    const name = nameElem.value
    const city = cityElem.value
    const salary = salaryElem.value
    addEmployee(name, city, salary)


});

getEmployees();

function getEmployees() {

  //delete existing table before render
  tableBody.innerHTML = ''

  let endpoint = 'employees'
    fetch(`${host}/${endpoint}`)
    .then(res => res.json())
    .then(res => {
        renderEmployees(res);
    });
}

function renderEmployees(employees) {
    employees.forEach( employee => {
        let tr = document.createElement('tr')
        let tdId = document.createElement('td')
        let tdName = document.createElement('td')
        let tdCity = document.createElement('td')
        let tdSalary = document.createElement('td')

        //delete

        let tdDelete = document.createElement('td')
        let delButton = document.createElement('button')
        delButton.className = "btn btn-danger"
        delButton.innerHTML = '<i class="bi bi-trash3-fill"></i>'
        setDelEvent(delButton, employee.id)
        tdDelete.appendChild(delButton)

        // update
        let tdEdit = document.createElement('td')
        let editButton = document.createElement('button')
        editButton.className = "btn btn-secondary"
        editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>'
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

function setDelEvent(button, id) {
    // delButton.setAttribute('data-id', id);
    button.addEventListener('click', () => {

        delEmployee(id);

        // stores tr element with the clicked delbutton in it
        currentTr = button.parentElement.parentElement

        // remove row from table
        currentTr.parentNode.removeChild(currentTr)
    });
}


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
    })

    nameElem.value = ""
    cityElem.value = ""
    salaryElem.value = ""

    getEmployees()
}

function delEmployee(id) {

  let endpoint = `employees/${id}`

  fetch(`${host}/${endpoint}`, {
    method: "DELETE"
  }).then(
    console.log("Törölve")
  )
}

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
    
  }).then(res => res.json()).then(res => console.log("Frissítve"))
}

function setEditEvent(button, employee) {
  // delButton.setAttribute('data-id', id);
  button.addEventListener('click', () => {
    console.log(employee.name)

    editNameElem.value = employee.name
    editCityElem.value = employee.city
    editSalaryElem.value = employee.salary

    currentTr = button.parentElement.parentElement
  })
}

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