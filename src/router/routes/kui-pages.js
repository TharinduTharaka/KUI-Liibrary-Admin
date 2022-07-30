export default [
  {
    path: '/apps/eResources',
    name: 'apps-eResources',
    component: () => import('@/views/eResources/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'E Resources',
    },
  },
  {
    path: '/apps/databaseUI',
    name: 'apps-databaseUI',
    component: () => import('@/views/databaseUI/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Database UI',
      breadcrumb: [
        {
          text: 'Database UI',
        },
        {
          text: 'Database UI Table',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/library_concerns',
    name: 'apps-library_concerns',
    component: () => import('@/views/libraryConcerns/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Library Concerns',
      breadcrumb: [
        {
          text: 'Table',
        },
        {
          text: 'libraryConcerns Table',
          active: true,
        },
      ],
    },
  },



  // Documents
  {
    path: '/apps/documents/library_documents',
    name: 'apps-documents-library_documents',
    component: () => import('@/views/documents/library_documents/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Library Documents',
      breadcrumb: [
        {
          text: 'Documents',
        },
        {
          text: 'Library Documents',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/book_requirements',
    name: 'apps-book_requirements',
    component: () => import('@/views/bookRequirements/index'),
  },
  {
    path: '/apps/library_resource_concerns',
    name: 'apps-library_resource_concerns',
    component: () => import('@/views/libraryResourceConcerns/index'),
  },
  {
    path: '/apps/meetings',
    name: 'apps-meetings',
    component: () => import('@/views/meetings/index'),
  },
  {
    path: '/apps/service_concerns',
    name: 'apps-service_concerns',
    component: () => import('@/views/serviceConcerns/index'),
  },
  {

    path: '/apps/invoice/preview/:id',
    name: 'apps-invoice-preview',
    component: () => import('@/views/apps/invoice/invoice-preview/InvoicePreview.vue'),
  },


]
