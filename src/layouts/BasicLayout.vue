<template>
  <div class="basiclayout_container">
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div id="content">
      <router-view></router-view>
    </div>

    <van-tabbar route>
      <van-tabbar-item to="/index" icon="home-o" name="index"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/team" icon="search" name="team"
        >队伍</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="friends-o" name="user"
        >用户</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import Index from "@/pages/Index.vue";
import Team from "@/pages/Team.vue";
import User from "@/pages/User.vue";

export default {
  components: { Index, Team, User },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      // Toast("按钮");
      this.$router.push("/search");
    },
    onChange(index) {},
  },
};
</script>

<style>
#content {
  margin-bottom: 50px;
}
</style>
