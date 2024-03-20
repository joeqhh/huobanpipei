<template>
  <div class="index_container">
    <van-cell center title="心动模式">
      <template #right-icon>
        <van-switch v-model="checked" size="24" @change="changeMode" />
      </template>
    </van-cell>
    <CardList :userList="userList"></CardList>
    <van-empty
      description="搜索结果为空"
      v-if="userList === null || userList.length === 0"
    />
  </div>
</template>

<script>
import CardList from "../components/CardList.vue";
import { getCurrentUser, getRecommendUser, matchUser } from "../api/request";
export default {
  components: { CardList },
  comments: {
    CardList,
  },
  data() {
    return {
      checked: false,
      userList: [],
      pageNum: 1,
      pageSize: 10,
      matchUserRequest: {
        id: null,
        num: null,
      },
    };
  },
  methods: {
    async getRecommendUser() {
      const { data: res } = await getRecommendUser(this.pageNum, this.pageSize);
      this.userList = res.data;
    },
    async matchUser() {
      const { data: res } = await matchUser(this.matchUserRequest);
      this.userList = res.data;
    },
    async getCurrentUser() {
      const currentUser = await getCurrentUser();
      this.matchUserRequest.id = currentUser.id;
    },
    changeMode() {
      if (this.checked === true) this.matchUser();
      else this.getRecommendUser();
    },
  },
  created() {
    this.getRecommendUser();
    this.getCurrentUser();
  },
};
</script>

<style></style>
