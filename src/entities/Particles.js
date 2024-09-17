// https://github.com/mrdoob/three.js/blob/master/examples/webgl_gpgpu_birds.html

export class Particles {
    constructor () {
    }

    init (root) {
        const count = 500
        const size =  Math.ceil(Math.sqrt(count))

        const gl = root.renderer.context
        this._gpgpuRenderer = new GPUComputationRenderer(size, size, gl)
        const texture = gpgpuRenderer.createTexture()

        for (let i = 0; i < count; i++) {
            // const i3 = i * 3;
            const i4 = i * 4;

            texture.image.data[i4 + 0] = (Math.random() - 0.5) * (i / count); // x
            texture.image.data[i4 + 1] = (Math.random() - 0.5) * 2 * (i / count); // y
            texture.image.data[i4 + 2] = (Math.random() - 0.5) * (i / count); // z
            texture.image.data[i4 + 3] = Math.random(); // lifespan
        }

        this._positionsVariable = gpgpuRenderer.addVariable('uPositions', simulationFragmentShader, texture)
        this._positionsVariable.material.uniforms.uTime = { value: 0 }
        this._positionsVariable.material.uniforms.uDeltaTime = { value: 0 }
        this._positionsVariable.material.uniforms.uInitialPositions = { value: texture }
        this._gpgpuRenderer.setVariableDependencies(this._positionsVariable, [this._positionsVariable])
        this._gpgpuRenderer.init()
    }
}