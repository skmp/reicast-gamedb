<template>
  <div>
    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :row-key="uniqueKeyField"
      :pagination.sync="paginationControl"
      color="secondary">
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
          <span class="float-left">
          <q-btn :label="status"
                 :class="computeClass(status)"
          />
          </span>
          <status-legend/>
        </q-td>
      </q-tr>
    </q-table>

  </div>

</template>
<script>
import StatusLegend from '../components/StatusLegend'
import { computeStatusClass } from '../utils/gameHelpers'

export default {
  components: { StatusLegend },
  props: {
    testData: {
      type: Array,
      required: true
    },
    status: {
      type: String,
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
      tableData: this.testData,
      columns: [],
      filter: '',
      paginationControl: {
        rowsPerPage: 15,
        page: 1,
        sortBy: 'Test date',
        descending: true
      }
    }
  },
  computed: {
    fields () {
      if (this.tableData) {
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
    }
  },
  methods: {
    computeClass (status) {
      return `q-mr-md ${computeStatusClass(status)}`
    }
  }
}
</script>
<style>
  .q-table th, .q-table td {
    white-space: normal;
  }

  .q-table th.nowrap, .q-table td.nowrap {
    white-space: nowrap;
  }
</style>
