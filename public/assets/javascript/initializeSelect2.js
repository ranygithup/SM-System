window.addEventListener('load', () => {
    $.fn.modal.Constructor.prototype._enforceFocus = function(){};

    $(document).find('select.select2').select2({
        width: 'resolve'
    }).on('select2:close', function(e){
        if(Validator){
            if(typeof Validator.onLostFocus_select2 === 'function')
                Validator.onLostFocus_select2($(this));
        }
    });

    $(document).find('select.modal-select2').select2({
        width: '100%'
    }).on('select2:close',function(e){
        if(Validator){
            if(typeof Validator.onLostFocus_select2 === 'function')
                Validator.onLostFocus_select2($(this));
        }
    });
});