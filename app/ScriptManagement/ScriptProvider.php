<?php
    namespace App\ScriptManagement;
    use Illuminate\Support\Facades\File;

    class ScriptProvider{
        static function render(){
            $url = ''; $primary = ''; $secondary = '';

            $scripts_load = array(
                'https://code.jquery.com/jquery-3.7.0.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
                'https://cdn.jsdelivr.net/npm/sweetalert2@11'
            );

            $scripts_load_local = File::allFiles('assets/load_defer');
            $components_load = File::allFiles('assets/components');
            $components_load = array_merge($components_load,$scripts_load_local);
            
            foreach($components_load as $file){
                $primary .= file_get_contents($file);
            }
            file_put_contents('assets/dist/primary.min.js', $primary);
            self::class::minify_file('assets/dist/primary.min.js');

            $scripts = File::allFiles('assets/javascript');
            foreach ($scripts as $file){
                $secondary .= file_get_contents($file);
            }
            file_put_contents('assets/dist/secondary.min.js', $secondary);
            self::minify_file('assets/dist/secondary.min.js');

            foreach($scripts_load as $file){
                $url .= '<script defer language="javascript" type="text/javascript" src="'.$file.'"></script>';
            }
            
            $url .= '<script defer language="javascript" type="text/javascript" src="assets/dist/primary.min.js"></script>
            <script language="javascript" type="text/javascript" src="assets/dist/secondary.min.js"></script>';
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