<template>
  <div class="user_container" v-if="user != null">
    <van-cell
      title="用户名"
      is-link
      :value="user.userName"
      @click="doEdit('userName', '用户名', user.userName)"
    />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell
      title="头像"
      is-link
      @click="doEdit('avatarUrl', '头像', user.avatarUrl)"
    >
      <div style="width: 100%; height: 100">
        <img :src="user.avatarUrl" style="width: 100%; height: 100%" />
      </div>
    </van-cell>

    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="doEdit('gender', '性别', user.gender)"
    />
    <van-cell
      title="电话"
      is-link
      :value="user.phone"
      @click="doEdit('phone', '电话', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      :value="user.email"
      @click="doEdit('email', '邮箱', user.email)"
    />
    <van-cell title="注册时间" :value="user.createTime" />
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
    doEdit(editKey, editName, currentValue) {
      this.$router.push({
        name: "UserEdit",
        query: {
          editKey: editKey,
          editName: editName,
          currentValue: currentValue,
        },
      });
    },
    async getCurrentUser() {
      this.user = await getCurrentUser();
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
