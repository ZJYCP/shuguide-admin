<template lang="html">
  <el-row>
    <el-col>
      <el-form ref="placeCreate" :model="place" :rules="createRules" >
        <el-row style="margin-top:20px">
          <el-col :span='7' :push="1">
            <el-form-item label="地点名称" label-width="90px" prop="title">
              <el-input v-model="place.title" style="width:150px" placeholder="请在此处输入名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :push="3" >
            <el-form-item label="所属分类" label-width="90px" prop="kind">
              <el-select v-model="place.kind" placeholder="请选择分类">
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
          <el-button type="primary" style="float:right;" size='small' @click="editPlace" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import marked from 'marked';
  import hlj from 'highlight.js'
  import 'highlight.js/styles/atom-one-dark.css'
  export default {
    data() {
      return {
      place:{
        content:'',
        title:'',
        synopsis: '',
        description:'',
        latitude:'',
        longitude:'',
        kind:''
      },
        classifyList: [],
        createRules: {
          title: [{
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }],
          kind: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }],
          classType: [{
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }],
          brief:[{
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }],
        },
        load: false,
        btnText: "立即更新",
        listLoading: false
      }
    },
    computed: {

    },
    methods: {
      // 更新文章
      editPlace() {
        if(this.place.content==this.place.kind)
          this.place.content=0
        this.$refs.placeCreate.validate(valid => {
          if (valid) {
            this.load = true;
            // 换成真实API的时候可以直接提交this.place
            this.btnText = "更新中"
            this.$api.editPlace({
                ...this.place
              })
              .then((res) => {
                this.btnText = "立即更新";
                this.editLoading = false;
                if (res.data.code == 200) {
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.push({
                      path: '/placeList'
                    })
                  }, this.$con.BACKLOADTIM)
                }
              }).catch((err) => {
                console.log(err);
              })
          }
        })
      },
      initial() {
        this.listLoading = true

        setTimeout(() => {
          this.$api.getOnePlace({'uid':this.$route.params.placeId})
              .then(({data: {code,onePlace}}) => {
                if (code == 200) {
                  this.place = onePlace;
                  this.place.content=this.place.kind;
                }
              });
          this.$api.getClassify()
            .then(({data: {code,lists}}) => {
              if (code == 200) {
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
                this.classifyList = lists
              }
          });
          this.listLoading = false
        }, this.$con.BACKLOADTIM)
      },
      // 取消
      cancle() {
        this.$router.push({
          path: '/placeList'
        });
      }
    },
    computed: {

    },
    mounted() {
      this.initial()
    }
  }
</script>


<style scoped>

</style>
