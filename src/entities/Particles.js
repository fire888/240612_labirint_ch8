import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_gpgpu_birds.html


const fragmentSaderPos = 
`
uniform float time;
uniform float delta;

void main()	{

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePosition, uv );
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;

    float phase = tmpPos.w;

    phase = mod( ( phase + delta +
        length( velocity.xz ) * delta * 3. +
        max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

    gl_FragColor = vec4( position + velocity * delta * 15. , phase );

}`


const fragmentSaderVel = 
`
uniform float time;
uniform float testing;
uniform float delta; // about 0.016
uniform float separationDistance; // 20
uniform float alignmentDistance; // 40
uniform float cohesionDistance; //
uniform float freedomFactor;
uniform vec3 predator;

const float width = resolution.x;
const float height = resolution.y;

const float PI = 3.141592653589793;
const float PI_2 = PI * 2.0;
// const float VISION = PI * 0.55;

float zoneRadius = 40.0;
float zoneRadiusSquared = 1600.0;

float separationThresh = 0.45;
float alignmentThresh = 0.65;

const float UPPER_BOUNDS = BOUNDS;
const float LOWER_BOUNDS = -UPPER_BOUNDS;

const float SPEED_LIMIT = 9.0;

float rand( vec2 co ){
    return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
}

void main() {

    zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
    separationThresh = separationDistance / zoneRadius;
    alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
    zoneRadiusSquared = zoneRadius * zoneRadius;


    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 birdPosition, birdVelocity;

    vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
    vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

    float dist;
    vec3 dir; // direction
    float distSquared;

    float separationSquared = separationDistance * separationDistance;
    float cohesionSquared = cohesionDistance * cohesionDistance;

    float f;
    float percent;

    vec3 velocity = selfVelocity;

    float limit = SPEED_LIMIT;

    dir = predator * UPPER_BOUNDS - selfPosition;
    dir.z = 0.;
    // dir.z *= 0.6;
    dist = length( dir );
    distSquared = dist * dist;

    float preyRadius = 150.0;
    float preyRadiusSq = preyRadius * preyRadius;


    // move birds away from predator
    if ( dist < preyRadius ) {

        f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
        velocity += normalize( dir ) * f;
        limit += 5.0;
    }


    // if (testing == 0.0) {}
    // if ( rand( uv + time ) < freedomFactor ) {}


    // Attract flocks to the center
    vec3 central = vec3( 0., 0., 0. );
    dir = selfPosition - central;
    dist = length( dir );

    dir.y *= 2.5;
    velocity -= normalize( dir ) * delta * 5.;

    for ( float y = 0.0; y < height; y++ ) {
        for ( float x = 0.0; x < width; x++ ) {

            vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
            birdPosition = texture2D( texturePosition, ref ).xyz;

            dir = birdPosition - selfPosition;
            dist = length( dir );

            if ( dist < 0.0001 ) continue;

            distSquared = dist * dist;

            if ( distSquared > zoneRadiusSquared ) continue;

            percent = distSquared / zoneRadiusSquared;

            if ( percent < separationThresh ) { // low

                // Separation - Move apart for comfort
                f = ( separationThresh / percent - 1.0 ) * delta;
                velocity -= normalize( dir ) * f;

            } else if ( percent < alignmentThresh ) { // high

                // Alignment - fly the same direction
                float threshDelta = alignmentThresh - separationThresh;
                float adjustedPercent = ( percent - separationThresh ) / threshDelta;

                birdVelocity = texture2D( textureVelocity, ref ).xyz;

                f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                velocity += normalize( birdVelocity ) * f;

            } else {

                // Attraction / Cohesion - move closer
                float threshDelta = 1.0 - alignmentThresh;
                float adjustedPercent;
                if( threshDelta == 0. ) adjustedPercent = 1.;
                else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

                f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

                velocity += normalize( dir ) * f;

            }

        }

    }



    // this make tends to fly around than down or up
    // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

    // Speed Limits
    if ( length( velocity ) > limit ) {
        velocity = normalize( velocity ) * limit;
    }

    gl_FragColor = vec4( velocity, 1.0 );
}`

export class Particles {
    constructor () {
    }

    init (root) {
        const WIDTH = 32;
        const BOUNDS = 800, BOUNDS_HALF = BOUNDS / 2;


        function fillPositionTexture( texture ) {

            const theArray = texture.image.data;

            for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

                const x = Math.random() * BOUNDS - BOUNDS_HALF;
                const y = Math.random() * BOUNDS - BOUNDS_HALF;
                const z = Math.random() * BOUNDS - BOUNDS_HALF;

                theArray[ k + 0 ] = x;
                theArray[ k + 1 ] = y;
                theArray[ k + 2 ] = z;
                theArray[ k + 3 ] = 1;

            }

        }

        function fillVelocityTexture( texture ) {

            const theArray = texture.image.data;

            for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

                const x = Math.random() - 0.5;
                const y = Math.random() - 0.5;
                const z = Math.random() - 0.5;

                theArray[ k + 0 ] = x * 10;
                theArray[ k + 1 ] = y * 10;
                theArray[ k + 2 ] = z * 10;
                theArray[ k + 3 ] = 1;

            }

        }




        this.m = new THREE.Object3D()



        const gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, root.studio.renderer );

        const dtPosition = gpuCompute.createTexture();
        const dtVelocity = gpuCompute.createTexture();
        fillPositionTexture( dtPosition );
        fillVelocityTexture( dtVelocity );

        const velocityVariable = gpuCompute.addVariable( 'textureVelocity', fragmentSaderVel, dtVelocity )
        const positionVariable = gpuCompute.addVariable( 'texturePosition', fragmentSaderPos, dtPosition )

        gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
        gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

        const positionUniforms = positionVariable.material.uniforms;
        const velocityUniforms = velocityVariable.material.uniforms;

        positionUniforms[ 'time' ] = { value: 0.0 };
        positionUniforms[ 'delta' ] = { value: 0.0 };

        velocityUniforms[ 'time' ] = { value: 1.0 };
        velocityUniforms[ 'delta' ] = { value: 0.0 };
        velocityUniforms[ 'testing' ] = { value: 1.0 };
        velocityUniforms[ 'separationDistance' ] = { value: 1.0 };
        velocityUniforms[ 'alignmentDistance' ] = { value: 1.0 };
        velocityUniforms[ 'cohesionDistance' ] = { value: 1.0 };
        velocityUniforms[ 'freedomFactor' ] = { value: 1.0 };
        velocityUniforms[ 'predator' ] = { value: new THREE.Vector3() };

        velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

        velocityVariable.wrapS = THREE.RepeatWrapping;
        velocityVariable.wrapT = THREE.RepeatWrapping;
        positionVariable.wrapS = THREE.RepeatWrapping;
        positionVariable.wrapT = THREE.RepeatWrapping;

        const error = gpuCompute.init()

        if ( error !== null ) {
            console.error(error)
        }

        let a = 0

        root.ticker.on(() => {
            a += .001
            positionUniforms[ 'time' ].value = a
            positionUniforms[ 'delta' ].value = a
            velocityUniforms[ 'time' ].value = a
            velocityUniforms[ 'delta' ].value = a
            //birdUniforms[ 'time' ].value = now;
            //birdUniforms[ 'delta' ].value = a

            velocityUniforms[ 'predator' ].value.set(a, a, 0)

            //console.log('&&&&&___')
            gpuCompute.compute()

            const rt = gpuCompute.getCurrentRenderTarget( positionVariable )
            console.log(rt)
        })
    }

    update () {

    }
}