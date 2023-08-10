class Utils{
    constructor(){}

    setComboItems(elSelect, data, value, text, def_value=null){
        let options = null;
        if(def_value){
            let d = data ? data : [];
            d.map(option => {
                options = [options, `<option value="${option[value]}">${option[text]}</option>`].join('');
            });
            elSelect.html(options);
            elSelect.val(def_value).trigger('change');
        }
        else{
            let d = data ? data : [];
            d.map(option => {
                options = [options, `<option value="${option[value]}">${option[text]}</option>`].join('');
            });
            options = [options,`<option selected></option>`].join('');
            elSelect.html(options);
        }
    }
};

const util = new Utils();