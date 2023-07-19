'use strict';
var DepartmentComponent = new function(){
    let mThis = this;
    this.title_prop = "Department";
    this.self = $('#_main_departmentComponent');

    this.tblDepartment = mThis.self.find('#_dpt_tbl');

    this.init = () => {}

    this.displayDepartment = (onFinish = null) => {
        if(typeof onFinish === 'function') onFinish();
    }

    this.show = (options) => {
        if(!options) options = {};
        mThis.displayDepartment(() => {
            main_view.setTitle(mThis.title_prop);
            mThis.self.show().siblings().hide();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    DepartmentComponent.init();
});