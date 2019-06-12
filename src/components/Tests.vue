<template>
  <section-component
    :class="computeClass(game.status)"
    :heading="true"
    :title="$t('game_tests')">

    <div class="basic-container" slot="content">
      <p v-if="!testData.length">{{ game.status }}</p>
      <p><submit-test-button :game="game.id"/></p>

      <TestTable v-if="testData.length"
          :testData="testData"
          :status="game.status">
      </TestTable>
    </div>
  </section-component>
</template>

<script>
import SectionComponent from './Section.vue'
import TestTable from '../components/TestsTable'
import SubmitTestButton from './SubmitTestButton'
import { getStars, computeStatusClass } from '../utils/gameHelpers'

export default {
  components: { SectionComponent, TestTable, SubmitTestButton },
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
  data () {
    return {
      stars: getStars(this.status)
    }
  },
  computed: {
    testData () {
      const tests = this.game.tests
      if (tests) {
        return tests
      }
      return []
    }
  },
  methods: {
    computeClass (status) {
      return `${this.sectionClass} ${computeStatusClass(status)}`
    }
  }
}
</script>
