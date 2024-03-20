<template>
  <div class="mycreateteam_container">
    <TeamCardList :teamList="teamList"></TeamCardList>
  </div>
</template>

<script>
import TeamCardList from "../components/TeamCardList.vue";
import { getCreateTeam } from "../api/request";
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
    async getCreateTeam() {
      const { data: res } = await getCreateTeam(this.id);
      this.teamList = res.data;
    },
  },
  created() {
    this.getCreateTeam();
  },
};
</script>

<style></style>
