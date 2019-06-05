import { GAME_LIST_IMG_PLACEHOLDER, UNAVAILABLE_LABEL } from '../constants/general'

function getTestCount (tests) {
  let count = 0
  if (tests) {
    count = tests.length
  }
  return count
}
function getCover (cover) {
  let imgUrl = GAME_LIST_IMG_PLACEHOLDER
  if (cover) {
    imgUrl = cover
  }
  return imgUrl
}
function getCategories (val) {
  if (val) {
    return val.join(', ')
  }
  return UNAVAILABLE_LABEL
}
function getDate (UnixTimestamp) {
  let date
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (UnixTimestamp) {
    date = new Date(UnixTimestamp * 1000)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }
  return UNAVAILABLE_LABEL
}

export default {
  getTestCount,
  getCover,
  getCategories,
  getDate
}
