window.addEventListener('DOMContentLoaded',() => {
    let head = document.head;
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;

    let cdn_style = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        'assets/css/layout.css'
    ];

    let cdn_script = [
        'https://code.jquery.com/jquery-3.7.0.min.js',
        'https://releases.jquery.com/git/ui/jquery-ui-git.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
        'assets/javascript/layout.js',
        'assets/components/menu-list.js'
    ];

    cdn_style.map(link => {
        let styleTag = document.createElement('link');
        styleTag.setAttribute('rel','stylesheet');
        styleTag.setAttribute('type','text/css');
        if(regex.test(link))
            styleTag.setAttribute('href',link);
        else
            styleTag.setAttribute('href',document.baseURI+link);
        head.appendChild(styleTag);
    });

    cdn_script.map(link => {
        let scriptTag = document.createElement('script');
        scriptTag.setAttribute('language','javascript');
        scriptTag.setAttribute('type','text/javascript');
        if(regex.test(link))
            scriptTag.setAttribute('src',link);
        else
            scriptTag.setAttribute('src',document.baseURI+link);
        head.appendChild(scriptTag);
    });

    document.scripts[0].remove();
});