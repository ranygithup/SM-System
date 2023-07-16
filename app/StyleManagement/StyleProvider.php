<?php
    namespace App\StyleManagement;

    class StyleProvider{
        static function render(){
            $url = '';
            $styles = array(
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
                'assets/css/layout.css',
                'assets/css/sm-style.css'
            );

            foreach($styles as $cdn){
                $url .= '<link rel="stylesheet" type="text/css" href="'.$cdn.'"/>';
            }
            echo $url;
        }
    }
?>