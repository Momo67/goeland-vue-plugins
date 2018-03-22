// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import MyListe from './MyListe.vue'
import jQuery from 'jquery'
import 'semantic-ui/dist/semantic.css'
import 'semantic-ui/dist/semantic.js'

export function install(Vue, options) {
  Vue.component('my-liste', MyListe)
}

export {
  MyListe
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  install
};

export default plugin;

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}
