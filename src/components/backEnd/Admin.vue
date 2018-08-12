<template lang="html">
  <el-row class="panel">
    <el-row class="top">
      <el-col :span='23' class="panel-top" :push="1">
        <!-- push就是相对定位了 -->
        <!--  offset设置的是margin-lef-->
        <el-col :span="19" style='font-size:26px'>
          <span @click="toHome" style="cursor:pointer">Panini&nbsp;<i style="color:#20a0ff">Blogs</i></span>
        </el-col>
        <el-col :span='5' class='rightbar'>
          <el-button type="text" @click="con">注销</el-button>
        </el-col>
      </el-col>
    </el-row>
    <!-- 顶部导航结束 -->
    <el-row class="panel-center">
      <el-col :span="3">
        <el-menu
          style="border-right:none"
          background-color="#324057"
          text-color="#fff"
          router
          default-active="placeList"
          active-text-color="#20A0FF">
          <el-menu-item index="/admin/board">
            <i class="el-icon-star-on"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/admin/placeList">
            <i class="el-icon-document"></i>
            <span slot="title">地点管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/classList">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/newsList">
            <i class="el-icon-news"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 左侧导航结束 -->
      <el-col :span='21' class="panel-c-c">
        <el-row>
          <el-col :span='24' class="breadcrumb">
            <el-breadcrumb separator="/" style='float:right'>
              <el-breadcrumb-item :to="{path:currentPath}">{{currentPathNameParent}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <router-view></router-view>
      </el-col>
      <!--  面包屑导航结束-->
    </el-row>
  </el-row>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        currentPath: '/admin/board',
        currentPathNameParent: '管理面板',
        currentPathName: '主页'
      }
    },
    methods: {
      con() {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('UserLogout')
        }).catch(() => {
        })
      },
      toHome() {
        this.$router.push({
          path: '/'
        });
      }
    },
    watch: {
      "$route"(to, from) {
        this.currentPath = to.path; //变成绝对路径
        this.currentPathName = to.name //匹配的完整的带子路由的name
      }
    },
  }
</script>

<style lang="css" scoped>
  .panel {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #1F2D3D;
  }

  .panel-top {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }

  .panel-top .rightbar {
    text-align: right;
    padding-right: 70px;
  }

  .panel-center {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    /*最外层要hidden*/
    /*这是行，绝对定位之后没有宽度因此必须设置width*/
  }

  .breadcrumb {
    margin-bottom: 15px;
  }

  .panel-c-c {
    /*这是列，因为已经有了列的宽度因此无需设置width*/
    background: #f1f2f7;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    overflow-y: scroll;
    /*内层设置滚动*/
    padding: 30px;
  }
</style>
