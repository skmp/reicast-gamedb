function getMatchingPreviousSiblings (elem, matchSelector) {
  let siblings = []
  let prev = elem.previousElementSibling
  // Loop through all siblings
  while (prev) {
    // If matching element is found add to array
    if (prev.matches(matchSelector)) {
      siblings.push(prev)
    }
    // Get the previous sibling
    prev = prev.previousElementSibling
  }

  return siblings
}

export function getMatchingPreviousSiblingsCount (elem, matchSelector) {
  let siblings = 0
  if (elem) {
    siblings = getMatchingPreviousSiblings(elem, matchSelector).length
  }
  return siblings
}

/**
 * var t = current time
 * var b = start value
 * var c = change in value
 * var d = duration
 */
export function easeInOutQuad (t, b, c, d) {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}
