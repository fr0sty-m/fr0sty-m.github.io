document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products');
  if (!container) return;

  const productUrl = 'data/products.json';

  const goDetail = (id) => {
    window.location.href = `product-detail.html?id=${id}`;
  };

  const buildCard = (p) => {
    const imageSrc = p.img || p.image || 'images/image.png';
    return `
    <article class="product-card reveal">
      <img src="${imageSrc}" alt="${p.name}">
      <div class="product-card-content">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <button type="button" class="btn secondary" onclick="window.location.href='product-detail.html?id=${p.id}'">Detay</button>
      </div>
    </article>
  `;
  };

  fetch(productUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Sunucudan ürünler alınamadı (${res.status})`);
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || !data.length) {
        container.innerHTML = '<p class="empty-state">Ürün bulunamadı.</p>';
        return;
      }
      container.innerHTML = data.map(buildCard).join('');
      window.dispatchEvent(new Event('reveal:update'));
    })
    .catch((err) => {
      console.error('Products fetch error:', err);
      container.innerHTML = '<p class="error-state">Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı bir yerel sunucuda (örn. python -m http.server) açıp tekrar deneyiniz.</p>';
    });

  window.goDetail = goDetail;
});