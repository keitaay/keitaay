---
# sitemap.njk
layout: null
permalink: sitemap.xml
eleventyExcludeFromCollections: true
--- 
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{% for item in collections.all %}
{% if not item.data.doIgnore %}
{% if item.data.excludeFromSitemap != true %}
<url>
<loc>{{ site.url }}{{ item.url }}</loc>{% if item.data.datePub %}<lastmod>{{ item.data.datePub | dateISO }}</lastmod>{% endif %}<changefreq>monthly</changefreq>
</url>
{% endif %}
{% endif %}
{% endfor %}
</urlset>