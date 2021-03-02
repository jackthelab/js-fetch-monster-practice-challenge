const BASE_URL = 'http://localhost:3000/monsters/'

// optional params
// _limit=[number]
// _page=[number]
// example GET http://localhost:3000/monsters/?_limit=20&_page=3
// --> returns items 41-60 because each page is 20 items long and this is the 3rd page

document.addEventListener("DOMContentLoaded", () => {
    // let pageNumber = 2
    fetchMonsters()
})

async function fetchMonsters(page=1){
    const response = await fetch(BASE_URL+`?_limit=50&_page=${page}`)
    const monsterData = await response.json()

    console.log(monsterData);
}
