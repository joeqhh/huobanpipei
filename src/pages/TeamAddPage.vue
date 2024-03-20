<template>
  <div class="teamaddpage_container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="teamAddRequest.name"
        name="队伍名"
        label="队伍名"
        placeholder="请输入队伍名"
      />

      <van-field
        v-model="teamAddRequest.descreption"
        rows="1"
        autosize
        type="textarea"
        name="队伍描述"
        label="队伍描述"
        placeholder="请输入队伍描述"
      />

      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="value"
        label="过期时间"
        placeholder="选择队伍过期时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="teamAddRequest.expireTime"
          type="datehour"
          title="选择队伍过期时间"
          :min-date="minDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="teamAddRequest.maxNum" max="10" min="2" />
        </template>
      </van-field>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group
            v-model="teamAddRequest.status"
            direction="horizontal"
          >
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">加密</van-radio>
            <van-radio name="2">私有</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-if="teamAddRequest.status === '1'"
        v-model="teamAddRequest.password"
        type="password"
        name="队伍密码"
        label="队伍密码"
        placeholder="队伍密码"
        :rules="[{ required: true, message: '请填写密码' }]"
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
import { addTeam } from "../api/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      radio: "1",
      value: "",
      showPicker: false,
      minDate: new Date(),
      teamAddRequest: {
        descreption: "",
        expireTime: "",
        maxNum: 0,
        name: "",
        password: "",
        status: "0",
      },
    };
  },
  methods: {
    async onSubmit() {
      this.teamAddRequest.status = Number(this.teamAddRequest.status);
      const { data: res } = await addTeam(this.teamAddRequest);
      if (res.code === 0) Toast.success("添加成功");
      else Toast.fail(res.message);
    },
    onConfirm(time) {
      this.value = time.toString();
      this.showPicker = false;
    },
  },
};
</script>

<style></style>
