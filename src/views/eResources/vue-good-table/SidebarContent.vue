<template>
  <div>
    <div class="text-center">
      <!-- Name -->
      <b-card-text class="mt-2 h4 color-inherit text-reset">
        {{this.loadPage()}}
      </b-card-text>
    </div>
    <b-card>
      <b-form @submit.prevent>
        <b-row>

          <!-- Title -->
          <b-col cols="12">
            <b-form-group
                label="Title"
                label-for="v-title"
            >
              <b-form-input
                  id="v-title"
                  v-model="post_values.title"
                  placeholder="Title"
              />
            </b-form-group>
          </b-col>

          <!-- Department -->
          <b-col cols="12">
            <b-form-group
                label="Department"
                label-for="v-department"
            >
              <v-select
                  v-model="post_values.department"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="model.departmentOptions"
                  placeholder="Please select"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Type"
                label-for="v-type"
            >
              <v-select
                  v-model="post_values.type"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="model.type"
                  placeholder="Please select"
              />
            </b-form-group>
          </b-col>

          <!-- Resource -->
          <b-col cols="12">
            <b-form-group
                label="Resource"
                label-for="v-resource"
            >
              <v-select
                  v-model="post_values.resource"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="model.resourceOptions"
                  placeholder="Please select"
              />
            </b-form-group>
          </b-col>

          <!-- Author -->
          <b-col cols="12">
            <b-form-group
                label="Author"
                label-for="v-author">
              <b-form-input
                  id="v-author"
                  v-model="post_values.author"
                  placeholder="Author"
              />
            </b-form-group>
          </b-col>

<!--          Documents-->
          <b-col cols="12">
            <b-form-group
                label="Documents"
                label-for="v-documents">
              <b-form-file

                  @change="handleFileUpload( $event )"
                  :placeholder="this.getResourceName()"
                  drop-placeholder="Drop file here..."
              />
            </b-form-group>
          </b-col>


          <b-col cols="12">
            <b-form-group
                label="Cover Photo"
                label-for="v-documents">
              <b-form-file
                  @change="handleFileUploadCoverPhoto( $event )"
                  :placeholder="this.getCoverName()"
                  drop-placeholder="Drop file here..."
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
                label="Description"
                label-for="v-description">
              <b-form-textarea
                  id="v-description"
                  v-model="post_values.description"
                  placeholder="Description"
              />
            </b-form-group>
          </b-col>

          <!-- checkbox -->
          <!--          <b-col cols="12">-->
          <!--            <b-form-group>-->
          <!--              <b-form-checkbox-->
          <!--                  id="checkbox-3"-->
          <!--                  name="checkbox-3"-->
          <!--                  value="Remember_me"-->
          <!--              >-->
          <!--                Remember me-->
          <!--              </b-form-checkbox>-->
          <!--            </b-form-group>-->
          <!--          </b-col>-->

          <!-- submit and reset -->
          <b-col cols="12">
            <b-button
                class="mr-1"
                size="sm"
                type="submit"
                @click="submit"
                variant="primary"
            >
              Submit
            </b-button>
            <b-button
                size="sm"
                type="reset"
                variant="outline-secondary"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

  </div>
</template>

<script>
/* eslint-disable */
import BCardCode from '@core/components/b-card-code'
import vSelect from 'vue-select'
import {
  BAvatar,BFormTextarea,
  BButton,
  BCard,
  BCardText,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BListGroup,BFormFile,
  BListGroupItem,
} from 'bootstrap-vue'
import axios from "axios";
/* eslint-disable */
export default {
  props: ['title','id', 'dep', 'edit_title', 'edit_author', 'edit_resource', 'edit_document', 'edit_cover', 'edit_description', 'edit_type'],
  components: {
    BAvatar,BFormTextarea,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,BFormFile,
    BListGroup,
    BCardCode,
    BListGroupItem,
    BCardText,
    BCard,
    vSelect,
  },
  /* eslint-disable */
  data() {
    return {
      id_back: '',
      doc:{
        resource_name: '',
        cover_name: ''
      },
      post_values:{
        author: '',
        department: '',
        title: '',
        resource: '',
        type: '',
        description: ''
      },
      model: {
        file : '',
        coverPhoto : '',
        resource: '',
        department: '',
        departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Marketing', 'Acupuncture', 'IT', 'HR', 'Accounting' ],
        type: ['Book', 'Journal', 'Magazine', 'PDF', 'Article'],
        resourceOptions: ['Thesis', 'General'],
        option: [{title: 'Square'}, {title: 'Rectangle'}, {title: 'Rombo'}, {title: 'Romboid'}],
      }
    }
  },
  created() {
    console.log("wsfwfdwfscs")
  },
  methods : {
    loadPage() {


      if (this.id_back === ''){
        this.id_back = this.id
      }
      else {
        if (!(this.id_back === this.id)){
          this.post_values.department = ''
          this.post_values.title = ''
          this.post_values.author = ''
          this.post_values.resource = ''
          this.post_values.type = ''
          this.doc.resource_name = ''
          this.doc.description = ''
        }
      }
      this.id_back = this.id

      if (this.post_values.department === '') {
        this.post_values.department = this.dep
      }
      else {
        this.post_values.department = this.post_values.department
      }
      if (this.post_values.type === '') {
        this.post_values.type = this.edit_type
      }
      else {
        this.post_values.type = this.post_values.type
      }
      if (this.post_values.title === '') {
        this.post_values.title = this.edit_title
      }
      else {
        this.post_values.title = this.post_values.title
      }
      if (this.post_values.author === '') {
        this.post_values.author = this.edit_author
      }
      else {
        this.post_values.author = this.post_values.author
      }
      if (this.post_values.resource === '') {
        this.post_values.resource = this.edit_resource
      }
      else {
        this.post_values.resource = this.post_values.resource
      }
      if (this.post_values.description === '') {
        this.post_values.description = this.edit_description
      }
      else {
        this.post_values.description = this.post_values.description
      }
      return this.title
    },
    submit() {

      if (!(this.title === 'Edit')) {
        axios.post("http://localhost:8081/resource/save-eresource",
            this.post_values)
            .then(response => {

              this.submitFile(response)

            });
      }
      else {

        var new_id = this.id

            axios.post("http://localhost:8081/resource/update-eresource",
            this.post_values, { params: { new_id }})
            .then(response => {
              window.location.reload();
            });
      }

    },
    getResourceName() {
      return this.edit_document
    },
    getCoverName() {
      return this.edit_cover
    },
    handleFileUpload( event ){
      this.model.file = event.target.files[0];
    },
    handleFileUploadCoverPhoto( event ){
      this.model.coverPhoto = event.target.files[0];
    },

    submitFile(response){

      var id = response.data.id

      let formData = new FormData();
      formData.append('files', this.model.file);
      formData.append('cover', this.model.coverPhoto);


      axios.create({
        baseURL: 'http://localhost:8081/resource'
      }).post( '/uploadMultipleFiles',
          formData, { params: { id }},
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function(){
        window.location.reload();
      })
          .catch(function(){
            console.log('FAILURE!!');
          });
    }
  },
}
</script>
