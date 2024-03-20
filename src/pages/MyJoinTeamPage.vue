<template>
  <div class="myjointeam_container">
    <TeamCardList :teamList="teamList"></TeamCardList>
  </div>
</template>

<script>
import TeamCardList from "../components/TeamCardList.vue";
import { getJoinTeam } from "../api/request";
export default {
  components: {
    TeamCardList,
  },
  data() {
    return {
      id: this.$route.query.id,
      teamList: null,
    };
  },
  methods: {
    async getJoinTeam() {
      const { data: res } = await getJoinTeam(this.id);
      this.teamList = res.data;
    },
  },
  created() {
    this.getJoinTeam();
  },
};
</script>

<style></style>
