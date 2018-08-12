<template lang="html">
  <el-row>
    <el-row style="padding:10px 15px;background:#fff">
      <el-col>
        <el-button size="small" type="primary" @click="addClass" style="float:right">添加分类</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table style='width:100%' align="center" :data="lists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60"></el-table-column>
          <el-table-column prop="campus" min-width="180" label="所在校区"></el-table-column>
          <el-table-column prop="content" min-width="180" label="分类名称"></el-table-column>
          <el-table-column prop="id" min-width="180" label="分类id"></el-table-column>
          <el-table-column min-width="200" label="操作">
            <template slot-scope='scope'>
                      <el-button size="small" type='primary' @click="editClass(scope.row)">编辑</el-button>
                      <el-button size="small" type='danger' @click="remove(scope.row.uid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 表格结束 -->
    <el-row>
        <el-col>
          <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form :model="classifyInf" label-width="120px" ref="classifyInf" :rules="formRule">
                <el-form-item label="分类名称" prop="content">
                  <el-input v-model='classifyInf.content' auto-complete='off'></el-input>
                </el-form-item>
                <el-form-item label="分类id" prop="id">
                  <el-input v-model='classifyInf.id' auto-complete='off'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit" :loading="editLoading" >{{btnText}}</el-button>
            </div>
          </el-dialog>
          <!-- 弹窗结束 -->
        </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import {
    sub
  } from '../../assets/js/commen'
  export default {
    data() {
      return {
        lists: [],
        listLoading: false,
        formTitle: '',
        formVisible: false,
        classifyInf: {
          uid:0,
          id: 0,
          content: ''
        },
        formRule: {
          content: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }]
        },
        editLoading: false,
        btnText: '提交'
      }
    },
    methods: {
      // 获取分类列表
      getLists() {
        this.listLoading = true
        this.$api.getClassify()
          .then((result) => {
                console.log(result)
            let data=result.data.lists
            data.forEach(kind => {
              switch (kind.campus) {
                case '1':
                  kind.campus='宝山'
                  break;
                case '2':
                  kind.campus='延长'
                  break;
                case '3':
                  kind.campus='嘉定'
                  break;
                default:
                  break;
              }
              //console.log(kind)
            });
            setTimeout(() => {
              this.listLoading = false
              this.lists = data;
            }, this.$con.BACKLOADTIM)
          })
      },
      remove(classUid) {
        this.$confirm('确认要删除吗?', '提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'waring'
          })
          .then(() => {
            this.listLoading = true;
            this.$api.removeClassifyList({
                classUid
              })
              .then(({
                data: {
                  code,
                  message
                }
              }) => {
                this.listLoading = false
                // 这里需要优化
                if (code == 200) {
                  this.$notify({
                    title: '成功',
                    message,
                    type: 'success'
                  })
                } else if (code == 401) {
                  this.$notify({
                    title: '失败',
                    message,
                    type: 'error'
                  })
                  setTimeout(() => {
                    this.$router.replace({
                      path: '/login'
                    })
                  }, this.$con.BACKLOADTIM)
                  return false //阻止继续执行
                  // 需要优化
                }
                this.getLists()
              }).catch(err => {
                // 这里可以跳转到错误页面
              })
          }).catch((err) => {})
      },
      // 显示创建分类弹窗
      addClass() {
        this.formVisible = true;
        this.formTitle = '新增';
        this.classifyInf.content = '';
        this.classifyInf.id = '';
      },
      // 显示编辑分类弹窗
      editClass(row) {
        this.formVisible = true;
        this.formTitle = '编辑';
        this.classifyInf.content = row.content
        this.classifyInf.id = row.id,
        this.classifyInf.uid=row.uid
      },
      editSubmit() {
        this.$refs.classifyInf.validate(valid => {
          if (valid) {
            this.btnText = "提交中"
            this.editLoading = true
            // 新增分类
            if (this.formTitle == '新增') {
              // 这里又是一个异步提交
              this.$api.addClassify({
                  content: this.classifyInf.content,
                  id: this.classifyInf.id
                })
                .then((res) => {
                  sub(this, res)
                })
            } else {
              // 编辑
              this.$api.editClassfy({
                  uid:this.classifyInf.uid,
                  id: this.classifyInf.id,
                  content: this.classifyInf.content
                })
                .then((res) => {
                  sub(this, res)
                })
            }
          }
        })
      }
    },
    mounted() {
      this.getLists();
    }
  }
</script>

<style lang="css">
  .page {
    padding: 10px;
    background: #fff;
  }
</style>
