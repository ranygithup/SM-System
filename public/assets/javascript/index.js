let head = document.head;

let cdn_style = [
    'assets/css/bootstrap.css'
];

let cdn_script = [
    'assets/javascript/bootstrap.js',
    'assets/javascript/jquery.js',
    'assets/javascript/jquery-modal.js',
    'assets/javascript/Modal.js',
    'assets/components/modal.js'
];

cdn_style.map(link => {
    let styleTag = document.createElement('link');
    styleTag.setAttribute('rel','stylesheet');
    styleTag.setAttribute('type','text/css');
    styleTag.setAttribute('href',document.baseURI+link);
    head.appendChild(styleTag);
});

cdn_script.map(link => {
    let scriptTag = document.createElement('script');
    scriptTag.setAttribute('defer','');
    scriptTag.setAttribute('type','text/javascript');
    scriptTag.setAttribute('src',document.baseURI+link);
    head.appendChild(scriptTag);
});

document.scripts[0].remove();