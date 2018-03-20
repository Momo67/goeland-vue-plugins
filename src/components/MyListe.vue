<template id="my-liste" lang="html">
  <div class="my-liste" v-if="display_liste">
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfoTop"
        infoTemplate="Affichage des objets {from} à {to} de {total}"
        noDataTemplate="Pas d'objet!"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="paginationTop"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuetable ref="vuetable"
      :api-mode="true"
      :api-url="src"
      http-method="post"
      :http-options="query"
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
      tableClass="mywidth ui blue selectable celled stackable attached table"
    ></vuetable>
    <div class="vuetable-pagination ui basic segment grid">
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

export default {
  name: 'my-liste',
  components: {
  },
  props: {
    query: {
      type: Object,
      default: () => {},
      required: true
    },
    src: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      required: true
    },
    rowDetails: {
      type: String
    },
    perPage: {
      type: Number,
      default: 10
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
      this.$refs.paginationTop.setPaginationData(paginationData)
      this.$refs.paginationInfoTop.setPaginationData(paginationData)
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onLoadError (response) {
      this.$refs.vuetable.resetData()
    }
  }
}
</script>

<style lang='css' scoped>
</style>
