'use strict';
var AssignProgramComponent = new function(){
    let mThis = this;
    this.title_prop = 'Assign Program';
    this.self = $('#_main_assignProgramComponent');

    this.init = () => {};

    this.show = (options) => {
        if(!options) options = {};
        main_view.setTitle(mThis.title_prop);
        mThis.self.show().siblings().hide();
    };
};

window.addEventListener('DOMContentLoaded',() => {
    AssignProgramComponent.init();
});