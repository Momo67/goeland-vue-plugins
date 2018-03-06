<template lang="html">
  <div class="my-select">
    <vue-select ref="select"
      :options="dataOptions"
      :value="selectedValue"
      @input="onInput"
      :placeholder="placeholder"
      :searchable="searchable"
      :multiple="multiple"
    ></vue-select>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import axios from 'axios'
import orderBy from 'lodash/orderBy'

export default {
  name: 'my-select',
  components: {
    VueSelect
  },
  props: {
    value: null,
    options: {
      type: Array,
      required: false
    },
    src: {
      type: String,
      required: false
    },
    item: {
      type: String,
      required: false
    },
    params: {
      type: String,
      required: false
    },
    fieldname: {
      type: String,
      required: false
    },
    sort: {
      type: String,
      default: 'asc'
    },
    label: {
      type: String,
      default: 'label',
      required: false
    },
    trackby: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      default: 'Sélectionner un élément'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  data () {
    return {
      selectedId: undefined,
      dataOptions: [],
      selectedValue: undefined
    }
  },
  watch: {
    selectedId: {
      handler (val) {
        let __val = val
        if (this.multiple) {
          let elemToDelete = __val.find(elem => elem.value === -1)
          if ((__val.length > 1) && (elemToDelete !== undefined)) {
            if (__val.indexOf(elemToDelete) === 0) {
              __val.splice(__val.indexOf(elemToDelete), 1)
            } else {
              __val.splice(0, __val.length - 1)
            }
          } else if (__val.length === 0) {
            __val.push(this.dataOptions.find(elem => elem.value === -1))
          }
          this.$emit('input', __val)
        } else {
          this.selectedValue = this.dataOptions.find(obj => obj.value === this.selectedId)
          this.$emit('input', Number(__val))
        }
      },
      deep: true
    },
    value: {
      handler (val) {
        if (this.multiple) {
          this.selectedId = val
          this.$refs.select.mutableValue = val
        } else {
          this.selectedId = val
          this.$refs.select.mutableValue = this.dataOptions.find(obj => obj.value === val)
        }
      },
      deep: true
    },
    params: {
      handler (val) {
        this.fetchData()
      },
      deep: true
    }
  },
  methods: {
    onInput (val) {
      if (this.multiple) {
        this.onInputArray(val)
      } else {
        this.onInputValue(val)
      }
    },
    onInputArray (value) {
      this.selectedId = value
    },
    onInputValue ({value}) {
      this.selectedId = value
    },
    computeOptions (options) {
      this.dataOptions = []
      this.dataOptions.push({value: -1, label: '- Tous -', order: 1})
      options.forEach(item => {
        if ((item.IsActive === undefined) || (item.IsActive !== '0')) {
          let data = (this.fieldname === undefined) ? item.Data : item[this.fieldname]
          let value = (this.trackby === undefined) ? ((item.Value !== undefined) ? item.Value : item.Id) : item[this.trackby]
          data = data.replace(/&nbsp;/g, ' ')
          let option = {}
          option.value = parseInt(value)
          option.label = data
          option.order = (item.SortOrder !== undefined) ? parseInt(item.SortOrder) : data
          this.dataOptions.push(option)
        }
      })
      this.dataOptions = orderBy(this.dataOptions, 'order', this.sort)
      this.$emit('onoptionsloaded')
    },
    fetchData () {
      if (this.options === undefined) {
        axios.post(this.src, {query: {item: this.item, params: this.params}}).then(response => {
          this.computeOptions(response.data[this.item])
        }).catch(error => {
          if (error.response) {
            console.log('Error data: ', error.response.data, ' status: ', error.response.status, ' headers: ', error.response.headers)
          } else if (error.request) {
            console.log('Error request: ', error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      } else {
        this.computeOptions(this.options)
      }
    }
  },
  created () {
    this.fetchData()
    this.selectedValue = {}
  }
}
</script>

<style lang="css" scoped>
</style>
