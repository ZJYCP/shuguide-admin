<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-col>
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <img src="/static/img.jpg" class="user-avator" alt="">
                <div class="user-info-cont">
                  <div class="user-info-name">{{name}}</div>
                  <div>{{role}}</div>
                </div>
              </div>
              <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
              <div class="user-info-list">上次登录地点：<span>上海</span></div>
            </el-card>
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                <span>随便写写</span>
              </div>
              Vue
              <el-progress :percentage="57.2" color="#42b983"></el-progress>
              JavaScript
              <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
              CSS
              <el-progress :percentage="11.9"></el-progress>
              HTML
              <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-location grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{placetotal}}</div>
                  <div>总地点数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-news grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{newstotal}}</div>
                  <div>总新闻数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-view grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{visit_pv}}</div>
                  <div>小程序访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" :body-style="{ height: '304px'}">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    sub
  } from '../../assets/js/commen'
  export default {
    name: 'dashboard',
    data() {
      return {
        placetotal:0,
        newstotal:0,
        visit_pv:0,
        name: 'admin',
        todoList: [
          {
            title: '今天要添加100个地点',
            status: false,
          },
          {
            title: '今天要添加100个新闻',
            status: false,
          },
          {
            title: '今天要写100行代码加几个bug吧',
            status: false,
          }, {
            title: '今天要修复100个bug',
            status: false,
          },
          {
            title: '此模块占位i',
            status: true,
          },
          {
            title: '此模块占位',
            status: true,
          }
        ]
      }
    },

    methods:{
      init(){
        this.$api.getPlaceList({page:1})
          .then(({data:{placeLists,total}})=>{
            setTimeout(()=>{
              this.placetotal =total;
            },this.$con.BACKLOADTIM)
          });
        this.$api.getNewsList({page:1})
          .then(({data:{newsList,total}}) => {
            console.log(newsList)
            setTimeout(() => {
              this.newstotal=total;
            })
          });
        this.$api.getClientNum()
          .then((res) => {
            console.log(res)
            setTimeout(() => {
              // this.newstotal=total;
              this.visit_pv=res.data.msg
            })
          })
      }
    },
    computed: {
      role() {
        return this.name === 'admin' ? '超级管理员' : '普通用户';
      }
    },
    mounted() {
      this.init()
    }
  }

</script>


<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

</style>
