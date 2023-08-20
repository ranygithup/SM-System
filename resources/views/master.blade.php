<?php
    if(!(Session::has('user'))){
        return redirect()->route('login');
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <title>System For Testing</title>
        <?php
            StyleManager::render();
            ScriptManager::render();
        ?>
    </head>
    <body>
        <div class="main-layout">
            @include('menu')
            <div id="container_toggle" class="container-layout">
                @include('navbar')
                @include('components')
            </div>
        </div>
    </body>
</html>