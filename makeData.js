const inputFolder = './data/mdOutput/'
const outputFolder = './src/games/'
const fs = require('fs')
const yaml = require('js-yaml')
const testData = require('./data/testData')

module.exports.mergedData2JSON = function () {
  let output
  let obj
  let filePath
  fs.readdir(inputFolder, (err, files) => {
    files.forEach(file => {
      if (err) {
        console.log(err)
      }
      filePath = `${inputFolder}${file}`
      obj = yaml.safeLoadAll(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      output = outputFolder + file.replace('md', 'json')
      fs.writeFileSync(output, JSON.stringify(obj, null, 2))
    })
  })
}

module.exports.data2IndexList = async function () {
  let output = []
  let obj
  let game
  let name
  let filePath
  try {
    await fs.readdir(inputFolder, (err, files) => {
      files.forEach(file => {
        if (err) {
          console.log(err)
        }
        filePath = `${inputFolder}${file}`
        obj = yaml.safeLoadAll(fs.readFileSync(filePath, { encoding: 'utf-8' }))[0]
        name = file.replace('.md', '')
        game = {
          id: obj.id,
          name: obj.title,
          first_release_date: obj.first_release_date,
          categories: obj.categories,
          cover: getCover(obj.cover),
          popularity: getStrFieldValue(obj.popularity, 0),
          tests: getTestData([obj.id]),
          status: getAverageTestStatus(testData[obj.id])
        }
        output.push(game)
      })
      fs.writeFileSync('src/games/.gameList.json', JSON.stringify(output, null, 2))
    })
  } catch (err) {
    console.log(err)
  }
}

function getAverageTestStatus(tests) {
  let totals = 0
  if (!tests) {
    return 'Untested'
  }
  tests.forEach((key) => {
    const rating = key['Status'].charAt(0)
    if (rating && !isNaN(rating) && rating !==  '') {
      totals += parseInt(rating)
    }
  })
  return (totals / tests.length).toFixed(1)
}

function getTestData (id) {
  let data = testData[id]
  if (data) {
    // length = data.length
    return data
  }
  return null
}

function getCover (obj) {
  if (obj) {
    return obj[0].url
  }
  return null
}

function getStrFieldValue (val, defValue = null) {
  if (val) {
    return val
  }
  return defValue
}
