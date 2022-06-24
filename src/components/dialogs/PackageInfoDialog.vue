<template>
  <v-dialog
      v-model="isOpen"
  >
    <v-simple-table>
      <template v-slot:default>
        <tbody>
        <tr v-for="(field, label) in dialogFields" :key="label">
          <td>{{ label }}</td>
          <td>{{ prepareField(field) }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-dialog>
</template>

<script>
export default {
  name: 'PackageInfoDialog',
  props: {
    dialogFields: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    defaultField: 'Not found',
  }),
  computed: {
    isOpen: {
      get() {
        return this.value
      },
      set() {
        this.$emit('dialog-update', false)
      }
    }
  },
  methods: {
    prepareField(field) {
      return field || this.defaultField
    }
  }
}
</script>
