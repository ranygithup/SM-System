'use strict';
var RegistrationComponent = new function(){
    let mThis = this;
    this.title_prop = 'Registration';
    this.self = $('#_main_registrationComponent');

    this.init = () => {};

    this.show = (options) => {
        if(!options) options = {};
        main_view.setTitle(mThis.title_prop);
        mThis.self.show().siblings().hide();
    };
};

window.addEventListener('DOMContentLoaded',() => {
    RegistrationComponent.init();
});