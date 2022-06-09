import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'

// Modified from https://twitter.com/0xca0a/status/1464545129893617666.
// This is a flexible version that I might add to Drei if we can get
// react-native support for use-gesture.

const Controls = ({
  children,
  config,
  minPolarAngle = Math.PI / -4,
  maxPolarAngle = Math.PI / 2,
  rotation = [0, 0, 0],
  ...props
}) => {
  const { scene, invalidate, size, gl } = useThree()
  const [spring, api] = useSpring(() => ({
    ...props,
    rotation,
    config: {
      tension: 350,
      mass: 2,
      friction: 20,
      precision: 0.0001,
      ...config
    },
    onChange({ value }) {
      const { rotation } = value
      const [x, y, z] = rotation

      // If controls has no children, rotate the scene instead
      if (!children) scene.rotation.set(x, y, z)

      invalidate()
    }
  }))

  useDrag(
    ({ movement: [x], down }) => {
      const [y, , z] = rotation
      x = THREE.MathUtils.clamp(x / size.width, minPolarAngle, maxPolarAngle)

      api.start({
        rotation: down ? [y, x * 1.25, z] : rotation
      })
    },
    { target: gl.domElement }
  )

  return <a.group {...spring}>{children}</a.group>
}

export default Controls
