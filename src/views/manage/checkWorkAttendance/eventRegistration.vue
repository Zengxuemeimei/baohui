<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">考勤管理-请假、加班登记</p>
    </header>
    <main class="content-main">
        <el-tabs type="border-card" class="mt10">
            <el-tab-pane label="请假">
              <WorkList recordType="请假"/>
            </el-tab-pane>
             <el-tab-pane label="加班">
               <WorkList recordType="加班"/>
            </el-tab-pane>
        </el-tabs>
    </main>
    
  </div>
</template>

<script>
import WorkList from '@/components/workList/index'
import { staffSaveOrUpdate } from '@/api/calendar'

export default {
  name: 'EventRegistration',
  components: {WorkList},
  data() {
    return {
      isAdd:false,
      // title:'请假',
      recordType:'请假'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    
  }
}
</script>
<style scoped>

</style>
