import {
  SMALL_COVER_PLACEHOLDER,
  LARGE_COVER_PLACEHOLDER,
  UNAVAILABLE_LABEL,
  UNTESTED_LABEL,
  GAME_STATUSES,
  STATUS,
  STATUS_SEPARATOR
} from '../constants/general'

/**
 *
 * @param tests
 * @returns {number}
 */
export function getTestCount (tests) {
  let count = 0
  if (tests) {
    count = tests.length
  }
  return count
}

/*eslint-disable */
/**
 * igdb image sizes
 * https://igdb.github.io/api/references/images/
 *
 * Name	            Size	         Extra
 * ---------------------------------------------------
 * cover_small	    90 x 128	    Fit
 * screenshot_med	  569 x 320	    Lfill, Center gravity
 * cover_big	      264 x 374	    Fit
 * logo_med	        284 x 160	    Fit
 * screenshot_big	  889 x 500	    Lfill, Center gravity
 * screenshot_huge	1280 x 720	  Lfill, Center gravity
 * thumb	          90 x 90	      Thumb, Center gravity
 * micro	           35 x 35	    Thumb, Center gravity
 * 720p	            1280 x 720	   Fit, Center gravity
 * 1080p	          1920 x 1080	   Fit, Center gravity
 * ----------------------------------------------------
 * appending _2x to any size, you can get retina (DPR 2.0) sizes
 *
 * @param url
 * @param size
 * @returns string
 */
/* eslint-enable */
export function getImage (url, size = null) {
  let imgUrl = SMALL_COVER_PLACEHOLDER
  if (url) {
    return size
      ? url.replace('t_thumb', `t_${size}_2x`) : url
  }
  if (size) {
    return LARGE_COVER_PLACEHOLDER
  }

  return imgUrl
}

/**
 *
 * @param val
 * @returns string
 */
export function getCategories (val) {
  if (val) {
    return val.join(', ')
  }
  return UNAVAILABLE_LABEL
}

/**
 *
 * @param UnixTimestamp
 * @returns string
 */
export function getDate (UnixTimestamp) {
  let date
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (UnixTimestamp) {
    date = new Date(UnixTimestamp * 1000)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }
  return UNAVAILABLE_LABEL
}

/**
 *
 * @param status
 * @returns number | null
 */
export function getStars (status) {
  if (status === UNTESTED_LABEL) {
    return null
  }
  return parseInt(status)
}

/**
 *
 * @param statusClass
 * @returns null | number
 */
export function getStarsFromClass (statusClass) {
  if (statusClass) {
    if (statusClass === GAME_STATUSES.STATUS__X) {
      return null
    } else {
      return parseInt(statusClass.replace(`${STATUS}${STATUS_SEPARATOR}`, ''))
    }
  }
  return 5
}

/**
 *
 * @param status
 * @returns string | null
 */

export function computeStatusClass (status) {
  const statusInt = parseInt(status)
  if (status === UNTESTED_LABEL) {
    return GAME_STATUSES.STATUS__X
  } else if (statusInt < 1) {
    return GAME_STATUSES.STATUS__0
  } else if (statusInt < 2) {
    return GAME_STATUSES.STATUS__1
  } else if (statusInt < 3) {
    return GAME_STATUSES.STATUS__2
  } else if (statusInt < 4) {
    return GAME_STATUSES.STATUS__3
  } else if (statusInt < 5) {
    return GAME_STATUSES.STATUS__4
  } else if (statusInt < 6) {
    return GAME_STATUSES.STATUS__5
  } else {
    return null
  }
}
