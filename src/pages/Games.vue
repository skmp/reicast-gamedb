<template>
  <div class="games-list">
    <header class="center games-list-header">
      <img class="spin"
           alt="Reicast logo"
           src="statics/icons/icon-128x128.png">
      <h2>
        {{ $t(tableTitle) }}
      </h2>
      <status-legend
        @statusClick="statusFilter"
      />
    </header>
    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      row-key="id"
      :pagination.sync="paginationControl"
      color="secondary"
      :title="tableTitle">
      <template slot="top-left" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <q-btn :label="$t('reset_filter')"
               color="primary"
               class="q-mr-md"
               @click="resetFilter()"/>
      </template>
      <template slot="top-right" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"/>
      </template>
      <q-td slot="body-cell-cover"
            slot-scope="props">
        <img class="cover" :src="getCover(props.row.cover)" @click="viewGame(props.row)"/>
      </q-td>
      <q-td slot="body-cell-name"
            slot-scope="props"
            class="game-title">
        <q-btn :class="computeClass(props.row.status)"
               :label="props.row.name"
               @click="viewGame(props.row)"/>
      </q-td>
      <q-td slot="body-cell-categories"
            slot-scope="props"
            class="game-categories">
        <q-btn v-for="(item, index) in props.row.categories"
               :key="index"
               :label="item"
               @click="catFilter(item)"/>
      </q-td>
      <q-td slot="body-cell-status"
            slot-scope="props"
            class="game-status">
        <submit-test-button
          :styleClasses="computeClass(props.row.status)"
          :label="`${props.row.status} (${getTestCount(props.row.tests)})`"
          :icon="null"
          :color="null"
          :game="(props.row.id)"/>
        <q-tooltip>{{ $t('addtest') }}</q-tooltip>
      </q-td>
    </q-table>
    <Footer/>
  </div>

</template>
<script>
import * as helpers from '../utils/gameHelpers'
import SubmitTestButton from '../components/SubmitTestButton'
import Footer from '../components/Footer'
import StatusLegend from '../components/StatusLegend'

export default {
  components: { SubmitTestButton, Footer, StatusLegend },
  data () {
    return {
      tableData: this.$store.state.games,
      tableTitle: 'gamesIndexTitle',
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
          label: this.$t('categories')
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
      return helpers.getImage(cover)
    },
    getTestCount (tests) {
      return helpers.getTestCount(tests)
    },
    viewGame (row) {
      this.$router.push({ path: `/games/${row.id}` })
    },
    computeClass (status) {
      return helpers.computeStatusClass(status)
    },
    statusFilter (status) {
      this.tableTitle = `gameStatus.${status}`
      this.tableData = this.$store.state.games.filter(game => helpers.computeStatusClass(game.status) === status)
    },
    catFilter (cat) {
      this.tableTitle = cat
      this.tableData = this.$store.state.games.filter(game => {
        if (game.categories && game.categories.includes(cat)) { return game }
      })
    },
    resetFilter () {
      this.tableTitle = 'all_games'
      this.tableData = this.$store.state.games
    }
  }
}
</script>
<style>
  header {
    padding: 25px;
    width: 100%;
    background: rgb(25, 57, 96);
    color: white;
  }
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
    .games-list-header img {
      height: 96px
    }
  }
  @media (max-width: 576px) {
    .popularity {
      display: none;
    }
    .games-list-header img {
      height: 64px
    }
  }
</style>
