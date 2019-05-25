const inputFolder = './data/mdOutput/'
const outputFolder = './src/games/'
const fs = require('fs')
const yaml = require('js-yaml')

module.exports.data2JSON = function () {
  let output
  let obj
  let filePath
  fs.readdir(inputFolder, (err, files) => {
    files.forEach(file => {
      if(err) {
        console.log(err)
      }
      filePath = `${inputFolder}${file}`
      obj = yaml.safeLoadAll(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      output = outputFolder + file.replace('md', 'json')
      fs.writeFileSync(output, JSON.stringify(obj, null, 2))
    })
  })
}
