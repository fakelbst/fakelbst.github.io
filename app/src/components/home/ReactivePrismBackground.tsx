import { useEffect, useRef } from 'react'
import type * as THREEType from 'three'

type ShardConfig = {
  mesh: THREEType.Mesh
  pivot: THREEType.Group
  baseY: number
  bobOffset: number
  bobSpeed: number
  spin: THREEType.Vector3
}

export function ReactivePrismBackground() {
  const sceneHostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = sceneHostRef.current

    if (!host) {
      return
    }

    let disposed = false
    let cleanup: (() => void) | undefined

    void import('three')
      .then((THREE) => {
        if (disposed) {
          return
        }

        let resizeObserver: ResizeObserver | null = null
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x050816, 0.12)

        const camera = new THREE.PerspectiveCamera(
          38,
          host.clientWidth / Math.max(host.clientHeight, 1),
          0.1,
          40,
        )
        camera.position.set(0, 0.15, 8.5)

        let renderer: THREEType.WebGLRenderer

        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          })
        } catch {
          return
        }

        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setClearColor(0x000000, 0)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
        renderer.setSize(host.clientWidth, host.clientHeight)
        host.appendChild(renderer.domElement)

        const root = new THREE.Group()
        const shardCluster = new THREE.Group()
        const haloGroup = new THREE.Group()
        const particleField = new THREE.Group()

        scene.add(root)
        root.add(haloGroup)
        root.add(shardCluster)
        root.add(particleField)

        const ambientLight = new THREE.AmbientLight(0xdbefff, 0.65)
        const cyanLight = new THREE.PointLight(0x78f0ff, 18, 18, 2.2)
        const pinkLight = new THREE.PointLight(0xff4fa3, 14, 16, 2.1)
        const goldLight = new THREE.PointLight(0xffd26e, 8, 18, 2)

        cyanLight.position.set(3.8, 1.6, 6)
        pinkLight.position.set(-4.4, -1.8, 5.8)
        goldLight.position.set(0.2, 4.3, 3.4)

        scene.add(ambientLight, cyanLight, pinkLight, goldLight)

        const coreMesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.48, 1),
          new THREE.MeshStandardMaterial({
            color: 0x9cefff,
            emissive: 0x143d54,
            emissiveIntensity: 1.6,
            metalness: 0.14,
            roughness: 0.22,
            flatShading: true,
            transparent: true,
            opacity: 0.5,
          }),
        )

        const innerShell = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.08, 0),
          new THREE.MeshStandardMaterial({
            color: 0xffd9ee,
            emissive: 0xff4fa3,
            emissiveIntensity: 1.15,
            metalness: 0.12,
            roughness: 0.3,
            flatShading: true,
            transparent: true,
            opacity: 0.2,
          }),
        )
        innerShell.rotation.set(0.45, 0.25, -0.2)

        const coreEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.85, 0)),
          new THREE.LineBasicMaterial({
            color: 0x78f0ff,
            transparent: true,
            opacity: 0.65,
          }),
        )

        const accentEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(2.75, 0)),
          new THREE.LineBasicMaterial({
            color: 0xff4fa3,
            transparent: true,
            opacity: 0.78,
          }),
        )
        accentEdges.rotation.set(-0.38, 0.8, 0.32)

        const goldEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(3.35, 0)),
          new THREE.LineBasicMaterial({
            color: 0xffd26e,
            transparent: true,
            opacity: 0.32,
          }),
        )
        goldEdges.rotation.set(0.52, -0.28, -0.46)

        root.add(coreMesh, innerShell, coreEdges, accentEdges, goldEdges)

        const shards: ShardConfig[] = []
        const shardColors = [0x78f0ff, 0xff4fa3, 0xffd26e]

        for (let index = 0; index < 20; index += 1) {
          const radius = THREE.MathUtils.randFloat(2.4, 4.5)
          const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
          const phi = THREE.MathUtils.randFloat(0.5, Math.PI - 0.45)
          const pivot = new THREE.Group()
          const geometry =
            index % 2 === 0
              ? new THREE.TetrahedronGeometry(THREE.MathUtils.randFloat(0.16, 0.34), 0)
              : new THREE.OctahedronGeometry(THREE.MathUtils.randFloat(0.14, 0.28), 0)
          const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
              color: shardColors[index % shardColors.length],
              emissive: shardColors[index % shardColors.length],
              emissiveIntensity: index % 3 === 2 ? 0.4 : 0.7,
              metalness: 0.08,
              roughness: 0.26,
              flatShading: true,
              transparent: true,
              opacity: 0.58,
            }),
          )

          mesh.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta),
          )
          mesh.rotation.set(
            THREE.MathUtils.randFloat(0, Math.PI),
            THREE.MathUtils.randFloat(0, Math.PI),
            THREE.MathUtils.randFloat(0, Math.PI),
          )

          pivot.rotation.set(
            THREE.MathUtils.randFloat(-0.7, 0.7),
            THREE.MathUtils.randFloat(-0.7, 0.7),
            THREE.MathUtils.randFloat(-0.2, 0.2),
          )
          pivot.add(mesh)
          shardCluster.add(pivot)

          shards.push({
            mesh,
            pivot,
            baseY: mesh.position.y,
            bobOffset: THREE.MathUtils.randFloat(0, Math.PI * 2),
            bobSpeed: THREE.MathUtils.randFloat(0.6, 1.4),
            spin: new THREE.Vector3(
              THREE.MathUtils.randFloat(-0.8, 0.8),
              THREE.MathUtils.randFloat(-1.1, 1.1),
              THREE.MathUtils.randFloat(-0.9, 0.9),
            ),
          })
        }

        const orbitA = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(4.15, 0)),
          new THREE.LineBasicMaterial({
            color: 0x78f0ff,
            transparent: true,
            opacity: 0.12,
          }),
        )
        orbitA.rotation.set(0.32, -0.2, 0.54)

        const orbitB = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(4.9, 0)),
          new THREE.LineBasicMaterial({
            color: 0xff4fa3,
            transparent: true,
            opacity: 0.1,
          }),
        )
        orbitB.rotation.set(-0.55, 0.85, -0.3)

        haloGroup.add(orbitA, orbitB)

        const particleCount = 160
        const particlePositions = new Float32Array(particleCount * 3)
        const particleColors = new Float32Array(particleCount * 3)
        const particleColor = new THREE.Color()

        for (let index = 0; index < particleCount; index += 1) {
          const radius = THREE.MathUtils.randFloat(2.8, 6.4)
          const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
          const phi = THREE.MathUtils.randFloat(0.25, Math.PI - 0.25)
          const baseIndex = index * 3

          particlePositions[baseIndex] = radius * Math.sin(phi) * Math.cos(theta)
          particlePositions[baseIndex + 1] = radius * Math.cos(phi) * 0.8
          particlePositions[baseIndex + 2] = radius * Math.sin(phi) * Math.sin(theta)

          particleColor.setHex(shardColors[index % shardColors.length])
          particleColors[baseIndex] = particleColor.r
          particleColors[baseIndex + 1] = particleColor.g
          particleColors[baseIndex + 2] = particleColor.b
        }

        const particles = new THREE.Points(
          new THREE.BufferGeometry(),
          new THREE.PointsMaterial({
            size: 0.055,
            vertexColors: true,
            transparent: true,
            opacity: 0.82,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        )

        particles.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(particlePositions, 3),
        )
        particles.geometry.setAttribute(
          'color',
          new THREE.Float32BufferAttribute(particleColors, 3),
        )
        particleField.add(particles)

        const clock = new THREE.Clock()
        const targetPointer = new THREE.Vector2()
        const smoothPointer = new THREE.Vector2()

        const handlePointerMove = (event: PointerEvent) => {
          const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
          const normalizedY = (event.clientY / window.innerHeight) * 2 - 1

          targetPointer.set(normalizedX, -normalizedY)
        }

        const handlePointerLeave = () => {
          targetPointer.set(0, 0)
        }

        const resizeScene = () => {
          const { clientWidth, clientHeight } = host

          if (!clientWidth || !clientHeight) {
            return
          }

          camera.aspect = clientWidth / clientHeight
          camera.updateProjectionMatrix()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
          renderer.setSize(clientWidth, clientHeight)
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)
        window.addEventListener('blur', handlePointerLeave)

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(resizeScene)
          resizeObserver.observe(host)
        } else {
          window.addEventListener('resize', resizeScene)
        }

        renderer.setAnimationLoop(() => {
          const delta = Math.min(clock.getDelta(), 0.05)
          const elapsed = clock.elapsedTime
          const cursorStrength = prefersReducedMotion ? 0.28 : 1

          smoothPointer.lerp(targetPointer, 1 - Math.exp(-delta * 5))

          root.rotation.y = THREE.MathUtils.damp(
            root.rotation.y,
            smoothPointer.x * 0.42 * cursorStrength + Math.sin(elapsed * 0.28) * 0.08,
            3,
            delta,
          )
          root.rotation.x = THREE.MathUtils.damp(
            root.rotation.x,
            smoothPointer.y * 0.24 * cursorStrength + Math.cos(elapsed * 0.24) * 0.05,
            3,
            delta,
          )
          root.position.x = THREE.MathUtils.damp(
            root.position.x,
            smoothPointer.x * 0.52 * cursorStrength,
            2.6,
            delta,
          )
          root.position.y = THREE.MathUtils.damp(
            root.position.y,
            smoothPointer.y * 0.3 * cursorStrength,
            2.6,
            delta,
          )

          camera.position.x = THREE.MathUtils.damp(
            camera.position.x,
            smoothPointer.x * 0.68 * cursorStrength,
            2.4,
            delta,
          )
          camera.position.y = THREE.MathUtils.damp(
            camera.position.y,
            0.15 + smoothPointer.y * 0.42 * cursorStrength,
            2.4,
            delta,
          )
          camera.lookAt(root.position.x * 0.15, root.position.y * 0.1, 0)

          const pulse =
            1 + Math.sin(elapsed * 1.8) * 0.035 + smoothPointer.length() * 0.05
          coreMesh.scale.setScalar(pulse)
          innerShell.scale.setScalar(0.92 + Math.sin(elapsed * 1.4 + 1.2) * 0.04)

          accentEdges.rotation.y += delta * 0.16
          accentEdges.rotation.z += delta * 0.06
          goldEdges.rotation.x -= delta * 0.1
          goldEdges.rotation.y += delta * 0.04
          coreEdges.rotation.x += delta * 0.08
          haloGroup.rotation.y -= delta * 0.05
          particleField.rotation.y += delta * 0.012
          particleField.rotation.x = smoothPointer.y * 0.1 * cursorStrength

          cyanLight.position.x = 3.8 + smoothPointer.x * 2.6 * cursorStrength
          cyanLight.position.y = 1.6 + smoothPointer.y * 1.6 * cursorStrength
          pinkLight.position.x = -4.4 - smoothPointer.x * 2 * cursorStrength
          pinkLight.position.y = -1.8 + smoothPointer.y * 1.4 * cursorStrength

          for (const shard of shards) {
            shard.pivot.rotation.y += delta * 0.06
            shard.pivot.rotation.z += delta * 0.02
            shard.mesh.rotation.x += delta * shard.spin.x * 0.65
            shard.mesh.rotation.y += delta * shard.spin.y * 0.65
            shard.mesh.rotation.z += delta * shard.spin.z * 0.65
            shard.mesh.position.y =
              shard.baseY + Math.sin(elapsed * shard.bobSpeed + shard.bobOffset) * 0.08
          }

          renderer.render(scene, camera)
        })

        resizeScene()

        cleanup = () => {
          renderer.setAnimationLoop(null)
          resizeObserver?.disconnect()
          window.removeEventListener('resize', resizeScene)
          window.removeEventListener('pointermove', handlePointerMove)
          window.removeEventListener('pointerleave', handlePointerLeave)
          window.removeEventListener('blur', handlePointerLeave)

          scene.traverse((object: THREEType.Object3D) => {
            if ('geometry' in object && object.geometry instanceof THREE.BufferGeometry) {
              object.geometry.dispose()
            }

            if ('material' in object) {
              const { material } = object

              if (Array.isArray(material)) {
                for (const item of material) {
                  item.dispose()
                }
              } else if (material instanceof THREE.Material) {
                material.dispose()
              }
            }
          })

          renderer.dispose()

          if (renderer.domElement.parentElement === host) {
            host.removeChild(renderer.domElement)
          }
        }

        if (disposed) {
          cleanup()
        }
      })
      .catch(() => undefined)

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,240,255,0.08),transparent_28%),radial-gradient(circle_at_50%_56%,rgba(255,79,163,0.06),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,240,255,0.16),transparent_62%)] blur-[72px] md:h-[38rem] md:w-[38rem]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,79,163,0.12),transparent_60%)] blur-[90px] md:h-[32rem] md:w-[32rem]" />

      <div className="relative h-[min(74vh,46rem)] w-[min(74vw,46rem)] min-h-[22rem] min-w-[22rem] max-w-[88vw] max-md:h-[min(58vh,31rem)] max-md:w-[min(88vw,31rem)] [mask-image:radial-gradient(circle_at_center,black_56%,transparent_90%)]">
        <div
          ref={sceneHostRef}
          className="absolute inset-0 touch-none cursor-crosshair"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 border border-white/8 opacity-75 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-orbit-spin motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 border border-dashed border-pink-flare/16 opacity-85 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-orbit-reverse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-[10%] top-[22%] h-px bg-[linear-gradient(90deg,transparent,rgba(120,240,255,0.6),rgba(255,255,255,0.82),transparent)] opacity-85"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[18%] left-[16%] h-px w-[34%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(255,79,163,0.04),rgba(255,79,163,0.78),transparent)] opacity-80"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
