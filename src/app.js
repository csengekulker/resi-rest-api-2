
const url = 'http://localhost:3000/employees';
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
    fetch(url)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
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

        let tdDelete = document.createElement('td');
        let delButton = document.createElement('button');
        delButton.textContent = 'Törlés';
        setEvent(delButton, employee.id);
        tdDelete.appendChild(delButton);

        tableBody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCity);
        tr.appendChild(tdSalary);
        tr.appendChild(tdDelete);
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        tdCity.textContent = employee.city;
        tdSalary.textContent = employee.salary;
        // console.log(employee.city);
    });
}

function setEvent(delButton, id) {
    // delButton.setAttribute('data-id', id);
    delButton.addEventListener('click', () => {


        delEmployee(id);

        // stores tr element with the clicked delbutton in it
        currentTr = delButton.parentElement.parentElement

        // remove row from table
        currentTr.parentNode.removeChild(currentTr)
    });
}

function addEmployee(name, city, salary) {
    fetch(url, {
        method: "post",
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
        console.log(res);
    });
}

function delEmployee(id) {
  // console.log(delButton.dataset.id);
  console.log(id);
  console.log(`${url}/${id}`);

  fetch(`${url}/${id}`, {
    method: "DELETE"
  }).then(
    console.log("OK")
  )
}