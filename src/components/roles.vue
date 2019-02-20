<template>
  <el-card>
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button type="primary" class="btn">添加角色</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="scope">
          <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="deleRights(scope.row,item1)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row class="level2" v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleRights(scope.row,item2)"
                    closable
                    type="warning"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-tag
                      @close="deleRights(scope.row,item3)"
                      closable
                      type="info"
                      v-for="(item3,i) in item2.children"
                      :key="i"
                    >{{item3.authName}}</el-tag>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
      <el-table-column prop="name" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="showDiaSetRights(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-tree
          ref="treeDom"
          :data="treelist"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="arrExpand"
          :props="defaultProps"
        ></el-tree>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      treelist: [],
      // arrCheck: [],
      arrExpand: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      currRoleId: -1
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    async setRights() {
      const arr1 = this.$refs.treeDom.getCheckedKeys();
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
      // console.log(arr2);
      const arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.dialogFormVisible = false;
        this.getRoles();
      }
    },
    async showDiaSetRights(role) {
      this.currRoleId = role.id;
      const res = await this.$http.get(`rights/tree`);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.treelist = data;
        const temp = [];
        // this.treelist.forEach(item1 => {
        //   temp.push(item1.id);
        //   item1.children.forEach(item2 => {
        //     temp.push(item2.id);
        //     item2.children.forEach(item3 => {
        //       temp.push(item3.id);
        //     });
        //   });
        // });
        // this.arrCheck = temp;

        const temp2 = [];
        role.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              temp2.push(item3.id);
            });
          });
        });
        this.arrExpand = temp2;
      }
      this.dialogFormVisible = true;
    },
    async deleRights(role, rights) {
      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rights.id}`
      );
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // this.getRoles();
        role.children = data;
      }
    },
    async getRoles() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data;
        // console.log(this.list);
      }
    }
  }
};
</script>
<style>
.btn {
  margin-top: 10px;
}
.level1,
.level2 {
  margin-bottom: 10px;
}
</style>
