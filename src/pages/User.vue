<template>
  <div class="user_container" v-if="user != null">
    <van-cell title="用户名" :value="user.userName" />
    <van-cell title="修改用户信息" is-link @click="doUserUpdate" />
    <van-cell title="创建的队伍" is-link @click="doMyCreateTeam" />
    <van-cell title="加入的队伍" is-link @click="doJoinTeam" />
  </div>
</template>

<script>
import { getCurrentUser } from "../api/request";
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async getCurrentUser() {
      this.user = await getCurrentUser();
      if (this.user === null) this.$router.replace("/login");
    },
    doUserUpdate() {
      this.$router.push({
        name: "UserUpdate",
      });
    },
    doMyCreateTeam() {
      this.$router.push({
        name: "MyCreateTeam",
        query: {
          id: this.user.id,
        },
      });
    },
    doJoinTeam() {
      this.$router.push({
        name: "MyJoinTeam",
        query: {
          id: this.user.id,
        },
      });
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
