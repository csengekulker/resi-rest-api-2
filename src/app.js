
const host = 'http://localhost:3000';
const addButton = document.querySelector('#addButton');
const nameElem = document.querySelector('#name');
const cityElem = document.querySelector('#city');
const salaryElem = document.querySelector('#salary');
const tableBody = document.querySelector('#tableBody');

var currentTr = null;

addButton.addEventListener('click', () => {
    const name = nameElem.value;
    const city = cityElem.value;
    const salary = salaryElem.value;
    addEmployee(name, city, salary);


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
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCity = document.createElement('td');
        let tdSalary = document.createElement('td');

        //delete

        let tdDelete = document.createElement('td');
        let delButton = document.createElement('button');
        delButton.textContent = 'Törlés';
        setDelEvent(delButton, employee.id);
        tdDelete.appendChild(delButton);

        // update
        let tdEdit = document.createElement('td')
        let editButton = document.createElement('button');
        editButton.textContent = 'Szerkesztés';
        setEditEvent(editButton, employee)
        tdEdit.appendChild(editButton)

    
        tableBody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCity);
        tr.appendChild(tdSalary);
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit)
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        tdCity.textContent = employee.city;
        tdSalary.textContent = employee.salary;
    });
}

function setDelEvent(button, id) {
    // delButton.setAttribute('data-id', id);
    button.addEventListener('click', () => {

        delEmployee(id);

        // stores tr element with the clicked delbutton in it
        currentTr = delButton.parentElement.parentElement

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

    nameElem.innerHTML = ""
    cityElem.innerHTML = ""
    salaryElem.innerHTML = ""

    getEmployees()
}

function delEmployee(id) {

  let endpoint = `employees/${id}`

  fetch(`${host}/${endpoint}`, {
    method: "DELETE"
  }).then(
    console.log("OK")
  )
}

function setEditEvent(button, employee) {
  // delButton.setAttribute('data-id', id);
  button.addEventListener('click', () => {
    console.log(employee.name);
  })
}