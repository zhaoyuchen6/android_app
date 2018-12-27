"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  router: undefined,
  currentActivityManager: undefined,
  Vue: undefined,
  closeInitialize: true,
  changeActivityManager: function changeActivityManager(activityManager) {
    activityManager.router = this.router;
    if (this.currentActivityManager === activityManager) {
      return;
    }

    if (this.currentActivityManager && this.currentActivityManager.close) {
      this.currentActivityManager.close();
    }

    this.currentActivityManager = activityManager;
    this.Vue.prototype.$activityManager = this.currentActivityManager;
    if (!!activityManager & this.closeInitialize) {
      activityManager.initialize();
    }
  },
  setAble: function setAble(bool) {
    this.closeInitialize = bool;
  }
};