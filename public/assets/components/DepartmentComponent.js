'use strict';
var DepartmentComponent = new function(){
    let mThis = this;
    this.title_prop = "Department";
    this.self = $('#_main_departmentComponent');

    this.init = () => {}

    this.show = (options) => {
        if(!options) options = {};
        main_view.setTitle(mThis.title_prop);
        mThis.self.show().siblings().hide();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    DepartmentComponent.init();
});