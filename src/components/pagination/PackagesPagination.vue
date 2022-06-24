<template>
  <div class="text-center" v-if="totalPages > 0">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width" @click="changePage()">
            <v-pagination
                color="#90A4AE"
                v-model="model"
                class="my-4"
                :length="totalPages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PackagesPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    changePage: {
      type: Function,
      required: true
    }
  },
  computed: {
    model: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('paginator-update', value)
      }
    }
  }
}
</script>
