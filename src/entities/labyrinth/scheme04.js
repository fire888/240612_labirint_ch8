import { createRandomDataForLine } from "../../geometry/lineGeomCrafted"
import { _M } from "../../geometry/_m"


const EMPTY = 1
const TUNNEL = 3
const STAIR = 4

const [
    NORTH,
    SOUTH,
    EAST,
    WEST
] = ['n', 's', 'e', 'w']


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

                if (maze[x + ',' + y + ''].type === EMPTY) {
                    str += wallPrint
                } else if (maze[x + ',' + y + ''].type === TUNNEL) {
                    str += emptyPrint
                }
            }
            str += '<br />'
        }
        str += '</pre>'
        cont.innerHTML = str + '<br /><br />'
    }

    printMaze(maze)
}



const createMaze = async (width, height, posStart, startDirection, dataForEnter) => {
    const WIDTH = width
    const HEIGHT = height

    console.assert(WIDTH % 2 === 1 && WIDTH >= 3)
    console.assert(HEIGHT % 2 === 1 && HEIGHT >= 3)

    let maze = {}
    let hasVisited = []
    const posEnd = []
    //const posesSleepEnds = []
    let dirToPosEnd = null
    let pathToPosEnd = null
    let colorToPosEnd = null
    let formToPosEnd = null

    const makeMap = () => {
        hasVisited = []
        maze = {}
        for (let x = 0; x < WIDTH; ++x) {
            for (let y = 0; y < HEIGHT; ++y) {
                maze[[x, y]] = { type: EMPTY, s: null, e: null, n: null, w: null }
            }
        }
    }

    const visit = async (x, y, prevDir, prevForm, prevPath, prevColor) => {        
        // save global for stair
        posEnd[0] = x
        posEnd[1] = y
        dirToPosEnd = prevDir
        pathToPosEnd = prevPath
        colorToPosEnd = prevColor
        formToPosEnd = prevForm

        // current tile mark prev direction 
        maze[[x, y]].type = TUNNEL

        if (prevDir === NORTH) {
            maze[[x, y]][SOUTH] = {
                color: prevColor,
                form: prevForm,
                path: prevPath,
            }
        }
        if (prevDir === SOUTH) {
            maze[[x, y]][NORTH] = {
                color: prevColor,
                form: prevForm,
                path: prevPath,
            }
        }
        if (prevDir === WEST) {
            maze[[x, y]][EAST] = {
                color: prevColor,
                form: prevForm,
                path: prevPath,
            }
        }
        if (prevDir === EAST) {
            maze[[x, y]][WEST] = {
                color: prevColor,
                form: prevForm,
                path: prevPath,
            }
        }



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
                //posesSleepEnds.push({ xI: x, yI: y })
                return
            }

            const nextDir = unvisitetNeighbors[Math.floor(Math.random() * unvisitetNeighbors.length)]
            const randomData1 = createRandomDataForLine()
            const currentData = { form: randomData1.form, path: randomData1.path, color: randomData1.color }

            const randomData2 = createRandomDataForLine()
            const nextData = { form: randomData2.form, path: randomData2.path, color: randomData2.color }

            let nextX, nextY
            if (nextDir === NORTH) {
                maze[[x, y]][NORTH] = currentData

                maze[[x, y - 1]].type = TUNNEL
                maze[[x, y - 1]][SOUTH] = currentData
                maze[[x, y - 1]][NORTH] = nextData

                nextX = x
                nextY = y - 2    
            } else if (nextDir === SOUTH) {
                maze[[x, y]][SOUTH] = currentData
                
                maze[[x, y + 1]].type = TUNNEL
                maze[[x, y + 1]][NORTH] = currentData
                maze[[x, y + 1]][SOUTH] = nextData

                nextX = x
                nextY = y + 2
            } else if (nextDir === WEST) {
                maze[[x, y]][WEST] = currentData

                maze[[x - 1, y]].type = TUNNEL
                maze[[x - 1, y]][EAST] = currentData
                maze[[x - 1, y]][WEST] = nextData

                nextX = x - 2
                nextY = y

            } else if (nextDir === EAST) {
                maze[[x, y]][EAST] = currentData

                maze[[x + 1, y]].type = TUNNEL
                maze[[x + 1, y]][WEST] = currentData
                maze[[x + 1, y]][EAST] = nextData

                nextX = x + 2
                nextY = y
            }
            hasVisited.push([nextX, nextY])

            await visit(nextX, nextY, nextDir, nextData.form, nextData.path, nextData.color)
        }
    }

    makeMap()

    hasVisited.push(posStart)
    maze[posStart] = { type: STAIR }
    const posNext = [...posStart]
    const posNextNext = [...posStart]
    let startGatesDir = null

    if (startDirection === 's') {
        posNext[1] = posStart[1] + 1
        posNextNext[1] = posStart[1] + 2
        startGatesDir = NORTH
    }
    if (startDirection === 'e') {
        posNext[0] = posStart[0] + 1
        posNextNext[0] = posStart[0] + 2
        startGatesDir = WEST
    }
    if (startDirection === 'n') {
        posNext[1] = posStart[1] - 1
        posNextNext[1] = posStart[1] - 2
        startGatesDir = SOUTH
    }
    if (startDirection === 'w') {
        posNext[0] = posStart[0] - 1
        posNextNext[0] = posStart[0] - 2
        startGatesDir = EAST
    }
    hasVisited.push(
        posNext,
        posNextNext
    )
    maze[posNext] = { type: STAIR }
    maze[posNextNext] = { type: TUNNEL }
    maze[posNextNext][startGatesDir] = dataForEnter

    await visit(...posNextNext)

    return { 
        posStart, 
        posEnd, 
        dirToPosEnd,
        pathToPosEnd,
        colorToPosEnd,
        formToPosEnd, 
        maze,
        //posesSleepEnds,
    }
}




const addStairsData = (maze, posStart, posEnd) => {
    let endDir = null

    {
        // exit stair from level
        let dir = null
        let sI = -1
        let sJ = -1
        for (let i = posEnd[0] - 1; i < posEnd[0] + 2; ++i) {
            for (let j = posEnd[1] - 1; j < posEnd[1] + 2; ++j) {
                if (maze[i + ',' + j].type === TUNNEL) {
                    maze[i + ',' + j] = { type: EMPTY, s: null, e: null, n: null, w: null }
                }
            }
        }
        maze[posEnd[0] + ',' + posEnd[1]] = { type: STAIR }
        endDir = dir
    }
}


const prepareSleepEndPoints = maze => {
    const sleepPoints = []
    for (let key in maze) {
        if (maze[key].type === 1) {
            continue;
        }

        let n = 0
        if (maze[key].n) ++n
        if (maze[key].e) ++n
        if (maze[key].s) ++n
        if (maze[key].w) ++n

        if (n !== 1) {
            continue;
        }

        const coordsI = key.split(',')
        sleepPoints.push({ xI: +coordsI[0], yI: ++coordsI[1] })
    }

    return sleepPoints
} 


export const createScheme04_crafted = async ({
    width = 21,
    height = 21,
    posStart = [11, 1],
    posStartDir = 's',
    dataForEnter,
}) => {

    const { 
        posEnd, 
        dirToPosEnd,
        pathToPosEnd,
        colorToPosEnd,
        formToPosEnd, 
        maze,
        //posesSleepEnds,
    } = await createMaze(width, height, posStart, posStartDir, dataForEnter)
    
    addStairsData(maze, posStart, posEnd)
    const posesSleepEnds = prepareSleepEndPoints(maze)

    return {
        maze,
        posStart,
        posEnd, 
        dirToPosEnd,
        pathToPosEnd,
        colorToPosEnd,
        formToPosEnd,
        posesSleepEnds,
    }
}
