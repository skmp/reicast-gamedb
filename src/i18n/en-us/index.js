import { SECTION_CLASSES } from '../../constants/general'
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
  gamesIndexTitle: 'Games Database Table',
  game: 'Game',
  gamePage: {
    [SECTION_CLASSES.OVERVIEW]: 'overview',
    [SECTION_CLASSES.SCREENSHOTS]: 'screenshots',
    [SECTION_CLASSES.VIDEOS]: 'videos',
    [SECTION_CLASSES.TESTS]: 'tests',
    [SECTION_CLASSES.TEST_VIDEOS]: 'video test runs',
    [SECTION_CLASSES.CHEAT_SHEETS]: 'cheatsheets'
  },
  categories: 'Categories',
  first_release_date: 'Released',
  'status-tests': 'Status (tests)',
  popularity: 'Popularity',
  game_modes: 'Game Modes',
  player_perspectives: 'Player Perspectives',
  already_here: 'Hey, you are already here!',
  navigation_already_in_progress: 'Navigation is already in progress!'
}
