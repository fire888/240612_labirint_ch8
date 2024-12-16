import { Root } from "../index";
import { _M } from "geometry/_m";
import * as THREE from 'three'

// // test boxes
// for (let i = 0; i < arrb.length; ++i) {
//     const b = new THREE.Mesh(
//         new THREE.BoxGeometry(.1, .1, .1),
//         new THREE.MeshBasicMaterial({ color: 0xff0000 })
//     )
//     b.position.copy(arrb[i])
//     root.studio.add(b)

//     const b2 = new THREE.Mesh(
//         new THREE.BoxGeometry(.1, .1, .1),
//         new THREE.MeshBasicMaterial({ color: 0xff0000 })
//     )
//     b2.position.copy(arrt[i])
//     root.studio.add(b2)
// }

export class Energy {
    _root: Root
    _v: number[] = []
    init (root: Root, points: any) {
        this._root = root


        const createEn = ({ rad = .6, l = .3, t = 1 }) => {
            const vec1 = new THREE.Vector3(rad, -l, 0)
            const vec2 = new THREE.Vector3(rad, l, 0)
            const vTop = new THREE.Vector3(0, 1, 0)
            const r = .6
    
            const arrb = []
            const arrt = []
    
            let currentAngle = 0 
    
            // cloud points
            while (currentAngle < Math.PI * 2 - r) {
                const v = new THREE.Vector3(_M.ran(r) , _M.ran(r), _M.ran(r)).add(vec1)
                v.applyAxisAngle(vTop, currentAngle)
                arrb.push(v)
    
                const addAngle = .1 + Math.random() * r
                currentAngle += addAngle
    
                const v2 = new THREE.Vector3(_M.ran(r) , _M.ran(r), _M.ran(r)).add(vec2)
                v2.applyAxisAngle(vTop, currentAngle)
                arrt.push(v2)
    
                const addAngle2 = .1 + Math.random() * r
                currentAngle += addAngle2
            }
    
    

    
    
            const v = []
            for (let i = 0; i < arrb.length; ++i) {
                if (i === arrb.length - 1) {
                    v.push(
                        arrb[i].x, arrb[i].y, arrb[i].z,  
                        arrb[0].x, arrb[0].y, arrb[0].z,  
                        arrt[i].x, arrt[i].y, arrt[i].z,
        
                        arrt[0].x, arrt[0].y, arrt[0].z,
                        arrt[i].x, arrt[i].y, arrt[i].z,
                        arrb[0].x, arrb[0].y, arrb[0].z,  
                    )
    
                    v.push(
                        arrt[i].x, arrt[i].y, arrt[i].z,
                        arrt[0].x, arrt[0].y, arrt[0].z,
                        0, t, 0,
                    )
                    v.push(
                        arrb[0].x, arrb[0].y, arrb[0].z,
                        arrb[i].x, arrb[i].y, arrb[i].z,
                        0, -t, 0,
                    )
                    continue;
                }
                v.push(
                    arrb[i].x, arrb[i].y, arrb[i].z,  
                    arrb[i + 1].x, arrb[i + 1].y, arrb[i + 1].z,  
                    arrt[i].x, arrt[i].y, arrt[i].z,
    
                    arrt[i + 1].x, arrt[i + 1].y, arrt[i + 1].z,
                    arrt[i].x, arrt[i].y, arrt[i].z,
                    arrb[i + 1].x, arrb[i + 1].y, arrb[i + 1].z,  
                )
    
                v.push(
                    arrt[i].x, arrt[i].y, arrt[i].z,
                    arrt[i + 1].x, arrt[i + 1].y, arrt[i + 1].z,
                    0, t, 0,
                )
    
                v.push(
                    arrb[i + 1].x, arrb[i + 1].y, arrb[i + 1].z,
                    arrb[i].x, arrb[i].y, arrb[i].z,
                    0, -t, 0,
                )
    
            }

            return v
        } 


        console.log(points)
        //debugger

        for (let i = 0; i < points.length; ++i) {
            for (let j = 0; j < points[i].length; ++j) {
                //if (Math.random() > .7) {
                //    continue;      
                //}

                console.log(points[i])
                const v = createEn({ 
                    t: _M.ran(.5, 2),
                    rad: _M.ran(.1, .2),
                    l: _M.ran(.2, .3),
                })
                const m = _M.createMesh({ 
                    v, 
                    // @ts-ignore:next-line
                    material: new THREE.MeshPhongMaterial({ 
                        color: new THREE.Color(
                            _M.ran(.8, 1),
                            _M.ran(.2, 1),
                            _M.ran(.2, 1),
                        ),
                        envMap: root.loader.assets.sky,
                        reflectivity: _M.ran(.2, 1),
                    }) 
                })
                m.scale.set(.3, .3, .3)
                m.position.x = points[i][j].x
                m.position.y = points[i][j].y + .5
                m.position.z = points[i][j].z
                root.studio.add(m)
                root.ticker.on((t: number) => {
                    m.rotation.y += t * 0.001

                })
            }

        }




        // geom


    }
}