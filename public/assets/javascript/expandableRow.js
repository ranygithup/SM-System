class ExpandableRow{
    constructor(tbl,options={
        'dontOnClick': dontOnClick
    }){
        this.tbl = tbl;
        this.dontOnClick = options.dontOnClick;
        this.addEventClick();
    };

    addEventClick = () => {
        let tr = this.tbl.find('tbody > tr');
        let clicks = this.dontOnClick;

        tr.off('click').on('click',function(e){
            e.preventDefault();
            if(clicks.length > 0){
                for(let i=0; i < clicks.length; i++){
                    if($(e.target.parentNode).hasClass(`${clicks[i]}`)){
                        return;
                    }
                }
            }
            let details_row_id = ['details_row',$(this).data('id')].join('_');
            let tr_next = $(this).next();
            let tr_next_siblings = $(this).siblings();

            if(tr_next.attr("id") == details_row_id){
                tr_next.remove();
            }
            else{
                $(this).after(`<tr id="${details_row_id}" class="tr-expendable">
                    <td colspan="100%">
                        <div class="container-expendable p-3 border rounded-3"></div>
                    </td>
                </tr>`);
            }
            tr_next_siblings.each(function(){
                if($(this).hasClass('tr-expendable')){
                    this.remove();
                }
            });
        });
    };
};