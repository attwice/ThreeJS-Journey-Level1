import { useState, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

const Cube = () => {
  const { nodes } = useGLTF('/level.glb')
  const matcap = useTexture('/pink.jpg')
  const [floating, setFloating] = useState(false)
  const [rotation, setRotation] = useState([0, 0, 0])

  const positionSpring = useSpring({
    position: [0, floating ? 0.2 : 0, 0],
    config: {
      friction: 80
    }
  })

  const rotationSpring = useSpring({
    rotation,
    config: {
      friction: 40
    }
  })

  useEffect(() => {
    let timeout
    let rotationX = 0
    let rotationY = 0

    const bounce = () => {
      rotationX += Math.ceil(Math.random() * 3)
      rotationY += Math.ceil(Math.random() * 3)

      setFloating((v) => !v)
      setRotation([rotationX * Math.PI * 0.5, rotationY * Math.PI * 0.5, 0])

      timeout = setTimeout(bounce, 1.5 * 1000)
    }

    bounce()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <a.group {...positionSpring}>
      <a.primitive {...rotationSpring} object={nodes.Cube}>
        <meshMatcapMaterial matcap={matcap} />
      </a.primitive>
    </a.group>
  )
}

export default Cube
