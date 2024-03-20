<template>
  <div class="search_container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-tag
      closeable
      size="medium"
      type="primary"
      v-for="tag in activeIds"
      :key="tag"
      @close="doClose(tag)"
    >
      {{ tag }}
    </van-tag>

    <van-divider content-position="left" @click="show1">选择标签</van-divider>
    <van-tree-select
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="activeIndex"
    />

    <div style="padding: 20px">
      <van-button block type="primary" @click="search">搜索</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "请输入搜索关键词",
      show: true,
      orginalItems: [
        {
          text: "性别",
          children: [
            {
              text: "男",
              id: "男",
            },
            {
              text: "女",
              id: "女",
            },
          ],
        },
        {
          text: "年级",
          children: [
            {
              text: "大一",
              id: "大一",
            },
            {
              text: "大二",
              id: "大二",
            },
            {
              text: "大三",
              id: "大三",
            },
            {
              text: "大四",
              id: "大四",
            },
          ],
        },
        {
          text: "语言",
          children: [
            {
              text: "java",
              id: "java",
            },
            {
              text: "c++",
              id: "c++",
            },
            {
              text: "python",
              id: "python",
            },
          ],
        },
      ],
      items: [],
      activeIds: [],
      activeIndex: 0,
    };
  },
  methods: {
    onSearch() {
      this.items = [...this.orginalItems];
      this.items = this.items.map((parentTag) => {
        const tempChildren = [...parentTag.children];
        const tempParentag = { ...parentTag };
        tempParentag.children = tempChildren.filter((item) => {
          return item.text.includes(this.value);
        });
        return tempParentag;
      });
    },
    onCancel() {
      this.items = [...this.orginalItems];
    },
    doClose(tag) {
      this.activeIds = this.activeIds.filter((item) => {
        return item !== tag;
      });
    },
    search() {
      this.$router
        .push({
          path: "/search/result",
          query: {
            tags: JSON.stringify(this.activeIds),
          },
        })
        .catch((err) => {});
    },
    show1() {
      console.log(this.activeIds);
    },
  },
  created() {
    this.items = [...this.orginalItems];
  },
};
</script>

<style></style>
