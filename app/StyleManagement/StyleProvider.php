<?php
    namespace App\StyleManagement;

    use Illuminate\Support\Facades\File;

    class StyleProvider{
        static function render(){
            $url = ''; $secondary = '';

            $styles = array(
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
            );

            $styles_local = File::allFiles('assets/css');
            foreach($styles_local as $file){
                $secondary .= file_get_contents($file);
            }
            file_put_contents('assets/dist/secondary.min.css', $secondary);
            self::class::minify_file('assets/dist/secondary.min.css');

            foreach($styles as $style){
                $url .= '<link rel="stylesheet" type="text/css" href="'.$style.'"/>';
            }

            $url .= '<link rel="stylesheet" type="text/css" href="assets/dist/secondary.min.css"/>';
            echo $url;
        }

        static function minify_file($file_path){
            $content = file_get_contents($file_path);
            $content = preg_replace('/\/\*.*?\*\/|\/\/.*(?=[\n\r])/', '', $content);
            $content = preg_replace('/\s+/', ' ', $content);
            $content = trim($content);
            file_put_contents($file_path, $content);
        }
    }
?>