class Modal{
    constructor(options={
        'id': id,
        'title': title,
        'class_name': class_name,
        'html': html
    }){
        this.id = options.id,
        this.title = options.title,
        this.cls_name = options.class_name,
        this.html = options.html
    }

    renderModal = () => {
        let modal = document.createElement('div');
        let op = {
            'id': this.id,
            'tabindex': -1,
            'class': 'modal fade',
            'aria-labelledby': this.id+'_title',
            'aria-hidden': true,
            'data-bs-backdrop': 'static',
            'data-bs-keyboard': 'false'
        };

        const entries = Object.entries(op);
        entries.forEach(([key, value]) => modal.setAttribute(`${key}`,`${value}`));

        let html = [`<div class="modal-dialog modal-dialog-scrollable ${this.cls_name}">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">${this.title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">${this.html}</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
                    <button id="${this.id+'_btn_save'}" class="btn btn-primary" type="button">Save</button>
                </div>
            </div>
        </div>`].join('');

        modal.innerHTML = html;
        document.body.appendChild(modal);

        $(`#${this.id}`).on('hidden.bs.modal',function(e){
            e.preventDefault();
            $(this).empty().remove();
            let body = document.body;
            body.removeAttribute('style');
            body.removeAttribute('class');
        });

        $(`#${this.id+'_btn_save'}`).on('click',(e) => {
            e.preventDefault();
            let p = this.getDataForm();
            console.log(p);
        });
    }

    getDataForm = () => {
        let p = {};
        $(`#${this.id}`).find('.data-input').each(function(){
            let el = $(this);
            let f = el.data('field');
            p[f] = el.val();
        });
        return p;
    }

    show = () => {
        this.renderModal();
        $(`#${this.id}`).modal('show');
    }
}