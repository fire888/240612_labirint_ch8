import * as THREE from 'three'
import { _M } from "../../geometry/_m";
import { createTileI } from '../../geometry/tile_I'
import { createTileL } from '../../geometry/tile_L'
import { createTileT } from '../../geometry/tile_T'
import { createTileU } from '../../geometry/tile_U'
import { createStair } from "../../geometry/stair"
import { createTileX } from "../../geometry/tile_X"


import {
    createMesh,
    makeCreaterSquare
} from '../../geometry/helperCreateMesh'


export const createDemoTiles = (data) => {
    const { W, WC, H } = data

    const mesh = new THREE.Object3D()

    const makeScuare = makeCreaterSquare({ w: W })

    const _v = []
    {
        const r = createTileI({ w: W, h: H, wc: WC })
        _v.push(...r.v)

        const line = makeScuare() 
        line.position.z = 15
        line.position.y = 15
        mesh.add(line)
    }

    {
        const r = createTileL({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 2, 0, 0)
        _v.push(...r.v)

        const line = makeScuare() 
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 2
        mesh.add(line)
    }

    {
        const r = createTileT({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 4, 0, 0)
        _v.push(...r.v)

        const line = makeScuare() 
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 4
        mesh.add(line)
    }

    {
        const r = createTileU({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 6, 0, 0)
        _v.push(...r.v)

        const line = makeScuare() 
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 6
        mesh.add(line)
    }

    {
        const stair = createStair({ stairDataBottom: { dir: 'e' }, stairDataTop: { dir: 'w' }, W, WC, H })
        _M.translateVertices(stair.v, W * 9, 0, 0)
        _v.push(...stair.v)

        const line0 = makeScuare() 
        line0.position.z = 15
        line0.position.y = 15
        line0.position.x = W * 8
        mesh.add(line0)

        const line1 = makeScuare() 
        line1.position.z = 15
        line1.position.y = 15
        line1.position.x = W * 9
        mesh.add(line1)

        const line2 = makeScuare() 
        line2.position.z = 15
        line2.position.y = 15
        line2.position.x = W * 10
        mesh.add(line2)
    }


    {
        const r = createTileX({ w: W, h: H, wc: WC })
        _M.translateVertices(r.v, W * 12, 0, 0)
        _v.push(...r.v)

        const line = makeScuare() 
        line.position.z = 15
        line.position.y = 15
        line.position.x = W * 12
        mesh.add(line)
    }

    const m = createMesh({ v: _v, material: new THREE.MeshPhongMaterial({ color: 0xff0000 }) })
    m.position.z = 15
    m.position.y = 15
    mesh.add(m)

    return mesh
}