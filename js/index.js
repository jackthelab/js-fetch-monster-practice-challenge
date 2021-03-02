const BASE_URL = 'http://localhost:3000/monsters/'

// optional params
// _limit=[number]
// _page=[number]
// example GET http://localhost:3000/monsters/?_limit=20&_page=3
// --> returns items 41-60 because each page is 20 items long and this is the 3rd page

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
    let pageNumber = 1
    document.getElementById('forward').addEventListener('click', () => {
        pageNumber++
        fetchMonsters(pageNumber)
    })
    document.getElementById('back').addEventListener('click', () => {
        pageNumber--
        fetchMonsters(pageNumber)
    })
    document.getElementById('new-monster').addEventListener('submit', newMonster)
})

// async function fetchMonsters(page=1){
//     const response = await fetch(BASE_URL+`?_limit=50&_page=${page}`)
//     const monsterData = await response.json()
    
//     monsterData.forEach(monster => {
//         renderMonster(monster)
//     })
// }

function fetchMonsters(page=1){
    fetch(BASE_URL+`?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(res => {
            document.getElementById('monster-container').innerHTML = ''
            res.forEach(monster => {
                renderMonster(monster)
            })
        })
}

function renderMonster(monster){
    const monsterContainer = document.getElementById('monster-container')

    const monsterCard = document.createElement('div')
        monsterCard.style.border = "thick solid grey"
        monsterCard.style.margin = "1rem"

    const monsterName = document.createElement('h5')
        monsterName.innerText = `Name: ${monster.name}, ${monster.id}`

    const monsterAge = document.createElement('p')
        monsterAge.innerText = `Age: ${monster.age}`
    
    const monsterDescription = document.createElement('p')
        monsterDescription.innerText = `Description: ${monster.description}`
    
    monsterCard.append(monsterName, monsterAge, monsterDescription)

    monsterContainer.appendChild(monsterCard);
}

function newMonster(event){
    event.preventDefault()
    const result = event.target
    // console.log(event.target.name.value)
    // console.log(event.target.age.value)
    // console.log(event.target.description.value)
    // alert("Success")

    const newMonsterObj = {
        name: result.name.value,
        age: result.age.value,
        description: result.description.value
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newMonsterObj)
    }

    fetch(BASE_URL, reqObj)
        .then(res => res.json())
        .then(newMon => {
            alert(`${newMon.name} was successfully added to database. The id is ${newMon.id}`)
            document.getElementById('new-monster').reset()
        })
}