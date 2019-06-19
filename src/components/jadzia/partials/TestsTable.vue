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
                 :class="computeClass(game.status)"/>
          <q-rating icon="fa fa-gamepad"
                    :class="computeClass(game.status, 'average stars hidden-xs')"
                    size="21px"
                    v-model="stars"
                    :max="5" />
        </div>
      </template>
      <template slot="top-right" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <submit-test-button
          :tooltip="false"
          class="float-right"
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
        <!--<q-td>-->
          <!--<q-table-columns-->
            <!--class="q-mr-sm"-->
            <!--v-model="visibleColumns"-->
            <!--:columns="columns"-->
          <!--/>-->
        <!--</q-td>-->
        <q-td colspan="100%">
          <status-legend :read-only="true" class-list="small"/>
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
      <p><submit-test-button :game="game.id" :tooltip="false"/></p>
    </div>
  </div>

</template>

<script>
import StatusLegend from '../../common/StatusLegend'
import { computeStatusClass, getStars } from '../../../utils/gameHelpers'
import SubmitTestButton from '../../common/SubmitTestButton'

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
    this.visibleColumns = this.getVisibleColumns()
  },
  data () {
    return {
      uniqueKeyField: '__index',
      columns: [],
      visibleColumns: [],
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
    },
    getVisibleColumns () {
      const hideFields = [this.uniqueKeyField]

      return this.fields.filter(field => {
        if (!hideFields.includes(field)) {
          return field
        }
      })
    }
  }
}
</script>
