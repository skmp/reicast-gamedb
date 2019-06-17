<template>
  <div>
    <q-table v-if="tableData.length"
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :row-key="uniqueKeyField"
      :pagination.sync="paginationControl">
      <template slot="top-left" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <div class="average-wrapper">
          <q-btn :label="game.status"
                 icon="fa fa-calculator"
                 color="primary">
            <q-rating icon="fa fa-gamepad"
                      :class="computeClass(game.status, 'average stars hidden-xs')"
                      v-model="stars"
                      :max="5" />
          </q-btn>
        </div>
      </template>
      <template slot="top-right" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <submit-test-button
          class="float-right"
          color="secondary"
          :game="game.id"/>
      </template>
      <q-td slot="body-cell-Comment"
            slot-scope="props"
            class="test-comment">
        <span v-if="props.row.Comment">
          <i class="fa fa-check"></i>
          <q-tooltip>{{ props.row.Comment }}</q-tooltip>
        </span>
        <span v-else>
          <i class="fas fa-window-close"></i>
          <q-tooltip>{{ $t('no_comment') }}</q-tooltip>
        </span>
      </q-td>
      <q-tr slot="bottom-row" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <q-td colspan="100%">
          <span class="float-left average">
        <status-legend :read-only="true" class-list="small"/>
          </span>
        </q-td>
      </q-tr>
    </q-table>
    <div v-else>
      <p>{{ game.status }}</p>
      <h4 class="rating">
        <q-rating icon="fa fa-gamepad"
                  :class="computeClass(game.stars)"
                  v-model="stars"
                  :max="5" />
      </h4>
      <p><submit-test-button :game="game.id"/></p>
    </div>
  </div>

</template>

<script>
import StatusLegend from '../components/StatusLegend'
import { computeStatusClass, getStars } from '../utils/gameHelpers'
import SubmitTestButton from './SubmitTestButton'

export default {
  components: { StatusLegend, SubmitTestButton },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  mounted () {
    let columns = []
    this.fields.forEach((field) => {
      columns.push({
        name: field,
        field: field,
        label: this.$t(field),
        sortable: true
      })
    })
    this.columns = columns
  },
  data () {
    return {
      uniqueKeyField: '__index',
      columns: [],
      filter: '',
      paginationControl: {
        rowsPerPage: 15,
        page: 1,
        sortBy: 'Test date',
        descending: true
      },
      stars: getStars(this.game.status)
    }
  },
  computed: {
    fields () {
      if (this.tableData.length) {
        return Object.keys(this.tableData[0])
      }
      return []
    },
    visibleColumns () {
      const hideFields = [this.uniqueKeyField]

      return this.fields.filter(field => {
        if (!hideFields.includes(field)) {
          return field
        }
      })
    },
    tableData () {
      const tests = this.game.tests
      if (tests) {
        return tests
      }
      return []
    }
  },
  methods: {
    computeClass (status, extraClass = '') {
      return `q-mr-md ${extraClass} ${computeStatusClass(status)}`
    }
  }
}
</script>
