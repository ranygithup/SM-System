<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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