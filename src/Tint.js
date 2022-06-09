import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { extend, useThree, useFrame } from '@react-three/fiber'

// A modified bloom pass that gives everything a soft, diffused tint.

class TintPass extends UnrealBloomPass {
  constructor(size, tintColor) {
    super(new THREE.Vector2(size.width, size.height))

    this.radius = 0.1
    this.strength = 0.1
    this.threshold = 0

    this.basic.onBeforeCompile = (shader) => {
      shader.uniforms.uContrast = { value: 1.1 }
      shader.uniforms.uOffset = { value: -0.1 }
      shader.uniforms.uTint = { value: new THREE.Color(tintColor) }

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
          #include <common>
          uniform float uContrast;
          uniform float uOffset;
          uniform vec3 uTint;
        `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <output_fragment>',
        `
          gl_FragColor = vec4( outgoingLight, diffuseColor.a );
          gl_FragColor.rgb *= uContrast;
          gl_FragColor.rgb += uOffset;
          gl_FragColor.rgb += uTint;
        `
      )
    }
  }
}

extend({ EffectComposer, RenderPass, TintPass })

const Tint = ({ tintColor = 0x0e0a19, ...rest }) => {
  const { size, gl, scene, camera } = useThree()
  const target = useMemo(
    () =>
      new THREE.WebGLMultisampleRenderTarget(size.width, size.height, {
        generateMipmaps: true,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        encoding: THREE.sRGBEncoding
      }),
    [size.width, size.height]
  )
  const composer = useRef()

  // Hijack the frame loop & manually render
  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer {...rest} ref={composer} args={[gl, target]}>
      <renderPass attachFns={['addPass']} args={[scene, camera]} />
      <tintPass attachFns={['addPass']} args={[size, tintColor]} />
    </effectComposer>
  )
}

export default Tint
