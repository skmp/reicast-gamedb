import { validCategories } from '@/constants/categories'
import { GAME_STATUSES } from '@/constants/general'
import { queryFilters } from '@/router/functions'

const emptyQueryRoute = {
  route: {
    query: {
      status: '',
      category: ''
    }
  }
}

function routeQueryFactory (status, category) {
  if (Array.isArray(status)) {
    status = status.split(',')
  }
  if (Array.isArray(category)) {
    category = category.split(',')
  }
  return {
    query: {
      status: status,
      category: category
    }
  }
}

function statusQueries () {
  let routes = []
  Object.keys(GAME_STATUSES).forEach((key) => {
    routes.push({
      route: routeQueryFactory(GAME_STATUSES[key], '')
    })
  })

  return routes
}

function singleCategoryQueries () {
  let routes = []
  validCategories.forEach((category) => {
    routes.push({
      route: routeQueryFactory('', category)
    })
  })

  return routes
}

function singleQueryCombinations () {
  let routes = []
  Object.keys(GAME_STATUSES).forEach((key) => {
    validCategories.forEach((category) => {
      routes.push({
        route: routeQueryFactory(GAME_STATUSES[key], category)
      })
    })
  })

  return routes
}

export function routeQueriesToTest() {
  return [ emptyQueryRoute ]
    .concat(
      statusQueries(),
      singleCategoryQueries(),
      singleQueryCombinations()
    )
}
