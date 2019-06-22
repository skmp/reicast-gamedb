<template>
  <section-component
    :class="computeClass(game.status)"
    :heading="true"
    :title="$t('game_tests')">

    <div class="basic-container" slot="content">
      <test-table :game="game"/>
    </div>
  </section-component>
</template>

<script>
import SectionComponent from '../Section.vue'
import TestTable from '../../partials/TestsTable'
import { computeStatusClass } from '../../../../utils/gameHelpers'

export default {
  components: { SectionComponent, TestTable },
  props: {
    sectionClass: {
      type: String,
      required: true
    },
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    computeClass (status) {
      return `${this.sectionClass} ${computeStatusClass(status)}`
    }
  }
}
</script>
