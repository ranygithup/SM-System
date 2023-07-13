let test = new Modal({
    id: 'invoice'
});

test.renderModal();

window.addEventListener('DOMContentLoaded',() => {
    test.show();
});