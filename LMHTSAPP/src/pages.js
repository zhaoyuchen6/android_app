export default [ 
{
    name: 'step1',
    page: () =>
      import ( /* webpackChunkName: "t10001" */ './modules/first/step1.vue')
  },
  {
    name: 'step2',
    page: () =>
      import ( /* webpackChunkName: "t10002" */ './modules/first/step2.vue')
  },
	{
  name: 'homePage',
  page: () =>
    import ( /* webpackChunkName: "t10001" */ './modules/home/homePage.vue')
  },
  {
    name: 'businessType',
    page: () =>
      import ( /* webpackChunkName: "t10002" */ './modules/home/businessType.vue')
  },,
	{
    name: 'mapPoint',
    page: () =>
      import ( /* webpackChunkName: "t10001" */ './modules/amebient-point/mapPointer.vue')
  },
  {
    name: 'radarMap',
    page: () =>
      import ( /* webpackChunkName: "t10002" */ './modules/amebient-point/radarDistribution.vue')
  },
	{
        name: 'transferRemittance',
        page: () =>
            import ( /* webpackChunkName: "t10001" */ './modules/smart-form/transferRemittance.vue')
    }
,
	]