// const WALL = 1
// const EMPTY = 3
// const STAIR = 4

const EMPTY = 1
const TUNNEL = 3
const STAIR = 3

const [
    NORTH,
    SOUTH,
    EAST,
    WEST
] = ['n', 's', 'e', 'w']


const createMaze = async (width, height, posStart, startDirection) => {
    const WIDTH = width
    const HEIGHT = height

    console.assert(WIDTH % 2 === 1 && WIDTH >= 3)
    console.assert(HEIGHT % 2 === 1 && HEIGHT >= 3)

    let maze = {}
    let hasVisited = []
    const posEnd = []

    const makeMap = () => {
        hasVisited = []
        maze = {}
        for (let x = 0; x < WIDTH; ++x) {
            for (let y = 0; y < HEIGHT; ++y) {
                maze[[x, y]] = EMPTY
            }
        }
    }

    const visit = async (x, y) => {
        posEnd[0] = x
        posEnd[1] = y
        maze[[x, y]] = TUNNEL

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


            const nextInterseption = unvisitetNeighbors[Math.floor(Math.random() * unvisitetNeighbors.length)]

            let nextX, nextY
            if (nextInterseption === NORTH) {
                nextX = x
                nextY = y - 2
                maze[[x, y - 1]] = TUNNEL
            } else if (nextInterseption === SOUTH) {
                nextX = x
                nextY = y + 2
                maze[[x, y + 1]] = TUNNEL
            } else if (nextInterseption === WEST) {
                nextX = x - 2
                nextY = y
                maze[[x - 1, y]] = TUNNEL
            } else if (nextInterseption === EAST) {
                nextX = x + 2
                nextY = y
                maze[[x + 1, y]] = TUNNEL
            }
            hasVisited.push([nextX, nextY])

            await visit(nextX, nextY)
        }
    }

    makeMap()

    hasVisited.push(posStart)
    maze[posStart] = TUNNEL
    const posNext = [...posStart]
    const posNextNext = [...posStart]
    if (startDirection === 's') {
          posNext[1] = posStart[1] + 1
          posNextNext[1] = posStart[1] + 2
    }
    if (startDirection === 'e') {
         posNext[0] = posStart[0] + 1
         posNextNext[0] = posStart[0] + 2
    }
    if (startDirection === 'n') {
         posNext[1] = posStart[1] - 1
         posNextNext[1] = posStart[1] - 2
    }
    if (startDirection === 'w') {
         posNext[0] = posStart[0] - 1
         posNextNext[0] = posStart[0] - 2
    }
    hasVisited.push(
        posNext,
        posNextNext
    )
    maze[posNext] = TUNNEL
    maze[posNextNext] = TUNNEL
    await visit(...posNextNext)

    return { posStart, posEnd, maze, }
}


const debugPrintMaze = (maze, W, H, posStart, posEnd) => {
    const cont = document.createElement('div')
    const parent = document.getElementById('cont-level-dev')
    parent.classList.add('show-over-canvas')
    cont.innerText = '&&&&&'
    parent.appendChild(cont)

    const wallPrint = "&#9608"
    const emptyPrint = "&nbsp"
    const stairPrint = "a"
    const printMaze = (maze, markX = -1, markY = -1) => {
        cont.innerHTML = ''
        let str = '<pre>'
        for (let y = 0; y < H; ++y) {
            for (let x = 0; x < W; ++x) {
                if (x === posStart[0] && y === posStart[1]) {
                    str += 's'
                    continue;
                }
                if (x === posEnd[0] && y === posEnd[1]) {
                    str += 'e'
                    continue;
                }

                if (maze[x + ',' + y + ''] === EMPTY) {
                    str += wallPrint
                } else if (maze[x + ',' + y + ''] === TUNNEL) {
                    str += emptyPrint
                } else if (maze[x + ',' + y + ''] === STAIR) {
                    str += stairPrint
                }
            }
            str += '<br />'
        }
        str += '</pre>'
        cont.innerHTML = str + '<br /><br />'
    }

    printMaze(maze)
}


const addMarksToWays = (maze, W, H) => {
    const markedMaze = {}

    // make way
    for (let x = 0; x < W; ++x) {
        for (let y = 0; y < H; ++y) {
            if (maze[x + ',' +  y] === EMPTY) {
                markedMaze[x + ',' + y] = { type: EMPTY, model: null }
            }


            if (maze[x + ',' + y] === TUNNEL) {
                let isN = false
                let isS = false
                let isW = false
                let isE = false


                markedMaze[x + ',' + y] = { type: TUNNEL, model: null, dir: null }

                if (maze[x + ',' + (y - 1)] && maze[x  + ',' + (y - 1)] === TUNNEL) {
                    isN = true
                }
                if (maze[x + ',' + (y + 1)] && maze[x + ',' + (y + 1)] === TUNNEL) {
                    isS = true
                }
                if (maze[(x - 1) + ',' + y] && maze[(x - 1)  + ',' + y] === TUNNEL) {
                    isW = true
                }
                if (maze[(x + 1) + ',' + y] && maze[(x + 1) + ',' + y] === TUNNEL) {
                    isE = true
                }

                // I
                if (isN && isS && !isW && !isE) {
                    markedMaze[x + ',' + y].model = 'I'
                    markedMaze[x + ',' + y].dir = Math.PI * .5
                }
                if (!isN && !isS && isW && isE) {
                    markedMaze[x + ',' + y].model = 'I'
                    markedMaze[x + ',' + y].dir = 0
                }

                // U
                if (!isN && !isS && isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = 0
                }
                if (!isN && isS && !isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI * .5
                }
                if (!isN && !isS && !isW && isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI
                }
                if (isN && !isS && !isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI * 1.5
                }



                // L
                if (!isN && isS && !isW && isE) {
                    markedMaze[x + ',' + y].model = 'L'
                    markedMaze[x + ',' + y].dir = 0
                }
                if (isN && !isS && !isW && isE) {
                    markedMaze[x + ',' + y].model = 'L'
                    markedMaze[x + ',' + y].dir = Math.PI * .5
                }
                if (isN && !isS && isW && !isE) {
                    markedMaze[x + ',' + y].model = 'L'
                    markedMaze[x + ',' + y].dir = Math.PI
                }
                if (!isN && isS && isW && !isE) {
                    markedMaze[x + ',' + y].model = 'L'
                    markedMaze[x + ',' + y].dir = Math.PI * 1.5
                }


                // T
                if (isN && isS && !isW && isE) {
                    markedMaze[x + ',' + y].model = 'T'
                    markedMaze[x + ',' + y].dir = Math.PI * .5
                }
                if (isN && !isS && isW && isE) {
                    markedMaze[x + ',' + y].model = 'T'
                    markedMaze[x + ',' + y].dir = Math.PI
                }
                if (isN && isS && isW && !isE) {
                    markedMaze[x + ',' + y].model = 'T'
                    markedMaze[x + ',' + y].dir = Math.PI * 1.5
                }
                if (!isN && isS && isW && isE) {
                    markedMaze[x + ',' + y].model = 'T'
                    markedMaze[x + ',' + y].dir = 0
                }

                // X
                if (isN && isS && isW && isE) {
                    markedMaze[x + ',' + y].model = 'X'
                    markedMaze[x + ',' + y].dir = 0
                }
            }
        }
    }

    return markedMaze
}

const addStairsData = (markedMaze, posStart, posEnd) => {
    let endDir = null

    {
        // enter stairs
        let dir = null
        let sI = -1
        let sJ = -1
        for (let i = posEnd[0] - 1; i < posEnd[0] + 2; ++i) {
            for (let j = posEnd[1] - 1; j < posEnd[1] + 2; ++j) {
                if (markedMaze[i + ',' + j].type === TUNNEL) {
                    markedMaze[i + ',' + j].type = EMPTY
                    markedMaze[i + ',' + j].model = null
                    markedMaze[i + ',' + j].dir = null

                    if (i < posEnd[0]) {
                        dir = 'w'
                    }
                    if (i > posEnd[0]) {
                        dir = 'e'
                    }
                    if (j < posEnd[1]) {
                        dir = 'n'
                    }
                    if (j > posEnd[1]) {
                        dir = 's'
                    }
                    sI = i
                    sJ = j
                }
            }
        }
        markedMaze[posEnd[0] + ',' + posEnd[1]] = { type: TUNNEL, model: 'END_ROOM', dir: dir, i: posEnd[0], j: posEnd[1] }

        //console.log('*****)))', dir)
        endDir = dir
    }

    {
        // exit stairs
        let dir = null
        for (let i = posStart[0] - 1; i < posStart[0] + 2; ++i) {
            for (let j = posStart[1] - 1; j < posStart[1] + 2; ++j) {
                if (markedMaze[i + ',' + j].type === TUNNEL) {
                    markedMaze[i + ',' + j].type = EMPTY
                    markedMaze[i + ',' + j].model = null
                    markedMaze[i + ',' + j].dir = null

                    if (i < posStart[0]) {
                        dir = 'w'
                    }
                    if (i > posStart[0]) {
                        dir = 'e'
                    }
                    if (j < posStart[1]) {
                        dir = 'n'
                    }
                    if (j > posStart[1]) {
                        dir = 's'
                    }
                }
            }
        }
        markedMaze[posStart[0] + ',' + posStart[1]] = {type: TUNNEL, model: 'START_ROOM', dir }
    }

    return endDir
}


export const createScheme03 = async ({
    width = 21,
    height = 21,
    posStart = [11, 1],
    startDirection = 's'
}) => {
    const WIDTH = width
    const HEIGHT = height

    const { posEnd, maze } = await createMaze(width, height, posStart, startDirection)
    debugPrintMaze(maze, WIDTH, HEIGHT, posStart, posEnd)
    const markedMaze = addMarksToWays(maze, WIDTH, HEIGHT)
    const endDir = addStairsData(markedMaze, posStart, posEnd)

    console.log(markedMaze)

    return {
        posStart,
        posEnd,
        endDir,
        markedMaze,
    }
}
