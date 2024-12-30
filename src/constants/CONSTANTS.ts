type LevelCof = {
    TILES_X: number,
    TILES_Z: number,
    FLOORS_NUM: number  
}

const PLAYER_START_POS: number[] = [15.076315508474185, 3, -10]
const ENERGY_FIRST_POS: number[] = [15.076315508474185, 0, -4]
const ENERGY_PERCENTAGE_MUST_GET: number = .3

const LABS_CONF: LevelCof[] = [
    { TILES_X: 0, TILES_Z: 0, FLOORS_NUM: 0 },
]

const N_LEVELS = 10
//const N_LEVELS = 2
for (let i = 2; i < N_LEVELS; i += 1) {
    let n = i * 2
    if (n % 2 === 0) {
        n += 1
    }
    LABS_CONF.push({ TILES_X: n, TILES_Z: n, FLOORS_NUM: i })
}


export const CONSTANTS = { 
    LABS_CONF,
    PLAYER_START_POS,
    ENERGY_FIRST_POS,
    ENERGY_PERCENTAGE_MUST_GET,
}