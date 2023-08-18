<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>School Management System</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('assets/login/login_style.css') }}"/>
    </head>
    <body>
        <div class="container-login">
            <p class="fs-header">Welcome to School Management System</p>
            <form action="{{ route('processLogin') }}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" name="name"/>
                </div>
                <div class="form-group">
                    <label for="username" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" autocomplete="true"/>
                </div>
                <div class="form-group-btn">
                    <button type="submit" class="btn-submit">Login</button>
                </div>
            </form>
        </div>
    </body>
</html>