import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

const Camera = () => {
  const { nodes } = useGLTF('/level.glb')
  const [rotateY, setRotateY] = useState(0)

  const spring = useSpring({
    'rotation-z': rotateY,
    config: {
      friction: 40
    }
  })

  useEffect(() => {
    let timeout

    const wander = () => {
      setRotateY(Math.random())
      timeout = setTimeout(wander, (1 + Math.random() * 5) * 1000)
    }

    wander()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <a.primitive {...spring} object={nodes.Camera} />
}

export default Camera
