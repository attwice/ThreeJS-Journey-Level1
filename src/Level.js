import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/three'

const Level = () => {
  const { nodes } = useGLTF('/level.glb')
  const { camera } = useThree()

  // Intro camera animation
  useSpring({
    from: {
      y: camera.position.y + 5
    },
    to: {
      y: camera.position.y
    },
    delay: 300,
    config: {
      friction: 100
    },
    onChange({ value }) {
      const { y } = value
      camera.position.y = y
      camera.lookAt(0, 0, 0)
    }
  })

  return <primitive object={nodes.Level} />
}

export default Level
