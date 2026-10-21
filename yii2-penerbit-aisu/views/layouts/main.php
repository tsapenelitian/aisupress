<?php

/** @var yii\web\View $this */
/** @var string $content */

use yii\helpers\Html;
use yii\helpers\Url;

$siteName = Yii::$app->params['namaPenerbit'];
$logoUrl = Yii::$app->params['logoUrl'];
$alamat = Yii::$app->params['alamat'];
$email = Yii::$app->params['email'];
$telepon = Yii::$app->params['telepon'];
$canonical = Url::current([], true);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Primary Title & Dynamic CSRF -->
    <title><?= Html::encode($this->title ? $this->title . ' - ' . $siteName : $siteName . ' | Menerbitkan Buku Berkualitas') ?></title>
    <?= Html::csrfMetaTags() ?>
    
    <!-- Google Specific Meta Tags -->
    <meta name="google-site-verification" content="<?= Html::encode(Yii::$app->params['googleSiteVerification']) ?>">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="author" content="<?= Html::encode($siteName) ?>">
    
    <!-- Regional Geographic Meta (Sumatera Utara, Indonesia) -->
    <meta name="geo.region" content="<?= Html::encode(Yii::$app->params['geoRegion']) ?>">
    <meta name="geo.placename" content="<?= Html::encode(Yii::$app->params['geoPlacename']) ?>">
    <meta name="geo.position" content="<?= Html::encode(Yii::$app->params['geoPosition']) ?>">
    <meta name="ICBM" content="3.5852, 98.6756">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="<?= Html::encode($canonical) ?>">
    <link rel="icon" type="image/png" href="<?= Html::encode($logoUrl) ?>">

    <!-- Open Graph Social Protocol -->
    <meta property="og:site_name" content="<?= Html::encode($siteName) ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= Html::encode($canonical) ?>">
    <meta property="og:title" content="<?= Html::encode($this->title ? $this->title : $siteName) ?>">
    <meta property="og:image" content="<?= Html::encode($logoUrl) ?>">
    <meta property="og:locale" content="id_ID">

    <!-- Twitter Summary Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?= Html::encode($this->title ? $this->title : $siteName) ?>">
    <meta name="twitter:image" content="<?= Html::encode($logoUrl) ?>">

    <!-- Schema.org Publisher Organization Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BookPublisher",
      "name": "<?= Html::encode($siteName) ?>",
      "alternateName": "Penerbit AISU",
      "url": "<?= Html::encode(Yii::$app->params['siteUrl']) ?>",
      "logo": "<?= Html::encode($logoUrl) ?>",
      "description": "<?= Html::encode(Yii::$app->params['fokusPenerbit']) ?>",
      "email": "<?= Html::encode($email) ?>",
      "telephone": "<?= Html::encode($telepon) ?>",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Klambir V, Tanjung Gusta, Kec. Sunggal",
        "addressLocality": "Deli Serdang",
        "addressRegion": "Sumatera Utara",
        "addressCountry": "ID"
      }
    }
    </script>

    <!-- Ultra-lightweight, Zero-Animation Stylesheet (<5KB) -->
    <link rel="stylesheet" href="<?= Url::to('@web/css/site.css') ?>">
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="site-wrapper">
    <!-- SEMANTIC HEADER -->
    <header class="site-header">
        <div class="container header-container">
            <div class="brand-zone">
                <a href="<?= Url::to(['/site/index']) ?>" class="brand-link">
                    <img src="<?= Html::encode($logoUrl) ?>" alt="Logo <?= Html::encode($siteName) ?>" width="44" height="44" class="brand-logo">
                    <div class="brand-text">
                        <span class="brand-title"><?= Html::encode($siteName) ?></span>
                        <span class="brand-subtitle"><?= Html::encode(Yii::$app->params['fokusPenerbit']) ?></span>
                    </div>
                </a>
            </div>

            <!-- SEMANTIC NAVIGATION -->
            <nav class="site-nav" aria-label="Navigasi Utama">
                <a href="<?= Url::to(['/site/index']) ?>" class="nav-item <?= Yii::$app->controller->id === 'site' && Yii::$app->controller->action->id === 'index' ? 'active' : '' ?>">Beranda</a>
                <a href="<?= Url::to(['/site/katalog']) ?>" class="nav-item <?= Yii::$app->controller->id === 'site' && Yii::$app->controller->action->id === 'katalog' ? 'active' : '' ?>">Katalog Buku</a>
                <a href="<?= Url::to(['/site/pengiriman']) ?>" class="nav-item <?= Yii::$app->controller->id === 'site' && Yii::$app->controller->action->id === 'pengiriman' ? 'active' : '' ?>">Pengiriman</a>
                <a href="<?= Url::to(['/site/tentang']) ?>" class="nav-item <?= Yii::$app->controller->id === 'site' && Yii::$app->controller->action->id === 'tentang' ? 'active' : '' ?>">Tentang</a>

                <?php if (Yii::$app->user->isGuest): ?>
                    <a href="<?= Url::to(['/site/login']) ?>" class="nav-item nav-admin">Login Admin</a>
                <?php else: ?>
                    <a href="<?= Url::to(['/buku/index']) ?>" class="nav-item nav-admin-active">Kelola Buku</a>
                    <a href="<?= Url::to(['/kategori/index']) ?>" class="nav-item">Kategori</a>
                    <a href="<?= Url::to(['/statistik/index']) ?>" class="nav-item">Statistik</a>
                    <a href="<?= Url::to(['/site/logout']) ?>" class="nav-item nav-logout" data-method="post">Keluar (<?= Html::encode(Yii::$app->user->identity->username) ?>)</a>
                <?php endif; ?>
            </nav>
        </div>
    </header>

    <!-- FLASH MESSAGES -->
    <div class="container flash-container">
        <?php foreach (Yii::$app->session->getAllFlashes() as $key => $message): ?>
            <div class="flash-alert flash-<?= Html::encode($key) ?>" role="alert">
                <?= Html::encode($message) ?>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- MAIN CONTENT AREA -->
    <main class="site-main container">
        <?= $content ?>
    </main>

    <!-- SEMANTIC FOOTER -->
    <footer class="site-footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <h3 class="footer-title"><?= Html::encode($siteName) ?></h3>
                <p class="footer-desc"><?= Html::encode(Yii::$app->params['fokusPenerbit']) ?>. Anggota IKAPI dan terdaftar di Perpustakaan Nasional Republik Indonesia.</p>
                <p class="footer-geo">Wilayah Penerbitan: Deli Serdang, Sumatera Utara, Indonesia.</p>
            </div>
            <div class="footer-col">
                <h4 class="footer-subtitle">Alamat Kantor Penerbit</h4>
                <address class="footer-address">
                    <?= Html::encode($alamat) ?>
                </address>
                <div class="footer-contact">
                    <p><strong>Email:</strong> <a href="mailto:<?= Html::encode($email) ?>"><?= Html::encode($email) ?></a></p>
                    <p><strong>Telepon / WA:</strong> <a href="https://wa.me/<?= Html::encode(Yii::$app->params['whatsapp']) ?>" target="_blank" rel="noopener"><?= Html::encode($telepon) ?></a></p>
                </div>
            </div>
            <div class="footer-col">
                <h4 class="footer-subtitle">Navigasi Cepat</h4>
                <ul class="footer-links">
                    <li><a href="<?= Url::to(['/site/katalog']) ?>">Katalog Seluruh Buku</a></li>
                    <li><a href="<?= Url::to(['/site/pengiriman']) ?>">Ketentuan & Biaya Kirim</a></li>
                    <li><a href="<?= Url::to(['/site/tentang']) ?>">Profil & Redaksi</a></li>
                    <li><a href="<?= Url::to(['/site/sitemap']) ?>" target="_blank">Sitemap.xml (SEO)</a></li>
                    <li><a href="<?= Url::to(['/site/robots']) ?>" target="_blank">Robots.txt</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom container">
            <p>&copy; <?= date('Y') ?> <?= Html::encode($siteName) ?>. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
    </footer>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
