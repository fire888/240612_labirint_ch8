import { Root } from "../index";
import { _M } from "geometry/_m";
import * as THREE from 'three'
import { createEnergyV } from "geometry/energy"
import * as TWEEN from '@tweenjs/tween.js'

export class EnergySystem {
    nameSpace: string = 'collision_energy_'
    collisionsItems: THREE.Object3D[] = []
    _root: Root
    _v: number[] = []
    _collisionMaterial: THREE.MeshBasicMaterial
    _items: any[] = []

    init (root: Root, points: any) {
        this._root = root

        if (!this._collisionMaterial) {
            this._collisionMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
        }

        let namePrefix = 0

        for (let i = 0; i < points.length; ++i) {
            for (let j = 0; j < points[i].length; ++j) {
                const p = points[i][j]

                const { v } = createEnergyV({ 
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
                m.position.x = p.x
                m.position.y = p.y + .5
                m.position.z = p.z
                root.studio.add(m)
                root.ticker.on((t: number) => {
                    m.rotation.y += t * 0.001
                })

                const vCol = _M.createPolygon(
                    [p.x - .5, p.y + .1, p.z + .5],
                    [p.x + .5, p.y + .1, p.z + .5],
                    [p.x + .5, p.y + .1, p.z - .5],
                    [p.x - .5, p.y + .1, p.z - .5],
                )
                const collisionM = _M.createMesh({
                    v: vCol,
                    material: this._collisionMaterial,
                })
                const collisionName = this.nameSpace + namePrefix
                collisionM.name = collisionName
                this._root.phisics.addMeshToCollision(collisionM)

                this._items.push({ collisionName, m, isActive: true })

                ++namePrefix
            }
        }

        const p = { x: 0, y: 0, z: 0 }

        const { v } = createEnergyV({ 
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
        m.position.x = p.x
        m.position.y = p.y + .5
        m.position.z = p.z
        root.studio.add(m)
        root.ticker.on((t: number) => {
            m.rotation.y += t * 0.001
        })

        const r = 2
        const vCol = _M.createPolygon(
            [p.x - r, p.y + .1, p.z + r],
            [p.x + r, p.y + .1, p.z + r],
            [p.x + r, p.y + .1, p.z - r],
            [p.x - r, p.y + .1, p.z - r],
        )
        const collisionM = _M.createMesh({
            v: vCol,
            material: this._collisionMaterial,
        })
        const collisionName = this.nameSpace + 1000 
        collisionM.name = collisionName
        this._root.phisics.addMeshToCollision(collisionM)

        this._items.push({ collisionName, m, isActive: true })
    }

    animateMovieHide (name: string) {
        let item = null
        for (let i = 0; i < this._items.length; ++i) {
            if (this._items[i].collisionName === name) {
                item = this._items[i] 
            }
        }
        if (!item) {
            console.log('not find to hide', name)
        }

        item.isActive = false

        const savedY = item.m.position.y

        const obj = { s: item.m.scale.x, y: 0 }
        new TWEEN.Tween(obj)
            .interpolation(TWEEN.Interpolation.Linear)
            .to({ s: 0, y: .1 }, 500)
            .onUpdate(() => {
                item.m.scale.set(obj.s, obj.s, obj.s)
                item.m.position.y = savedY + obj.y  

            })
            .onComplete(() => {
                this._root.studio.remove(item.m)
                item.m.geometry.dispose()
                item.m.material.dispose()
            })
            .start()
    }

    getPercentageItemsGetted () {
        let count = 0 
        for (let i = 0; i < this._items.length; ++i) {
            if (this._items[i].isActive) {
                continue;
            }
            ++count
        }
        return count / this._items.length
    }

    destroy () {
        for (let i = 0; i < this._items.length; ++i) {
            const { m, collisionName } = this._items[i]
            this._root.studio.remove(m)
            this._items[i].m.geometry.dispose()
            this._items[i].m.material.dispose()
            this._root.phisics.removeMeshFromCollision(collisionName)
        }
        this._items = []
    }
}