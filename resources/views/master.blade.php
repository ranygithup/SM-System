<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>System For Testing</title>
        <script defer type="text/javascript" src="{{ asset('assets/javascript/index.js') }}"></script>
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