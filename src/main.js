// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

if (process.env.UI_ENV === 'semantic') {
  if (process.env.NODE_ENV === 'production') {
    import('jquery/dist/jquery.min.js')
    import('semantic-ui/dist/semantic.min.css')
    import('semantic-ui/dist/semantic.min.js')
  } else {
    import('jquery/dist/jquery.js')
    import('semantic-ui/dist/semantic.css')
    import('semantic-ui/dist/semantic.js')
  }
}
if (process.env.UI_ENV === 'bootstrap') {
  if (process.env.NODE_ENV === 'production') {
    import('jquery/dist/jquery.min.js')
    import('bootstrap-sass/assets/stylesheets/_bootstrap-mincer.scss')
    import('bootstrap/dist/js/bootstrap.min.js')
  } else {
    import('jquery/dist/jquery.js')
    import('bootstrap-sass/assets/stylesheets/_bootstrap.scss')
    import('bootstrap/dist/js/bootstrap.js')
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
