window.addEventListener('load',() => {
    $.fn.modal.Constructor.prototype._enforceFocus = function(){};

    $(document).find('select.select2').select2({
        width: 'resolve'
    });

    $(document).find('select.modal-select2').select2({
        width: '100%'
    });
});