import { validCategories } from '../constants/categories'
import { GAME_STATUSES } from '../constants/general'

/**
 * Removes invalid input (invalid categories) from query
 *
 * - if all input was valid
 * returns empty object
 *
 * - else
 * returns sanitized string in categories property
 *
 * @param categories string
 * @returns object
 */
export function sanitizeCategories (categories) {
  let catArray
  let cleanCatArray
  if (categories) {
    catArray = categories.split(',')
    cleanCatArray = catArray.filter(cat => {
      if (validCategories.includes(cat)) { return cat }
    })
    if (catArray.length !== cleanCatArray.length) {
      return {
        categories: cleanCatArray.join()
      }
    }
  }
  return {}
}

/**
 * Checks if status query input is invalid
 *
 * - if input is valid
 * returns false
 *
 * - else
 * returns true
 *
 * @param status string
 * @returns boolean
 */
export function isInvalidStatus (status) {
  let isInvalidStatus = false
  const validStatuses =
    Object.keys(GAME_STATUSES).map((key) => {
      return GAME_STATUSES[key]
    })
  if (status) {
    if (validStatuses.includes(status)) {
      return false
    }
    isInvalidStatus = true
  }
  return isInvalidStatus
}
