<template>
  <div class="searchresults_container">
    <CardList :userList="userList"></CardList>

    <van-empty
      description="搜索结果为空"
      v-if="userList === null || userList.length === 0"
    />
  </div>
</template>

<script>
import { searchUserByTags } from "../api/request";
import CardList from "../components/CardList.vue";
export default {
  components: {
    CardList,
  },
  data() {
    return {
      tags: JSON.parse(this.$route.query.tags),
      userList: [],
    };
  },
  methods: {
    async searchUserByTags() {
      const { data: res } = await searchUserByTags(this.tags);
      this.userList = res.data;
    },
  },
  created() {
    this.searchUserByTags();
  },
};
</script>

<style></style>
