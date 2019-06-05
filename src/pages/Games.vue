<template>
  <div>
    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      row-key="id"
      :pagination.sync="paginationControl"
      color="secondary"
      :title="$t('gamesIndexTitle')">
      <template slot="top-right" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          :class="props.length"/>
      </template>
      <q-td slot="body-cell-cover"
            slot-scope="props"
            :props="props">
        <img class="cover" :src="getCover(props.row.cover)" @click="viewGame(props.row)"/>
      </q-td>
      <q-td slot="body-cell-name"
            slot-scope="props"
            class="game-title"
            :props="props">
        <q-btn color="secondary"
               :label="props.row.name"
               @click="viewGame(props.row)"/>
      </q-td>
      <q-td slot="body-cell-status"
            slot-scope="props"
            class="game-title"
            :props="props">
        <span>
          {{ props.row.status }}
        </span>
        <p v-if="getTestCount(props.row.tests)">
          ({{ getTestCount(props.row.tests) }})
        </p>
      </q-td>
    </q-table>
  </div>

</template>
<script>
import helpers from '../utils/gameHelpers'
const gameIndexList = require('../games/.gameList.json')

export default {
  data () {
    return {
      tableData: gameIndexList,
      columns: [
        { name: 'id', field: 'id' },
        { name: 'cover' },
        {
          name: 'name',
          field: 'name',
          label: this.$t('title'),
          align: 'left',
          sortable: true
        },
        {
          name: 'categories',
          align: 'left',
          label: this.$t('categories'),
          field: val => helpers.getCategories(val.categories)
        },
        {
          name: 'first_release_date',
          align: 'center',
          label: this.$t('first_release_date'),
          classes: 'released',
          field: 'first_release_date',
          format: val => helpers.getDate(val),
          sortable: true
        },
        {
          name: 'status',
          align: 'center',
          field: 'status',
          label: this.$t('status-tests'),
          sortable: true
        },
        {
          name: 'popularity',
          align: 'center',
          label: this.$t('popularity'),
          field: val => val.popularity.toFixed(2),
          classes: 'popularity',
          sortable: true
        }
      ],
      filter: '',
      visibleColumns: ['cover', 'name', 'categories', 'first_release_date', 'status', 'tests', 'popularity'],
      paginationControl: {
        rowsPerPage: 15,
        page: 1,
        sortBy: 'popularity',
        descending: true
      }
    }
  },
  methods: {
    getCover (cover) {
      return helpers.getCover(cover)
    },
    getTestCount (tests) {
      return helpers.getTestCount(tests)
    },
    viewGame (row) {
      this.$router.push({ path: `/games/${row.id}` })
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

  .cover {
    height: 100px
  }

  .q-table-title {
    font-size: 18px
  }
  @media (max-width: 848px) {
     .released {
      display: none;
    }
  }
  @media (max-width: 576px) {
    .popularity {
      display: none;
    }
  }
</style>
