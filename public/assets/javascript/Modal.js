class Modal{
    constructor(options={
        'id': id,
        'title': title,
        'class_name': class_name,
        'html': html,
        'api_save': api_save,
        'api_modify': api_modify
    }){
        this.id = options.id,
        this.title = options.title,
        this.cls_name = options.class_name,
        this.html = options.html,
        this.api_save = options.api_save,
        this.api_modify = options.api_modify,
        this.onClose = null,
        this.data_id = 0
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

        let html = [`<div class="modal-dialog modal-dialog-scrollable ${this.cls_name ? this.cls_name : ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">${this.m_title ? this.m_title : this.title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">${this.html ? this.html : ''}</div>
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
            api.postData(this.api_save, p).then(res => {
                if(res.status === 200){
                    $(`#${this.id}`).modal('hide');
                    this.onClose && this.onClose();
                }
            });
        });
    }

    getDataForm = () => {
        let p = {
            'id': this.data_id
        };
        $(`#${this.id}`).find('.data-input').each(function(){
            let el = $(this);
            let f = el.data('field');
            p[f] = el.val();
        });
        return p;
    }

    setDataForm = (d) => {
        d = d ? d : {};

        $(`#${this.id}`).find('.data-input').each(function(){
            let el = $(this);
            let f = el.data('field');
            el.val(d[f]);
        });
    }

    loadDataDetails = (op) => {
        api.postData(this.api_modify,{'id': op.id}).then(res => {
            let data = {};
            if(res.status === 200){
                data = res.data;
            }
            this.setDataForm(data);
        });
    }

    show = (op) => {
        this.data_id = op.id;
        this.onClose = op.onClose;

        if(this.data_id > 0){
            this.m_title = ['Modify',this.title].join(' ');
            this.renderModal();
            this.loadDataDetails(op);
        }
        else{
            this.m_title = ['New',this.title].join(' ');
            this.renderModal();
            this.setDataForm(null);
        }

        $(`#${this.id}`).modal('show');
    }
}