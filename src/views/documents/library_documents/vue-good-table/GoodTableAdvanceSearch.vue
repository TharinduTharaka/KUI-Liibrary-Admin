<template>


  <b-card>
    <b-button v-b-toggle.sidebar-creat
              style="margin-bottom: 10px"
              variant="primary"
    >
      Add
    </b-button>
    <b-sidebar
        id="sidebar-creat"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Create"/>
    </b-sidebar>
    <b-sidebar
        id="sidebar-edit"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Edit" :id="this.edit_id"  :edit_title="this.edit_title" :edit_document="this.edit_document" :edit_cover="this.edit_cover" :edit_description="this.edit_description""/>
    </b-sidebar>
    <div class="custom-search">

      <!-- advance search input -->
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>Title:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>URL:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- table -->
    <div>
      <b-table
          :current-page="currentPage"
          :fields="fields"
          :filter="filter"
          :items="items"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          class="position-relative"
          hover
          responsive
          striped
      >
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
              v-model="row.detailsShowing"
              @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col>
                <div class="bg-light-primary rounded-top text-center">
                  <b-img
                      :src="getImage(items[row.index].document_image)"
                      height="170"

                  />
                </div>
              </b-col>
            </b-row>


            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Published Date : </strong>{{ row.item.display_time }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Title : </strong>{{ row.item.title }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Document : </strong>{{ row.item.document }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Status : </strong>{{ row.item.status }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Description : </strong>{{ items[row.index].description }}
              </b-col>

              <!--              <b-col-->
              <!--                  class="mb-1"-->
              <!--                  md="4"-->
              <!--              >-->
              <!--                <strong>Age : </strong>{{ row.item.age }}-->
              <!--              </b-col>-->
            </b-row>
            <div class="demo-inline-spacing">
              <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="row.toggleDetails"
              >
                Hide Details
              </b-button>
              <b-button
                  v-b-toggle.sidebar-edit
                  size="sm"
                  @click="edit(row.item.id,row.item.title, items[row.index].document, row.item.description, items[row.index].cover_photo )"
                  style="margin-left: 10px"
                  variant="outline-primary"
              >
                Edit
              </b-button>
              <b-button
                  size="sm"
                  @click="deleteResource(row.item.id,5)"
                  style="margin-left: 10px"
                  variant="outline-danger"
              >
                Delete
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-success"
                  @click="updateEResourceStatus(row.item.id,getStatus(row.item.status),5)"
              >
                {{ getStatus(row.item.status) }}
              </b-button>
            </div>
          </b-card>
        </template>

        <template #cell(avatar)="data">
          <b-avatar :src="data.value"/>
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
      </b-table>
    </div>
    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
          class="text-nowrap mb-md-0 mr-1"
          label="Per Page"
          label-align="left"
          label-cols="6"
          label-for="sortBySelect"
          label-size="sm"
      >
        <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
            inline
            size="sm"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            class="mb-0"
            first-number
            last-number
            next-class="next-item"
            prev-class="prev-item"
        >
          <template #prev-text>
            <feather-icon
                icon="ChevronLeftIcon"
                size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
                icon="ChevronRightIcon"
                size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

    <!--    <template #code>-->
    <!--      {{ codeAdvance }}-->
    <!--    </template>-->
  </b-card>
</template>

<script>
// import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BImg,
  BPagination,
  BRow,
  BSidebar,
  BTable,
  VBToggle,
} from 'bootstrap-vue' // eslint-disable-line
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import SidebarContent from './SidebarContent.vue'
import vSelect from 'vue-select'
import axios from "axios";
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    vSelect,
    BBadge,
    BSidebar,
    SidebarContent,
    BFormCheckbox,
    BTable,
    BButton,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    // ToastificationContent,
  },
  /* eslint-disable */
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  /* eslint-disable */
  data() {
    return {
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 5,
      totalRows: 10,
      currentPage: 1,
      edit_id: '',
      edit_title: '',
      edit_document: '',
      edit_cover: '',
      edit_description: '',
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      // filter: {
      //   resource:null,
      //   department:null,
      // },
      filter: null,
      resource: '',
      resourceOptions: ['Thesis', 'General'],
      department: '',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      rows: [],
      searchTerm: '',
      fields: [
        'show_details',
        'id',
        'display_time',
        'title',
        'document',
        'cover_photo',
        {
          key: 'status',
          label: 'Status'

        }],
      /* eslint-disable global-require */
      items: [

      ],
      /* eslint-disable global-require */
      status: [{
        published: 'Published',
        2: 'Professional',
        draft: 'Draft',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          published: 'light-primary',
          2: 'light-success',
          draft: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
    }
  },
  /* eslint-disable */
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  mounted() {
    // Set the initial number of items

  },
  /* eslint-disable */
  created() {

    fetch("http://localhost:8081/document/get-all-info?page=1&limit=2000&sort=tt")
        .then(async response => {
          const data = await response.json();
          this.items = data.data.items;
          this.totalRows = data.data.total;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        })


  },
  methods: {
    advanceSearch(val) {
      this.filter = val
    },
    edit(val,title, document, description, cover) {

      this.edit_id = val
      this.edit_title = title
      this.edit_document = document
      this.edit_description = description
      this.edit_cover = cover
    },
    getStatus(val) {
      if (val == 'draft')
        return 'published'
      else
        return 'draft'
    },
    getImage(val) {

      var url = "C:/Users/Thamindu H/Desktop/library/library/uploadedFiles/50_1.jpg"
      console.log(val)
      return require('C:/Users/Thamindu H/Desktop/library/library/uploadedFiles/50_1.jpg')

    },
    deleteResource(data,updated_user) {
      axios.delete("http://localhost:8081/document/delete-eresource",
          { params: { data,updated_user }})
          .then(response => window.location.reload());
    },
    updateEResourceStatus(data, status,updated_user) {
      axios.put("http://localhost:8081/document/update-eresource-status", null,
          { params: { data, status, updated_user }})
          .then(response => window.location.reload());
    },
    getData() {
      axios.get("http://localhost:8081/document/get-all-info?page=1&limit=20&sort=tt")
          .then(response => {
            const data = response.json();
            this.items = data.data.items;
          });
    },
    onRowClick(params) {
      console.log(params)
    }
  },
}
</script>
