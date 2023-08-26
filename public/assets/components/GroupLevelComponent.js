'use strict';
var GroupLevelComponent = new function(){
    let mThis = this;
    this.title_prop = 'Group Level';
    this.self = $('#_main_groupLevelComponent');

    this.tblGroupLevel = mThis.self.find('#tbl_gpl_');

    this.init = () => {};

    this.show = (options) => {
        if(!options) options = {};
        main_view.setTitle(mThis.title_prop);
        mThis.self.show().siblings().hide();
    };
};

window.addEventListener('DOMContentLoaded',() => {
    GroupLevelComponent.init();
});