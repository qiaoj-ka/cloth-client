<template>
    <div class="dialog1">
        <el-dialog 
            :title="dialog1.title" 
            :visible.sync="dialog1.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
            :before-close='closeDialog'
            width="30%">
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto;">
                    <el-form-item label="服装类型：" prop="clothType">
                        <el-select v-model="formData.clothType" filterable>
                            <el-option v-for="(formclothType,index) in format_clothType_list" :key="index" :label="formclothType" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详情：" prop="detail">
                        <el-input v-model="formData.detail" ></el-input>
                    </el-form-item>
                    <el-form-item  class="text_right">
                        <el-button @click="onCancal()">取消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import solveApi from '../api/solve.js'
import clothApi from '../api/cloth.js'
export default {
    name: 'useradd-dialog',
    props: {
        dialog1:Object
    },
    data () {
        return {
            formData:{
                clothType:'',
                detail:''
            },
            format_clothType_list:[
            ],
            format_clothId_list:[
            ],
            format_clothRenterName_list:[
            ],
            format_clothRenterId_list:[
            ],
            form_rules:{
                clothType:[
                    { required: true, message: '请选择服装类型', trigger: 'change' }
                ],
                detail:[
                    { required: true, message: '请输入详情', trigger: 'blur' }
                ],
                
            } 
        
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        getInfo(){
            let pojo = {
                userlistId:this.$store.getters.user.jti
            }
            clothApi.getclothListByCondition(pojo).then(res =>{
                if(res.data.flag == true){
                    var userName = new Array();
                    var userId = new Array();
                    var clothType = new Array();
                    var clothId = new Array();
                    for(var i = 0;i < res.data.data.length;i++){
                        userName[i] = res.data.data[i].userlistName;
                        userId[i] = res.data.data[i].userlistId;
                        clothType[i] = res.data.data[i].clothType;
                        clothId[i] = res.data.data[i].clothId;
                    }
                    this.format_clothRenterName_list = userName;
                    this.format_clothRenterId_list = userId;
                    this.format_clothId_list = clothId;
                    this.format_clothType_list = clothType;
                }else{
                    this.$message({
                    message: '获取服装列表失败',
                    type: 'warning'
                    });
                }
            });
        },
        onCancal(){
            //清空表单数据
            this.$refs['form'].resetFields();
            //表单关闭
            this.dialog1.show = false;
        },
        onSubmit(form){
            this.$refs[form].validate(valid => {
                if (valid) {
                    
                    let pojo = {
                        clothDetail:this.format_clothType_list[this.formData.clothType],
                        detail:this.formData.detail,
                        userlistId:this.format_clothRenterId_list[this.formData.clothType],
                        name:this.format_clothRenterName_list[this.formData.clothType],
                        clothId:this.format_clothId_list[this.formData.clothType]
                    };

                    solveApi.addSolve(pojo).then(res =>{
                        //添加成功之后的处理
                        if(res.data.flag){
                            this.$message({
                            message: "申报成功",
                            type: "success"
                            });
                            //清空表单数据
                            this.$refs['form'].resetFields();
                            //表单关闭
                            this.dialog1.show = false;
                            //初始化用户列表
                            this.$emit('update');
                        }else{
                            this.$message({
                            message: "申报失败",
                            type: "warning"
                            });
                            
                        }
                        
                    });
                    
                    
                }
            });
        },
        closeDialog(done){ 
            if (this.$refs['form'] !== undefined) {
                        this.$refs['form'].resetFields();
                    } 
            done();
        },
    }
};
</script>


<style scoed>

</style>

