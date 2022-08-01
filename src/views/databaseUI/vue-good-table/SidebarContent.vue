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

          <b-col cols="12">
            <b-form-group
                label="URL"
                label-for="v-url"
            >
              <b-form-input
                  id="v-title"
                  v-model="post_values.url"
                  placeholder="Title"
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
  props: ['title','id', 'edit_url', 'edit_description', 'edit_title', 'edit_cover'],
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
        title: '',
        url: '',
        description: ''
      },
      model: {
        file : '',
        coverPhoto : '',
        resource: '',
        department: ''
      }
    }
  },
  methods : {
    loadPage() {


      if (this.id_back === ''){
        this.id_back = this.id
      }
      else {
        if (!(this.id_back === this.id)){
          this.post_values.url = ''
          this.post_values.title = ''
          this.post_values.description = ''
        }
      }
      this.id_back = this.id

      if (this.post_values.url === '') {
        this.post_values.url = this.edit_url
      }
      else {
        this.post_values.url = this.post_values.url
      }
      if (this.post_values.description === '') {
        this.post_values.description = this.edit_description
      }
      else {
        this.post_values.description = this.post_values.description
      }
      if (this.post_values.title === '') {
        this.post_values.title = this.edit_title
      }
      else {
        this.post_values.title = this.post_values.title
      }
      return this.title
    },
    submit() {

      if (!(this.title === 'Edit')) {
        axios.post("http://localhost:8081/database/save-eresource",
            this.post_values)
            .then(response => {

              this.submitFile(response)

            });
      }
      else {

        var new_id = this.id

        axios.post("http://localhost:8081/database/update-eresource",
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

    handleFileUploadCoverPhoto( event ){
      this.model.coverPhoto = event.target.files[0];
    },

    submitFile(response){

      var id = response.data.id

      let formData = new FormData();
      formData.append('cover', this.model.coverPhoto);


      axios.create({
        baseURL: 'http://localhost:8081/database'
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
