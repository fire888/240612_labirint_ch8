const WIDTH = 203
const HEIGHT = 51

console.assert(WIDTH % 2 === 1 && WIDTH >= 3)
console.assert(HEIGHT % 2 === 1 && HEIGHT >= 3)

const EMPTY = "&nbsp"
const MARK = "@"
const WALL = "&#9608"
const [NORTH, SOUTH, EAST, WEST] = ['n', 's', 'e', 'w']

let maze = {}
let hasVisited = []

const makeMap = () => {
    hasVisited = []
    maze = {}
    for (let x = 0; x < WIDTH; ++x) {
        for (let y = 0; y < HEIGHT; ++y) {
            maze[[x, y]] = WALL
        }
    }
}

const printMaze = (maze, markX, markY) => {
    document.body.innerHTML = ''
    let str = '<pre>'
    for (let y = 0; y < HEIGHT; ++y) {
        for (let x = 0; x < WIDTH; ++x) {
            if (markX === x && markY === y) {
                str += MARK
            } else {
                str += maze[[x, y]]
            }
        }
        str += '<br />'
    }
    str += '</pre>'
    document.body.innerHTML = str
}

const pause = t => new Promise(r => setTimeout(r, t))

const visit = async (x, y) => {
    maze[[x, y]] = EMPTY
    printMaze(maze, x, y)
    await pause(10)

    while(true) {
        const unvisitetNeighbors = []

        if (
            y > 1 &&
            !JSON.stringify(hasVisited).includes(JSON.stringify([x, y - 2]))
        ) {
            unvisitetNeighbors.push(NORTH)
        }
        if (
            y < HEIGHT - 2 &&
            !JSON.stringify(hasVisited).includes(JSON.stringify([x, y + 2]))
        ) {
            unvisitetNeighbors.push(SOUTH)
        }
        if (
            x > 1 &&
            !JSON.stringify(hasVisited).includes(JSON.stringify([x - 2, y]))
        ) {
            unvisitetNeighbors.push(WEST)
        }
        if (
            x < WIDTH - 2 &&
            !JSON.stringify(hasVisited).includes(JSON.stringify([x + 2, y]))
        ) {
            unvisitetNeighbors.push(EAST)
        }
        if (unvisitetNeighbors.length === 0) {
            return
        }


        const nextInterseption = unvisitetNeighbors[
            Math.floor(Math.random() * unvisitetNeighbors.length)
            ]

        let nextX, nextY
        if (nextInterseption === NORTH) {
            nextX = x
            nextY = y - 2
            maze[[x, y - 1]] = EMPTY
        } else if (nextInterseption === SOUTH) {
            nextX = x
            nextY = y + 2
            maze[[x, y + 1]] = EMPTY
        } else if (nextInterseption === WEST) {
            nextX = x - 2
            nextY = y
            maze[[x - 1, y]] = EMPTY
        } else if (nextInterseption === EAST) {
            nextX = x + 2
            nextY = y
            maze[[x + 1, y]] = EMPTY
        }
        hasVisited.push([nextX, nextY])

        await visit(nextX, nextY)
    }
}

const createButton = () => {
    return new Promise(res => {
        const b = document.createElement('button')
        b.innerText = '<------------ REGENERATE ------------>'
        b.style.backgroundColor = 'red'
        b.style.color = 'white'
        b.style.fontWeight = 'bold'
        document.body.appendChild(b)
        b.onclick = res
    })
}

const pipeline = async () => {
    makeMap()
    hasVisited.push(Math.floor(WIDTH / 2), 1)
    await visit(Math.floor(WIDTH / 2), 1)
    await createButton()
    await pipeline()
}

pipeline().then()

