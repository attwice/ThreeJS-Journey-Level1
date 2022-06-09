import { useState, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

const Pyramid = () => {
  const { nodes } = useGLTF('/level.glb')
  const matcap = useTexture('/cyan.jpg')
  const [rotation, setRotation] = useState([0, 0, 0])

  const spring = useSpring({
    rotation,
    config: {
      friction: 80
    }
  })

  useEffect(() => {
    let timeout

    const rotate = () => {
      setRotation([
        (Math.random() - 0.5) * Math.PI * 3,
        0,
        (Math.random() - 0.5) * Math.PI * 3
      ])

      timeout = setTimeout(rotate, (0.5 + Math.random() * 2) * 1000)
    }

    rotate()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <a.primitive {...spring} object={nodes.Pyramid}>
      <meshMatcapMaterial matcap={matcap} />
    </a.primitive>
  )
}

export default Pyramid
