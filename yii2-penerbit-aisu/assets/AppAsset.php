<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle with zero animation and minimal footprints.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];
}
