import * as THREE from 'three'

export class BufferTexture {
    constructor () {

        const width = 32, height = 32;
        const size = width * height;
        this.data = new Uint8Array( 4 * size );
        for ( let i = 0; i < size; i ++ ) {
            // const stride = i * 4,
            // a1 = i / size,
            // a2 = i % width / width;
            // // set r, g, b, and alpha data values
            // data[ stride ] = Math.floor(255 * a1);            // red
            // data[ stride + 1 ] = 255 - Math.floor(255 * a1);  // green
            // data[ stride + 2 ] = Math.floor(255 * a2);        // blue
            // data[ stride + 3 ] = 255;                         // alpha

            const stride = i * 4
            this.data[ stride ] = Math.floor(Math.random() * 255)
            this.data[ stride + 1 ] = Math.floor(Math.random() * 255)
            this.data[ stride + 2 ] = Math.floor(Math.random() * 255) 
            this.data[ stride + 3 ] = 255;                         // alpha
        }
        const texture = new THREE.DataTexture(this.data, width, height)
        console.log('YYY', texture)
        texture.needsUpdate = true

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 3, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            })
        );
        this.mesh = plane
        this.texture = texture

        
        this.mesh.position.y = 15 
    }

    update () {
        console.log('YYYY___!!!')
        for (let i = 0; i < 500; ++i) {
            const j = Math.floor(Math.random() * 4000)
            this.texture.image.data[j] = Math.floor(Math.random() * 255)

        }
        //this.texture.image.data = this.data

        this.texture.needsUpdate = true
        this.mesh.material.needsUpdate = true
    }
}