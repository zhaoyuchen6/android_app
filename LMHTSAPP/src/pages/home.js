export default [{
  name: 'homePage',
  page: () =>
    import ( /* webpackChunkName: "t10001" */ './modules/home/homePage.vue')
  },
  {
    name: 'businessType',
    page: () =>
      import ( /* webpackChunkName: "t10002" */ './modules/home/businessType.vue')
  },
]
