<?php
    namespace App\ScriptManagement;

    class ScriptProvider{
        static function render(){
            $url = '';
            $scripts = array(
                'https://code.jquery.com/jquery-3.7.0.min.js',
                'https://releases.jquery.com/git/ui/jquery-ui-git.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
                'https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js',
                'assets/components/menu-list.js',
                'assets/javascript/layout.js',
                'assets/javascript/Modal.js',
                'assets/components/render-test.js'
            );

            foreach($scripts as $cdn){
                $url .= '<script type="text/javascript" src="'.$cdn.'"></script>';
            }
            echo $url;
        }
    }
?>