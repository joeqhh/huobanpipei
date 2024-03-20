<template>
  <div class="cardlist_container">
    <van-card
      v-for="user in userList"
      :key="user.id"
      :desc="user.profile"
      :title="user.userName"
      :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" :key="tag">{{
          tag
        }}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: {
    userList: {
      type: [],
      default: null,
    },
  },
};
</script>

<style></style>
