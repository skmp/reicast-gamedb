const linuxSourcePath = 'dist/linux/Reicast-db-linux-'
const archs = [
  '86_64',
  'ia32',
  'arm64',
  'armv7l'
]

const sourcePath = function (path, arch) {
  let src = `${path}${arch}/`
  if (arch === '86_64') {
    src = `${path}x64/`
  }
  return src
}
const linuxOptions = function (arch) {
  return {
    src: sourcePath(linuxSourcePath, arch),
    dest: `dist/installers/linux/${arch}/`,
    arch: arch,
    icon: 'src/statics/reicast-logo.png',
    license: 'other',
    maintainer: 'Kostas Stathakos',
    categories: [ 'Game' ]
  }
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports.linuxRPM = async () => {
  const rpmInstaller = require('electron-installer-redhat')
  await asyncForEach(archs, async arch => {
    await createInstaller(rpmInstaller, linuxOptions(arch))
  })
}
module.exports.linuxDEB = async () => {
  const debInstaller = require('electron-installer-debian')
  await asyncForEach(archs, async arch => {
    await createInstaller(debInstaller, linuxOptions(arch))
  })
}

async function createInstaller (installer, options) {
  console.log(`Creating ${options.arch} package (this may take a while)`)

  try {
    await installer(options)
    console.log(`Successfully created ${options.arch} package at ${options.dest}`)
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}
