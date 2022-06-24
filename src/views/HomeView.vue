<template>
  <div>
    <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="#90A4AE"
        :size="100"
        :width="15"
    />
    <template v-else>
      <v-text-field
          color="#90A4AE"
          label="Enter package name"
          v-model="searchText"
          @change="search"
      />
      <div v-if="packages.length">
        <v-card v-for="pack in packages" :key="pack.name" @click="moreInfo(pack)" color="#CFD8DC">
          <v-responsive class="card">
            <v-card-text>
              {{ pack.package.name }}
            </v-card-text>
          </v-responsive>
        </v-card>
      </div>
      <h2 v-if="isSearched && !packages.length">Nothing was found</h2>
      <packages-pagination
          :change-page="changePage"
          :current-page="currentPage"
          :total-pages="totalPages"
          @paginator-update="updateCurrentPage"
      />
    </template>
    <package-info-dialog
        v-if="packageInfo"
        :dialog-fields="dialogFields"
        :value="isDialogOpen"
        @dialog-update="updateDialog"
    />
  </div>
</template>

<script>
import PackageInfoDialog from "@/components/dialogs/PackageInfoDialog";
import PackagesPagination from "@/components/pagination/PackagesPagination";
import npmRegistryService from "@/services/npmRegistryService";

export default {
  name: 'HomeView',
  components: {
    PackageInfoDialog,
    PackagesPagination
  },
  data: () => ({
    searchText: "",
    data: null,
    limit: 10,
    currentPage: 1,
    packageInfo: null,
    isLoading: false,
    isSearched: false,
    isDialogOpen: false,
  }),
  methods: {
    async changePage() {
      this.isLoading = true
      this.data = await npmRegistryService.search(this.searchText, this.limit, this.pageFrom);
      this.isLoading = false
    },
    async search() {
      this.isLoading = true
      this.isSearched = true
      this.currentPage = 1
      this.data = await npmRegistryService.search(this.searchText, this.limit);
      this.isLoading = false
    },
    moreInfo(pack) {
      this.packageInfo = pack.package
      this.isDialogOpen = true
    },
    updateDialog(value) {
      this.isDialogOpen = value
    },
    updateCurrentPage(value) {
      this.currentPage = value
    }
  },
  computed: {
    dialogFields() {
      return {
        'Name': this.packageInfo.name,
        'Date': this.parsedDate,
        'Descriptions': this.packageInfo.description,
        'Version': this.packageInfo.version,
        'Keywords': this.packageInfo.keywords ? this.packageInfo.keywords.join(', ') : '',
        'Link': this.packageInfo.links.npm
      }
    },
    totalPages() {
      if (this.data) {
        return Math.ceil(this.data.total / this.limit);
      }
      return 0;
    },
    pageFrom() {
      return this.limit * this.currentPage - this.limit;
    },
    packages() {
      if (this.data) {
        return this.data.objects;
      }
      return [];
    },
    parsedDate() {
      const date = new Date(this.packageInfo.date);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-top: 10px;
}
</style>
