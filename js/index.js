const url = 'http://localhost:3000/monsters';
const monstersDiv = document.getElementById('monster-container');
const createMonsterDiv = document.getElementById('create-monster');
const buttonBack = document.getElementById('back');
const buttonForward = document.getElementById('forward');
let num1;
let num2;


const form = document.createElement('form');
const nameInput = document.createElement('input');
const ageInput = document.createElement('input');
const descriptionInput = document.createElement('input');
const submitMonster = document.createElement('button');
nameInput.type = 'text';
nameInput.placeholder = 'name...';
nameInput.name = 'name';
descriptionInput.type = 'text';
descriptionInput.placeholder = 'description...';
descriptionInput.name = 'description';
ageInput.type = 'text';
ageInput.placeholder = 'age...';
ageInput.name = 'age';
submitMonster.type = 'submit';
submitMonster.textContent = 'Create Monster';

createMonsterDiv.appendChild(form);
form.appendChild(nameInput);
form.appendChild(ageInput);
form.appendChild(descriptionInput);
form.appendChild(submitMonster);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newMonsterName = e.target.name.value;
    let newMonsterAge = e.target.age.value;
    let newMonsterDescription = e.target.description.value;

    postData(newMonsterName, newMonsterAge, newMonsterDescription);
})

function postData(name, age, description) {
    let obj = {
        name: name,
        age: age,
        description: description
    }

    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}



function renderMonsters(monster) {
    let monsterCard = document.createElement('div');
    let name = document.createElement('h1');
    let age = document.createElement('h3');
    let description = document.createElement('p');

    name.textContent = monster.name;
    age.textContent = `Age: ${monster.age}`;
    description.textContent = `Description: ${monster.description}`;

    monstersDiv.appendChild(monsterCard);
    monsterCard.appendChild(name);
    monsterCard.appendChild(age);
    monsterCard.appendChild(description);
}



fetch(url)
.then(resp => resp.json())
.then(data => {

    function limit50(startNum, endNum) {
        num1 = startNum;
        num2 = endNum;
        console.log(num1, num2)
        monstersDiv.innerHTML = '';
        for (let i = num1; i < num2; i++) {
            renderMonsters(data[i])
        } 

        if (num1 === 0) {
            buttonBack.disabled = true;
        } else {
            buttonBack.disabled = false
        }
        if (num2 > data.length) {
            buttonForward.disabled = true;
        }
    }

    buttonForward.addEventListener('click', () => {
        num1+=50;
        num2+=50;
        limit50(num1, num2);
    })

    buttonBack.addEventListener('click', () => {
        num1-=50;
        num2-=50;
        limit50(num1, num2)
    })

    limit50(0, 50);

})