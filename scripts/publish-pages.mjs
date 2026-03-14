import { cp, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const buildDir = path.resolve(rootDir, '.pages-dist')

async function replacePath(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.resolve(buildDir, sourceRelativePath)
  const targetPath = path.resolve(rootDir, targetRelativePath)

  await rm(targetPath, { force: true, recursive: true })
  await cp(sourcePath, targetPath, { recursive: true })
}

await replacePath('index.html', 'index.html')
await replacePath('build-assets', 'build-assets')
await replacePath('data', 'data')
