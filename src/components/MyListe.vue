<template id="my-liste" lang="html">
  <div class="my-liste" v-if="display_liste">
    <div class="vuetable-pagination ui basic segment grid" v-if="displayPagination">
      <vuetable-pagination-info ref="paginationInfoTop"
        infoTemplate="Affichage des objets {from} à {to} de {total}"
        noDataTemplate="Pas d'objet!"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="paginationTop"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuetable ref="vuetable"
      :css="css"
      :api-mode="mode"
      :api-url="src"
      http-method="post"
      :http-options="query"
      :data="data"
      data-path="data"
      :fields="fields"
      :sort-order="sortOrder"
      track-by="rowid"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :detail-row-component="rowDetails"
      :per-page="perPage"
      pagination-path="links.pagination"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:load-error="onLoadError"
      @vuetable:row-clicked="onRowClicked"
      @vuetable:loading="onLoading"
      tableClass="mywidth ui blue selectable celled stackable attached table"
    ></vuetable>
    <div class="vuetable-pagination ui basic segment grid" v-if="displayPagination">
      <vuetable-pagination-info ref="paginationInfo"
        infoTemplate="Affichage des objets {from} à {to} de {total}"
        noDataTemplate="Pas d'objet!"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import {Vuetable} from 'vuetable-2'
Vue.use(Vuetable)
Vue.component('vuetable-pagination', require('../../node_modules/vuetable-2/src/components/VuetablePagination.vue').default)
Vue.component('vuetable-pagination-info', require('../../node_modules/vuetable-2/src/components/VuetablePaginationInfo.vue').default)
import {CSS} from '../config.js'
import orderBy from 'lodash/orderBy'

export default {
  name: 'my-liste',
  components: {
  },
  props: {
    mode: {
      type: Boolean,
      default: true
    },
    query: {
      type: Object,
      default: () => {},
      required: false
    },
    data: {
      type: [Array, Object],
      default: null
    },
    src: {
      type: String,
      required: false
    },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      default: () => [],
      required: false
    },
    rowDetails: {
      type: String
    },
    perPage: {
      type: Number,
      default: 10
    },
    displayPagination: {
      type: Boolean,
      default: true
    },
    css: {
      type: Object,
      default () {
        return CSS
      },
      required: false
    }
  },
  data () {
    return {
      display_liste: true
    }
  },
  watch: {
    query: {
      handler (val) {
        if (val === undefined) {
          console.log('On n\'affiche pas la liste')
        }
        this.$refs.vuetable.refresh()
      },
      deep: true
    }
  },
  methods: {
    onCellClicked (data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data.rowid)
    },
    onRowClicked (data, field, event) {
      this.$emit('detailDisplayed', data)
    },
    onPaginationData (paginationData) {
      if (paginationData.current_page === paginationData.last_page) {
        paginationData.to = paginationData.total
      }
      if (this.displayPagination) {
        this.$refs.paginationTop.setPaginationData(paginationData)
        this.$refs.paginationInfoTop.setPaginationData(paginationData)
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      }
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onLoadError (response) {
      this.$refs.vuetable.resetData()
    },
    onLoading () {
      if (!this.mode && (typeof this.sortOrder[0] !== 'undefined')) {
        let __iteratees = []
        let __orders = []
        this.sortOrder.forEach(field => {
          __iteratees.push(field.sortField)
          __orders.push(field.direction)
        })
        this.$refs.vuetable.resetData()
        this.$refs.vuetable.data.data = orderBy(this.data.data, __iteratees, __orders)
      }
    }
  }
}
</script>

<style lang='css' scoped>
</style>
