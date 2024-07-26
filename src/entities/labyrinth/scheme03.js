export const createScheme03 = async ({
    width = 21,
    height = 21,
    posStart = [11, 1]
}) => {
    const WIDTH = width
    const HEIGHT = height


    console.assert(WIDTH % 2 === 1 && WIDTH >= 3)
    console.assert(HEIGHT % 2 === 1 && HEIGHT >= 3)

    const EMPTY = 3
    const STAIR = 4
    const WALL = 1
    const [NORTH, SOUTH, EAST, WEST] = ['n', 's', 'e', 'w']

    let maze = {}
    let hasVisited = []
    const posEnd = []

    const makeMap = () => {
        hasVisited = []
        maze = {}
        for (let x = 0; x < WIDTH; ++x) {
            for (let y = 0; y < HEIGHT; ++y) {
                maze[[x, y]] = WALL
            }
        }
    }

    const visit = async (x, y) => {
        posEnd[0] = x
        posEnd[1] = y
        maze[[x, y]] = EMPTY

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


    makeMap()

    hasVisited.push(posStart)
    await visit(...posStart)

    const cont = document.createElement('div')
    const parent = document.getElementById('cont-level-dev')
    cont.innerText = '&&&&&'
    parent.appendChild(cont)

    const wallPrint = "&#9608"
    const emptyPrint = "&nbsp"
    const stairPrint = "a"
    const printMaze = (maze, markX = -1, markY = -1) => {
        cont.innerHTML = ''
        let str = '<pre>'
        for (let y = 0; y < HEIGHT; ++y) {
            for (let x = 0; x < WIDTH; ++x) {
                if (x === posStart[0] && y === posStart[1]) {
                    str += 's'
                    continue;
                }
                if (x === posEnd[0] && y === posEnd[1]) {
                    str += 'e'
                    continue;
                }

                if (maze[x + ',' + y + ''] === WALL) {
                        str += wallPrint
                } else if (maze[x + ',' + y + ''] === EMPTY) {
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


    const markedMaze = {}
    for (let x = 0; x < WIDTH; ++x) {
        for (let y = 0; y < HEIGHT; ++y) {

            if (x === posStart[0] && y === posStart[1]) {
                markedMaze[x + ',' + y] = { type: EMPTY, model: 'START_ROOM' }
                continue;
            }

            if (x === posEnd[0] && y === posEnd[1]) {
                console.log('^^^^')
                markedMaze[x + ',' + y] = { type: EMPTY, model: 'END_ROOM' }
                continue;
            }

            if (maze[x + ',' +  y] === WALL) {
                markedMaze[x + ',' + y] = { type: WALL, model: null }
            }


            if (maze[x + ',' + y] === EMPTY) {
                let isN = false
                let isS = false
                let isW = false
                let isE = false


                markedMaze[x + ',' + y] = { type: EMPTY, model: null, dir: null }

                if (maze[x + ',' + (y - 1)] && maze[x  + ',' + (y - 1)] === EMPTY) {
                    isN = true
                }
                if (maze[x + ',' + (y + 1)] && maze[x + ',' + (y + 1)] === EMPTY) {
                    isS = true
                }
                if (maze[(x - 1) + ',' + y] && maze[(x - 1)  + ',' + y] === EMPTY) {
                    isW = true
                }
                if (maze[(x + 1) + ',' + y] && maze[(x + 1) + ',' + y] === EMPTY) {
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
                if (!isN && !isS && !isW && isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI
                }
                if (!isN && !isS && isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = 0
                }
                if (isN && !isS && !isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI * 1.5
                }
                if (!isN && isS && !isW && !isE) {
                    markedMaze[x + ',' + y].model = 'U'
                    markedMaze[x + ',' + y].dir = Math.PI * .5
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

    return {
        posStart,
        posEnd,
        markedMaze,
    }
}
