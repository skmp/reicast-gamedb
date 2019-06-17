<template>
  <div class="games-list">
    <games-header/>
    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      row-key="id"
      :pagination.sync="paginationControl"
      color="secondary">
      <template slot="top-left" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <q-btn :label="$t('reset_filters')"
               color="primary"
               class="q-mr-md reset"
               @click="resetFilter()"/>
        <q-btn v-for="(item, index) in filteredCategories"
               :key="index"
               :label="item"
               icon="fas fa-times"
               class="filtered-categories"
               @click="removeCategory(item)">
          <q-tooltip :delay="500"
                     :offset="[0, 10]">
            {{ $t('removeFilter') }}
          </q-tooltip>
        </q-btn>
      </template>
      <div class="filter-wrapper" slot="top-right" slot-scope="props"> <!--eslint-disable-line vue/no-unused-vars-->
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"/>
      </div>
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
               class="categories"
               :color="activeCategory(item) ? 'primary' : ''"
               @click="addCategory(item)">
          <q-tooltip v-if="!activeCategory(item)"
                     :delay="500"
                     :offset="[0, 10]">
            {{ $t('addFilter') }}
          </q-tooltip>
        </q-btn>
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
      </q-td>
    </q-table>
    <Footer/>
    <input v-if="!$q.platform.is.cordova && !$q.platform.is.electron"
           type="hidden" name="spaPreRenderElement" value=""/>
  </div>

</template>
<script>
import * as helpers from '../utils/gameHelpers'
import GamesHeader from '../components/GamesHeader'
import SubmitTestButton from '../components/SubmitTestButton'
import Footer from '../components/Footer'

export default {
  components: { GamesHeader, SubmitTestButton, Footer },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
  computed: {
    filteredCategories () {
      const category = this.$route.query.category
      if (category) {
        return category.split(',')
      }
      return []
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
    catFilter (cats) {
      this.$router.push({ query: { category: cats, status: this.$route.query.status } })
    },
    addCategory (cat) {
      let categories = this.filteredCategories
      if (!categories.includes(cat)) {
        categories.push(cat)
        this.catFilter(categories.join())
      }
    },
    removeCategory (cat) {
      let categories = this.filteredCategories
      if (categories.includes(cat)) {
        this.catFilter(
          categories.filter(
            cats => cats !== cat
          ).join()
        )
      }
    },
    resetFilter () {
      this.$router.push({ path: '' })
    },
    activeCategory (cat) {
      return this.filteredCategories.includes(cat)
    }
  }
}
</script>
<style lang="stylus">

.games-list
  header
    padding: 25px;
    width: 100%;
    background: rgb(25, 57, 96);
    color: white;

  td
    &.game-categories
      .q-btn
        font-size: 12px

    &.game-status
      i
        display:none

  .cover
    padding: 10px 0

  .q-table-title
    font-size: 18px

  .games-list-header img
    cursor: pointer

  @media (max-width: 848px)
    .released
      display: none;

    .games-list-header img
      height: 96px

  @media (max-width: 575px)
    .popularity
      display: none;

    .games-list-header img
      height: 64px

    td
      .q-btn
        font-size: 13px
      &.game-categories
        .q-btn
         font-size: 10px
  .filtered-categories, .reset, .categories
    margin-bottom: 5px
    margin-right: 5px

  .filter-wrapper
    background: rgba(0,0,0,0.03)
    padding: 7px;

.status-legend
  min-height: 110px
  button
    height: 62px
    width: 100px
    i
      display: none
      margin-right: unset

    &.active
      height: 85px
</style>
