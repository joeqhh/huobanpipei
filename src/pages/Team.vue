<template>
  <div class="team_container">
    <van-button type="info" @click="joinTeam">添加队伍</van-button>
    <TeamCardList :teamList="teamList"></TeamCardList>
  </div>
</template>

<script>
import { getTeamList } from "../api/request";
import TeamCardList from "../components/TeamCardList.vue";
export default {
  components: {
    TeamCardList,
  },
  data() {
    return {
      teamList: [],
    };
  },
  methods: {
    joinTeam() {
      this.$router.push({
        path: "/team/add",
      });
    },
    async getTeamList() {
      const { data: res } = await getTeamList();
      this.teamList = res.data;
    },
  },
  mounted() {
    this.getTeamList();
  },
};
</script>

<style></style>
