<template>
  <q-btn @click="addTest"
         :label="label"
         :icon="icon"
         :color="color"
         :class="styleClasses"
  />
</template>
<script>
import { openURL } from 'quasar'
import { GOOGLE_REPORT_FORM } from '../constants/general'

export default {
  props: {
    game: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default () {
        return this.$t('addTest')
      }
    },
    color: {
      type: String,
      default: 'primary'
    },
    styleClasses: {
      type: String,
      default: 'q-mr-md'
    },
    icon: {
      type: String,
      default: 'fa fa-user-edit'
    }
  },
  methods: {
    addTest () {
      openURL(`${GOOGLE_REPORT_FORM}${this.game}`)
    }
  }
}
</script>
