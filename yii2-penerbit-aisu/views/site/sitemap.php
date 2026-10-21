<?= '<?xml version="1.0" encoding="UTF-8"?>' ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Halaman Statis Utama -->
    <url>
        <loc><?= $baseUrl ?>/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc><?= $baseUrl ?>/katalog</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc><?= $baseUrl ?>/pengiriman</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc><?= $baseUrl ?>/tentang</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Halaman Kategori -->
    <?php foreach ($kategoris as $cat): ?>
    <url>
        <loc><?= $baseUrl ?>/katalog/<?= $cat->slug ?></loc>
        <lastmod><?= date('Y-m-d', strtotime($cat->created_at)) ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <?php endforeach; ?>

    <!-- Halaman Detail Setiap Buku -->
    <?php foreach ($bukus as $b): ?>
    <url>
        <loc><?= $baseUrl ?>/buku/<?= $b->slug ?></loc>
        <lastmod><?= date('Y-m-d', strtotime($b->updated_at)) ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>
    <?php endforeach; ?>
</urlset>
