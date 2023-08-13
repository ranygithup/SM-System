class ExpandabelRow{
    constructor(id,options={
        'dontClickOn': dontClickOn
    }){
        this.tbl_id = id;
        this.dontClickOn = options.dontClickOn;
        this.addEventClick();
    }

    addEventClick = () => {
        let tr = $(`#${this.tbl_id}`).find('tbody > tr');
        let class_list = this.dontClickOn;

        tr.off('click').on('click',function(e){
            e.preventDefault();
            class_list.map(cls => {
                if(!($(e.target).is(`a.${cls} > *`)))
                    console.log($(this).data('id'));
            });
        });
    }
}