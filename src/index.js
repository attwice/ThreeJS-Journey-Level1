// Original and the models by Bruno Simon: https://threejs-journey.com
// See tweet for full attribution and source models from Bruno himself
// https://twitter.com/Cody_J_Bennett/status/1466002039964680193

import { render } from 'react-dom'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import Tint from './Tint'
import Controls from './Controls'
import Level from './Level'
import Sudo from './Sudo'
import Camera from './Camera'
import Cactus from './Cactus'
import Cube from './Cube'
import Pyramid from './Pyramid'

render(
  <Suspense fallback={<Loader />}>
    <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [5, 1, 5] }}>
      <color attach="background" args={[0xd0cbff]} />
      <Tint />
      <Controls />
      <group dispose={null} position-y={-0.75}>
        <Level />
        <Sudo />
        <Camera />
        <Cactus />
        <Cube />
        <Pyramid />
      </group>
    </Canvas>
  </Suspense>,
  document.getElementById('root')
)
