<template lang="html">
  <el-row>
    <el-col>
      <el-form ref="placeCreate" :model="place" :rules="createRules" >
        <el-row style="margin-top:20px">
          <el-col :span='7' :push="1">
            <el-form-item label="地点标题" label-width="90px" prop="title">
              <el-input v-model="place.title" style="width:150px" placeholder="请在此处输入名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :push="3" >
            <el-form-item label="所属分类" label-width="90px" prop="content">
              <el-select v-model="place.content" placeholder="请选择分类">
                <el-option v-for="(item,index) in classifyList" :label="item.content" :value="item.id" :key='index'></el-option>
            </el-select>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px">
          <el-form-item label="地点简介" label-width="130px" prop="synopsis">
              <el-input v-model="place.synopsis" style="width:500px" placeholder="请在此处输入简介"></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='7' :push="1">
            <el-form-item label="经度" label-width="90px" prop="longtitude">
              <el-input v-model="place.longitude" style="width:150px" placeholder="请在此处输入经度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='7' :push="3">
            <el-form-item label="纬度" label-width="90px" prop="latitude">
              <el-input v-model="place.latitude" style="width:150px" placeholder="请在此处输入纬度"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px">
            <el-form-item class="show" prop="description" >
               <el-input type="textarea" v-model="place.description" :rows="4" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="createPlace" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
export default {
  data(){
    return {
      place:{
        content:'',
        title:'',
        synopsis: '',
        description:'',
        latitude:'',
        longitude:'',
      },
      classifyList:[],
      createRules:{
        title:[
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        synopsis:[
          { required: true,message: '请输入简介',trigger: 'blur' }
        ],
      },
      load:false,
      btnText:"立即发布"
    }
  },
  methods:{
    createPlace(){
      //console.log(this.place)

        this.$refs.placeCreate.validate(valid=>{
          if(valid){
            this.$confirm("确认提交吗?","提示",{})
                .then(()=>{
                  this.load = true;
                    this.btnText = "发布中"

                    this.$api.createPlace({
                      ...this.place
                    })
                    .then(({data:{code,message}})=>{
                            this.btnText="立即发布";
                            this.editLoading = false;
                            if(code==200){
                                  this.$notify({
                                    title:'成功',
                                    message,
                                    type:'success'
                                  })
                            }else if(code==401){
                              this.$notify({
                                title:'失败',
                                message,
                                type:'error'
                              })
                              setTimeout(()=>{
                                this.$router.push({path:'login'})
                              },this.$con.BACKLOADTIME)
                              return false
                            }

                            setTimeout(()=>{
                              this.$router.push({path:'/placeList'})
                            },this.$con.BACKLOADTIM)
                        })
                })
                .catch((error)=>{
                })
          }
        })
    },
    // 取消
    cancle(){
      this.$router.push({path:'/placeList'});
    }
  },
  computed:{

  },
  mounted(){
      this.$api.getClassify()
        .then(({data:{code,lists}})=>{
          if(code==200){
            lists.forEach(place => {
              switch (place.campus) {
                case '1':
                  place.content='宝山'+place.content
                  break;
                case '2':
                  place.content='延长'+place.content
                  break;
                case '3':
                  place.content='嘉定'+place.content
                  break;
                default:
                  break;
              }
            });
            this.classifyList = lists;
          }
        })
  }

}
</script>

<style lang="css" >
</style>
