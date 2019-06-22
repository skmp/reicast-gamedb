export const scrollButtonProps = {
  directionDown: {
    type: [Boolean, Number],
    default: true
  },
  dense: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  styleClasses: {
    type: String,
    default: 'scroll-navigation-btn'
  },
  icon: {
    type: String,
    default: 'fa fa-arrow'
  },
  showButton: {
    type: Boolean,
    default: null
  }
}
