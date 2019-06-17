import { SECTION_CLASSES, GAME_STATUSES, UNTESTED_LABEL } from '../../constants/general'
export default {
  app: {
    name: 'Reicast db',
    copyright: 'reicast.com',
    description: 'Reicast Game Compatibility Database',
    long_description: 'Discover how well your favorite Dreamcast games are supported on Reicast emulator' +
      ' and other useful info.',
    version: '0.0.1',
    links: 'Reicast Links'
  },
  appLinks: {
    docs: {
      label: 'User Guide',
      sub: '',
      url: 'https://reicast.com/guide/',
      icon: 'fa fa-book'
    },
    github: {
      label: 'Contribute',
      sub: '',
      url: 'https://github.com/reicast',
      icon: 'fa fa-hands-helping'
    },
    forum: {
      label: 'Forum',
      url: 'https://dcemulation.org/phpBB/viewforum.php?f=86',
      icon: 'fa fa-bullhorn'
    },
    chat: {
      label: 'Chat',
      sub: '',
      url: 'http://chat.reicast.com/',
      icon: 'fab fa-discord'
    },
    twitter: {
      label: 'Twitter',
      sub: '',
      url: 'https://twitter.com/reicastdc',
      icon: 'fab fa-twitter'
    },
    facebook: {
      label: 'Facebook',
      sub: '',
      url: 'https://www.facebook.com/reicastdc',
      icon: 'fab fa-facebook'
    }
  },
  gamesIndexTitle: 'Game Compatibility Database',
  all_games: 'All Games',
  game: 'Game',
  gamePage: {
    [SECTION_CLASSES.OVERVIEW]: 'overview',
    [SECTION_CLASSES.INFO]: 'info',
    [SECTION_CLASSES.SCREENSHOTS]: 'screenshots',
    [SECTION_CLASSES.VIDEOS]: 'videos',
    [SECTION_CLASSES.TESTS]: 'tests',
    [SECTION_CLASSES.TEST_VIDEOS]: 'automated tests',
    [SECTION_CLASSES.DISCUSS]: 'discuss',
    [SECTION_CLASSES.CHEAT_SHEETS]: 'cheatsheets'
  },
  title: 'Title',
  categories: 'Categories',
  first_release_date: 'Released',
  'status-tests': 'Status (reports)',
  popularity: 'Popularity',
  game_modes: 'Game Modes',
  player_perspectives: 'Player Perspectives',
  already_here: 'Hey, you are already here!',
  navigation_already_in_progress: 'Navigation is already in progress!',
  addtest: 'Add report',
  average: 'Average',
  Status: 'Status',
  Speed: 'Speed',
  'Rom Type': 'Rom Type',
  'Tested By': 'Tested By',
  'Reicast Version': 'Reicast Version',
  'Tested OS': 'Tested OS',
  'Tested Renderer': 'Tested Renderer',
  'Test Hardware': 'Test Hardware',
  'Test Duration': 'Test Duration',
  'Comment': 'Comment',
  'Test date': 'Test Date',
  game_tests: 'Game Test Reports',
  igdb_attribution: 'Game information and media on this site come from the igdb.com API. So hats off to igdb.',
  reset_filters: 'Reset Filters',
  gameStatus: {
    [GAME_STATUSES.STATUS__5]: '5 - Fully Working',
    [GAME_STATUSES.STATUS__4]: '4 - Has Quirks',
    [GAME_STATUSES.STATUS__3]: '3 - Has Glitches',
    [GAME_STATUSES.STATUS__2]: '2 - Partially Working',
    [GAME_STATUSES.STATUS__1]: '1 - No Ingame',
    [GAME_STATUSES.STATUS__0]: '0 - No Boot',
    [GAME_STATUSES.STATUS__X]: UNTESTED_LABEL
  },
  removeFilter: 'Remove filter',
  addFilter: 'Add filter',
  in: 'in'
}
