export const createScheme = async (WIDTH = 21, HEIGHT = 21) => {


    console.assert(WIDTH % 2 === 1 && WIDTH >= 3)
    console.assert(HEIGHT % 2 === 1 && HEIGHT >= 3)

    const EMPTY = 0
    const MARK = 2
    const WALL = 1
    const [NORTH, SOUTH, EAST, WEST] = ['n', 's', 'e', 'w']

    let maze = {}
    let hasVisited = []

    const makeMap = () => {
        hasVisited = []
        maze = {}
        for (let x = 0; x < WIDTH; ++x) {
            for (let y = 0; y < HEIGHT; ++y) {
                maze[[x, y]] = { type: WALL, }
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

    const visit = async (x, y, dir) => {
        maze[[x, y]] = { type: EMPTY, dir }
        //printMaze(maze, x, y)
        //await pause(10)

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

            let nextX, nextY, dir
            if (nextInterseption === NORTH) {
                nextX = x
                nextY = y - 2
                dir = NORTH
                maze[[x, y - 1]] = { type: EMPTY, dir: NORTH }
            } else if (nextInterseption === SOUTH) {
                nextX = x
                nextY = y + 2
                dir = SOUTH
                maze[[x, y + 1]] = { type: EMPTY, dir: SOUTH }
            } else if (nextInterseption === WEST) {
                nextX = x - 2
                nextY = y
                dir = WEST
                maze[[x - 1, y]] = { type: EMPTY, dir: WEST }
            } else if (nextInterseption === EAST) {
                nextX = x + 2
                nextY = y
                dir = EAST
                maze[[x + 1, y]] = { type: EMPTY, dir: EAST }
            }
            hasVisited.push([nextX, nextY])

            await visit(nextX, nextY, dir)
        }
    }

    makeMap()
    hasVisited.push(Math.floor(WIDTH / 2), 1)
    await visit(Math.floor(WIDTH / 2), 1)

    console.log(maze)

    return maze
}
