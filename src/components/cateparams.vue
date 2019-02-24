<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
    <el-alert class="alert" title="只能为三级分类设置参数" type="warning" show-icon left></el-alert>
    <el-form label-position="top" label-width="80px" :model="form" class="from">
      <el-form-item label="商品分类">
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs @tab-click="changeTab()" tab-position="top" style="height: 200px;" v-model="actions">
      <el-tab-pane label="动态参数" name="1">
        <el-button disabled>设置动态参数</el-button>
        <el-table
          height="350px"
          border
          stripe
          :data="arrDy"
          style="width: 100%"
          @expand-change="fn"
        >
          <!-- 序号 -->
          <el-table-column type="expand" width="100">
            <template slot-scope="scope">
              <el-tag
                :key="i"
                v-for="(item,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column label="操作" width="100">
            <template>
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button disabled>设置静态参数</el-button>
        <el-table height="300px" border stripe :data="arrStatic" style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值"></el-table-column>
          <el-table-column label="操作" width="100">
            <template>
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      selectedOptions: [],
      options: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      },
      arrDy: [],
      arrStatic: [],
      actions: "1",
      inputVisible: false,
      inputValue: "",
      inputVals: {}
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    fn(row, expandedRows) {
      // console.log(row);
      // console.log(expandedRows);
      if (expandedRows.length > 1) {
        expandedRows.shift();
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
          {
            attr_name: obj.attr_name,
            attr_sel: obj.attr_sel,
            attr_vals: obj.attr_vals.join(",")
          }
        );
        // console.log(res);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async handleClose(obj, item) {
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );
    },
    async changeTab() {
      this.getData();
    },
    async handleChange() {
      this.getData();
    },
    // 获取数据
    async getData() {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning("请先选择三级分类");
        return;
      }
      if (this.actions === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        //   console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data;
        // console.log(data);
        if (status === 200) {
          this.arrDy = data;
          this.arrDy.forEach(item => {
            // 三元
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
          // for (let index = 0; index < this.arrDy.length; index++) {
          //   this.inputVals["a" + index] = "";
          // }
        }
      }
      if (this.actions === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        //   console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrStatic = data;
        }
        // console.log(data)
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    }
  }
};
</script>
<style scoped>
.box {
  height: 100%;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
