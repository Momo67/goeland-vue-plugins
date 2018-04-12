<template id="test" lang="html">
  <div class="my-liste" id="my-liste">
    <my-liste
      ref="myliste"
      :mode="false"
      :data="{links: {pagination: {total: 8, per_page: 5, current_page: 1, last_page: 2, from: 1, to: 5}}, data: options}"
      :fields="[{name: 'Id', title: 'Identifiant', sortField: 'Id'}, {name: 'Data', title: 'Statut', sortField: 'Data', titleClass: 'left aligned', dataClass: 'left aligned'}, {name: 'IsActive', title: 'IsActive', sortField: 'IsActive'}, {name: 'SortOrder', title: 'SortOrder', sortField: 'SortOrder'}]"
      :display-pagination="false"
    ></my-liste>
  </div>
</template>

<script>
import MySelect from './MySelect'
import MyListe from './MyListe'
// import 'jquery/dist/jquery.js'
// import 'semantic-ui/dist/semantic.js'
// import 'semantic-ui-css/semantic.min.css'

export default {
  name: 'test',
  components: {
    MySelect,
    MyListe
  },
  data () {
    return {
      statut: null,
      options: [
        {Id: 9, Data: 'A surveiller', SortOrder: 70, IsActive: 1},
        {Id: 6, Data: 'En attente d\'abattage', SortOrder: 40, IsActive: 1},
        {Id: 7, Data: 'En attente de remplacement', SortOrder: 50, IsActive: 1},
        {Id: 5, Data: 'En attente de soins', SortOrder: 30, IsActive: 1},
        {Id: 8, Data: 'En attente de tomographie', SortOrder: 60, IsActive: 1},
        {Id: 10, Data: 'En demande d\'abattage', SortOrder: 39, IsActive: 1},
        {Id: 1, Data: 'Existant', SortOrder: 10, IsActive: 1},
        {Id: 2, Data: 'Supprimé', SortOrder: 20, IsActive: 1}
      ],
      arbre: {
        statut: 8,
        genre: 227,
        cadastre: 1
      },
      placeholder: 'Status Quo'
      /*
      css: {
        tableClass: 'ui red selectable celled stackable attached table',
        // tableClass: 'table table-striped table-bordered',
        loadingClass: 'loading',
        ascendingIcon: 'blue chevron up icon',
        descendingIcon: 'blue chevron down icon',
        detailRowClass: 'vuetable-detail-row',
        handleIcon: 'grey sidebar icon',
        sortableIcon: ''
      }
      */
    }
  }
}
</script>

<style lang="css">
</style>
