<?php
    namespace App\ScriptManagement;

    use Illuminate\Support\Facades\File;

    class ScriptProvider{
        static function render(){
            $url = '';
            $scripts_load = array(
                'https://code.jquery.com/jquery-3.7.0.min.js',
                'https://code.jquery.com/ui/1.13.2/jquery-ui.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
                'https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js',
                'https://cdn.jsdelivr.net/npm/chart.js',
                'https://cdn.jsdelivr.net/npm/sweetalert2@11'
            );

            $scripts_load_local = File::allFiles('assets/load_defer');
            $scripts_load = array_merge($scripts_load,$scripts_load_local);
            $components_load = File::allFiles('assets/components');
            $scripts = File::allFiles('assets/javascript');
            
            foreach(array($scripts_load, $components_load) as $script){
                foreach($script as $cdn){
                    $url .= '<script defer language="javascript" type="text/javascript" src="'.$cdn.'"></script>';
                }
            }

            foreach($scripts as $cdn){
                $url .= '<script language="javascript" type="text/javascript" src="'.$cdn.'"></script>';
            }
            echo $url;
        }
    }
?>