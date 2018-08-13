<template lang="html">
  <el-row>
    <el-row style="padding:10px 15px;">
      <el-col>
          <el-button size="small" type="primary" @click="createPlace" style="float:right">增加地点</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
          <el-table
             style='width:100%' align="center" :data="placeLists"  v-loading="listLoading" element-loading-text="拼命加载中">
              <el-table-column type='index'  ></el-table-column>
              <el-table-column prop="title"  label="地点名字" ></el-table-column>
              <el-table-column prop="kind"  label="校区分类" ></el-table-column>
              <el-table-column prop="id"  label="地点id" ></el-table-column>
              <el-table-column prop="synopsis"  label="简述" ></el-table-column>
              <el-table-column prop="longitude"  label="经度" ></el-table-column>
              <el-table-column prop="latitude"  label="纬度" ></el-table-column>
              <el-table-column prop="description"   label="详细描述" ></el-table-column>
              <el-table-column prop="headimg"  label="图片" ></el-table-column>

              <el-table-column  label="操作" >
                <template slot-scope='scope'>
                  <el-button size="small" type='primary' @click="editPlace(scope.row.uid)">编辑</el-button>
                  <el-button size="small" type='danger' @click="remove(scope.row.uid)">删除</el-button>
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
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      return {
        placeLists:[],
        total:0,
        page:1,
        limit:10, //每页10条
        listLoading:false,
        formTitle:'',
        formVisible:false,
        formRule:{
          classify:[
            {required:true,message:'请输入分类名称',trigger:'blur'}
          ]
        },
        btnText:'提交'
      }
    },
    methods:{
      handle(val){
        this.page = val;
        this.getLists()
      },
      getLists(){
        this.listLoading = true;
        this.$api.getPlaceList({page:this.page})
          .then(({data:{placeLists,total}})=>{
            setTimeout(()=>{
              this.listLoading =false
              this.placeLists =placeLists;
              this.total =total;
            },this.$con.BACKLOADTIM)
        });
      },

      remove(uid){
        this.$confirm('确认要删除吗?','提醒',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'waring'
        })
        .then(()=>{
          this.listLoading = true;
          this.$api.removeOnePlace({uid})
              .then(()=>{
                this.listLoading = false
                this.$notify({
                  title:'成功',
                  message:"删除成功",
                  type:'success'
                })
                this.getLists()
              })
        }).catch((err) => {
          console.log(err);
        })

      },
      //跳转到编辑界面，进行更新
      editPlace(uid){
        // 通过this.$route.params来获取数据
          this.$router.push({path:`/placeEdit/${uid}`});
      },
      // 跳转到编辑界面，进行新建
      createPlace(){
          this.$router.push({path:'/placeCreate'});
      }

    },
      mounted(){
        this.getLists();
      }
}
</script>

<style lang="css">
  .page{
    padding:10px;
    background:#fff;
  }
</style>
