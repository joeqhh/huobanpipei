<template>
  <div class="teamcardlist_container" v-if="flag">
    <van-card
      v-for="team in teamList"
      :key="team.id"
      :desc="team.descreption"
      :title="team.name"
      :thumb="defaultImg"
    >
      <template #tags>
        <van-tag
          :type="
            team.status === '公开'
              ? 'primary'
              : team.status === '加密'
              ? 'warning'
              : 'danger'
          "
          size="large"
          >{{ team.status }}</van-tag
        >
      </template>

      <template #footer v-if="team.status !== '私有'">
        <van-button
          type="info"
          size="mini"
          @click="joinTeam(team)"
          v-if="!team.isJoined"
          >加入队伍</van-button
        >
        <van-dialog
          v-model="show"
          title="标题"
          show-cancel-button
          @confirm="confirm"
          @cancel="password = null"
        >
          <van-field
            v-model="password"
            type="password"
            name="队伍密码"
            label="队伍密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写队伍密码' }]"
          />
        </van-dialog>

        <van-button
          type="primary"
          size="mini"
          v-if="team.isJoined && team.createUser.id === currentUser.id"
          @click="doUpdateTeam(team)"
          >修改队伍</van-button
        >
        <van-button
          type="warning"
          size="mini"
          v-if="team.isJoined && team.isJoined"
          @click="doQuitTeam(team)"
          >退出队伍</van-button
        >
        <van-button
          type="danger"
          size="mini"
          v-if="team.isJoined && team.createUser.id === currentUser.id"
          >解散队伍</van-button
        >
      </template>

      <template #bottom>
        <div>队长: {{ team.createUser.userName }}</div>
        <div>最大人数: {{ team.maxNum }}</div>
        <div>过期时间：{{ team.expireTime }}</div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { Toast } from "vant";
import {
  joinTeam,
  getCurrentUser,
  getJoinTeam,
  quitTeam,
} from "../api/request";
export default {
  name: "teamcardlist",
  data() {
    return {
      team: null,
      password: null,
      show: false,
      flag: false,
      teamStatus: "",
      joinTeamList: null,
      currentUser: null,
      defaultImg: "http://localhost:7529/api/img/p5.jpg",
    };
  },
  props: {
    teamList: {
      type: [],
      default: null,
    },
  },
  methods: {
    joinTeam(team) {
      this.team = team;
      if (team.status === "加密") this.show = true;
      else this.confirm();
    },

    async confirm() {
      let teamJoinRequest = {
        name: this.team.name,
        password: this.password,
        teamId: this.team.id,
      };
      const { data: res } = await joinTeam(teamJoinRequest);
      if (res.code === 0) {
        Toast.success("添加成功");
        this.team.isJoined = true;
        this.$forceUpdate();
      } else Toast.fail(res.message);
      this.password = null;
    },

    async getCurrentUser() {
      this.currentUser = await getCurrentUser();
      this.getJoinTeam();
    },
    async getJoinTeam() {
      const { data: res } = await getJoinTeam(this.currentUser.id);
      this.joinTeamList = res.data;
      this.teamList.forEach((element) => {
        element.isJoined = false;
        this.joinTeamList.some((i, index) => {
          if (element.id === i.id) {
            element["isJoined"] = true;
            return true;
          }
          return false;
        });
      });
      this.flag = true;
    },
    async doQuitTeam(team) {
      const { data: res } = await quitTeam(team.id);
      if (res.code === 0) {
        Toast.success("退出成功");
        team.isJoined = false;
        this.$forceUpdate();
      } else Toast.fail(res.message);
    },
    doUpdateTeam(team) {
      this.$router.push({
        name: "TeamUpdate",
        query: {
          team: JSON.stringify(team),
        },
      });
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>

<style lang="less">
.teamcardlist_container {
  .van-card__thumb {
    height: 120px;
  }
}
</style>
