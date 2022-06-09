import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

const Sudo = () => {
  const { nodes } = useGLTF('/level.glb')
  const [rotation, setRotation] = useState([0, 0, 0])

  const spring = useSpring({
    rotation,
    config: {
      friction: 40
    }
  })

  useEffect(() => {
    let timeout

    // Tweak Sudo's head so it rotates cleanly.
    // Ideally, this would be done in Blender
    nodes.SudoHead.position.x -= 0.02
    nodes.SudoHead.position.y -= 0.04
    nodes.SudoHead.position.z += 0.03

    const wander = () => {
      setRotation([0.8 + Math.random() * 0.4, 0.25 + Math.random() * 0.25, 0])
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000)
    }

    wander()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <a.primitive {...spring} rotation-order="YXZ" object={nodes.SudoHead} />
      <primitive object={nodes.Sudo} />
    </>
  )
}

export default Sudo
