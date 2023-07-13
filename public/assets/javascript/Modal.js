class Modal{
    constructor(options={
        'id': id
    }){
        this.id = options.id
    }

    renderModal = () => {
        let modal = document.createElement('div');
        modal.setAttribute('id',this.id);
        modal.setAttribute('tabindex',-1);
        modal.setAttribute('class','modal fade');
        modal.setAttribute('aria-labelledby',this.id+'_title');
        modal.setAttribute('aria-hidden',true);

        let html = [`<div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" type="button">Save</button>
                </div>
            </div>
        </div>`].join('');
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
    }

    show = () => {
        $(`#${this.id}`).modal({
            backdrop: 'static'
        });
    }
}