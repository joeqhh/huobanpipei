<template>
  <div class="useredit_contai">
    <van-form @submit="onSubmit">
      <van-field
        :name="user.editKey"
        :label="user.editName"
        :placeholder="`请输入${user.editName}`"
        v-model="user.currentValue"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { updateUser, getCurrentUser } from "../api/request";
export default {
  data() {
    return {
      user: {
        id: null,
        editKey: this.$route.query.editKey,
        editName: this.$route.query.editName,
        currentValue: this.$route.query.currentValue,
      },
    };
  },
  methods: {
    async onSubmit() {
      const currentUser = await getCurrentUser();
      this.user.id = currentUser.id;
      const { data: res } = await updateUser(this.user);
      if (res.code === 0)
        currentUser[this.user.editKey] = this.user.currentValue;
      Toast(res.message);
      console.log(currentUser);
    },
  },
};
</script>

<style></style>
