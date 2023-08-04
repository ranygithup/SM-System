<?php
    namespace App\ScriptManagement;

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
                'https://cdn.jsdelivr.net/npm/sweetalert2@11',
                'assets/javascript/api.js',
                'assets/javascript/confirm.js',
                'assets/javascript/initializeSelect2.js'
            );

            $components_load = array(
                'assets/components/DashboardComponent.js',
                'assets/components/DepartmentComponent.js',
                'assets/components/MainProgramComponent.js',
                'assets/components/LevelComponent.js',
                'assets/components/BookComponent.js'
            );

            $scripts = array(
                'assets/components/menuList.js',
                'assets/javascript/layout.js',
                'assets/javascript/modal.js',
                'assets/components/renderMenu.js',
                'assets/javascript/fileChooser.js'
            );

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