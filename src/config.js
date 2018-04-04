/* eslint-disable */
CSS = {}
if (process.env.UI_ENV === 'semantic') {
  CSS = {
    tableClass:     'ui blue selectable celled stackable attached table',
    loadingClass:   'loading',
    ascendingIcon:  'blue chevron up icon',
    descendingIcon: 'blue chevron down icon',
    detailRowClass: 'vuetable-detail-row',
    handleIcon:     'grey sidebar icon',
    sortableIcon:   '',  // since v1.7
    ascendingClass: 'sorted-asc', // since v1.7
    descendingClass: 'sorted-desc' // since v1.7
  }
}
else if (process.env.UI_ENV === 'bootstrap') {
  CSS = {
    tableClass:     'table table-striped table-bordered',
    loadingClass:   'loading',
    ascendingIcon:  'glyphicon glyphicon-chevron-up',
    descendingIcon: 'glyphicon glyphicon-chevron-down',
    detailRowClass: 'vuetable-detail-row',
    handleIcon:     'glyphicon glyphicon-menu-hamburger',
    sortableIcon:   '',  // since v1.7
    ascendingClass: 'sorted-asc', // since v1.7
    descendingClass: 'sorted-desc' // since v1.7
  }
}

export {CSS}
