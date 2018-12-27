<template>
  <div>
    <aui-group :title='$t(title)'><aui-input></aui-input></aui-group>
    <br>
    <aui-button @click="handleClick">{{$t("i18n.changeLang")}}</aui-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "name",
      title: "i18n.name"
    };
  },
  methods: {
    handleClick() {
      let lang = this.$i18n.locale()=="en" ? "zh-CN" : "en";
      this.$i18n.set(lang);
      console.log(this.$i18n.locale());
    }
  }
};
</script>

<style>

</style>
