<template lang="html">
  <el-row>
    <el-row style="padding:10px 15px;background:#fff">
      <el-col>
        <el-button size="small" type="primary" @click="addClass" style="float:right">添加新闻</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table style='width:100%' align="center" :data="lists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60"></el-table-column>
              <el-table-column prop="hp_title"  label="新闻标题" ></el-table-column>
              <el-table-column prop="hp_img_url"  label="新闻图片链接" ></el-table-column>
              <el-table-column prop="hp_author"  label="新闻作者" ></el-table-column>
              <el-table-column prop="hp_content" min-width='200' label="新闻内容" ></el-table-column>
              <el-table-column prop="hp_makettime"  label="创建时间" ></el-table-column>
          <el-table-column min-width="200" label="操作">
            <template slot-scope='scope'>
                      <el-button size="small" type='primary' @click="editClass(scope.row)">编辑</el-button>
                      <el-button size="small" type='danger' @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 表格结束 -->
        <el-row>
      <el-col class="page">
          <el-pagination  @current-change="handle" :total="total" :page-size="limit" style="float:right"></el-pagination>
      </el-col>
    </el-row>
    <!-- 分页结束 -->
    <el-row>
        <el-col>
          <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form :model="news" label-width="120px" ref="news" :rules="formRule">
                <el-form-item label="新闻标题" prop="hp_title">
                  <el-input v-model='news.hp_title' auto-complete='off'></el-input>
                </el-form-item>
                <el-form-item label="新闻图片链接" prop="hp_img_url">
                  <el-input v-model='news.hp_img_url' auto-complete='off'></el-input>
                </el-form-item>
                <el-form-item label="新闻作者" prop="hp_author">
                  <el-input v-model='news.hp_author' auto-complete='off'></el-input>
                </el-form-item>
                <el-form-item label="新闻内容" prop="hp_content">
                  <el-input v-model='news.hp_content' auto-complete='off'></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="hp_makettime">
                  <el-date-picker
                    v-model="news.hp_makettime"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
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
        limit:10,
        total:0,
        page:1,
        lists: [],
        listLoading: false,
        formTitle: '',
        formVisible: false,
        news: {
          hp_title:'',
          hp_img_url:'',
          hp_author:'',
          hp_content:'',
          hp_makettime:''
        },
        formRule: {
          hp_title: [{
            required: true,
            message: '请输入新闻标题',
            trigger: 'blur'
          }]
        },
        editLoading: false,
        btnText: '提交',
                pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      }
    },
    methods: {
      handle(val){
        this.page = val;
        this.getLists()
      },
      // 获取分类列表
      getLists() {
        this.listLoading = true
        this.$api.getNewsList({page:this.page})
          .then(({data:{newsList,total}}) => {
           console.log(newsList)
            setTimeout(() => {
              this.listLoading = false
              this.lists = newsList;
              this.total=total;
            }, this.$con.BACKLOADTIM)
          }).catch(err=>{
          })
      },
      remove(id) {
        this.$confirm('确认要删除吗?', '提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'waring'
          })
          .then(() => {
            this.listLoading = true;
            this.$api.removeNews({
                id
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
        this.news.hp_title='';
        this.news.hp_img_url='';
        this.news.hp_author='';
        this.news.hp_content='';
        this.news.hp_makettime=''
      },
      // 显示编辑分类弹窗
      editClass(row) {
        this.formVisible = true;
        this.formTitle = '编辑';
        this.news = row
      },
      editSubmit() {
        this.$refs.news.validate(valid => {
          if (valid) {
            this.btnText = "提交中"
            this.editLoading = true
            // 新增
            if (this.formTitle == '新增') {
              // 这里又是一个异步提交
              this.$api.addNews({
                ...this.news
                })
                .then((res) => {
                  sub(this, res)
                })
            } else {
              // 编辑
              this.$api.editNews({
                ...this.news
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
