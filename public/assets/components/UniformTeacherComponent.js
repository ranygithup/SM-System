'use strict';
var UniformTeacherComponent = new function(){
    let mThis = this;
    this.title_prop = 'Uniform Teacher';
    this.self = $('#_main_ufm_TeacherComponent');

    this.tblUniformTeacher = mThis.self.find('#_ufth_tbl');

    this.init = () => {}

    this.displayUniformTeacher = (onFinish = null) => {
        api.getData('api/uniform-teacher/list').then(res => {
            let data = [];
            if(res.status_code === 200){
                data = res.data;
            }
            if(typeof onFinish === 'function') onFinish();
        });
    }

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayUniformTeacher(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

window.addEventListener('DOMContentLoaded',() => {
    UniformTeacherComponent.init();
});