<div class="component-container">
    <?php
        use Illuminate\Support\Facades\File;
        $file = File::allFiles(resource_path('views/layouts'));
        foreach ($file as  $value){
            include($value);
        }
    ?>
</div>