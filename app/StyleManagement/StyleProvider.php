<?php
    namespace App\StyleManagement;

    use Illuminate\Support\Facades\File;

    class StyleProvider{
        static function render(){
            $url = '';
            $styles = array(
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
                'https://cdn.datatables.net/1.13.5/css/jquery.dataTables.css',
                'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css'
            );

            $styles_local = File::allFiles('assets/css');
            $styles = array_merge($styles,$styles_local);

            foreach($styles as $cdn){
                $url .= '<link rel="stylesheet" type="text/css" href="'.$cdn.'"/>';
            }
            echo $url;
        }
    }
?>