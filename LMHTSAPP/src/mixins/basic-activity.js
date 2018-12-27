import { RootActivityManager } from 'ab-manager-activity';

export default {
  name: "basic-activity",
  data() {
    return {
    };
  },
  created() {
    this.onInitialize();
  },
  mounted() {
    this.$activityManager = RootActivityManager.currentActivityManager;
  },
  destroyed() {
  },
  methods: {
    onInitialize() {
      var loading=document.getElementById('Loading');
      if(loading!=null){
        document.body.removeChild(loading);
      }

      console.log('[BasicActivity] onInitialize');
    },
      onClose() {
      console.log('[BasicActivity] onClose');
    },
    onTimeout() {
      console.warn('[BasicActivity] onTimeout');
    }
  }
};
