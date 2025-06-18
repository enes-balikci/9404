document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('car-app');
  fetch('data/cars.json')
    .then(res => res.json())
    .then(data => buildCarUI(data, app));
});

function buildCarUI(cars, app) {
  // Marka seçimi
  const brandSelect = document.createElement('select');
  brandSelect.innerHTML = `<option value="">Marka Seçiniz</option>`;
  cars.forEach((brand, i) =>
    brandSelect.innerHTML += `<option value="${i}">${brand.brand}</option>`
  );
  app.appendChild(brandSelect);

  // Model seçimi
  const modelSelect = document.createElement('select');
  modelSelect.innerHTML = `<option value="">Model Seçiniz</option>`;
  modelSelect.style.display = 'none';
  app.appendChild(modelSelect);

  // Detay alanı
  const detailsDiv = document.createElement('div');
  detailsDiv.style.marginTop = '20px';
  app.appendChild(detailsDiv);

  // Marka seçilince modelleri getir
  brandSelect.addEventListener('change', e => {
    detailsDiv.innerHTML = '';
    const idx = e.target.value;
    if (idx === "") {
      modelSelect.style.display = 'none';
      return;
    }
    modelSelect.innerHTML = `<option value="">Model Seçiniz</option>`;
    cars[idx].models.forEach((model, j) =>
      modelSelect.innerHTML += `<option value="${j}">${model.name}</option>`
    );
    modelSelect.style.display = 'inline-block';
  });

  // Model seçilince detayları göster
  modelSelect.addEventListener('change', e => {
    detailsDiv.innerHTML = '';
    const brandIdx = brandSelect.value;
    const modelIdx = e.target.value;
    if (brandIdx === "" || modelIdx === "") return;
    const model = cars[brandIdx].models[modelIdx];
    detailsDiv.appendChild(renderCarDetails(model));
  });
}

function renderCarDetails(model) {
  const d = document.createElement('div');
  d.innerHTML = `
    <h3>${model.name} (${model.year})</h3>
    <ul>
      <li><b>Motor:</b> ${model.engine}</li>
      <li><b>Güç:</b> ${model.power}</li>
      <li><b>Tork:</b> ${model.torque}</li>
      <li><b>Yakıt:</b> ${model.fuel}</li>
      <li><b>Şanzıman:</b> ${model.transmission}</li>
      <li><b>Boyutlar:</b> ${model.dimensions.length} x ${model.dimensions.width} x ${model.dimensions.height}</li>
      <li><b>Özellikler:</b> ${model.features.join(", ")}</li>
    </ul>
  `;
  return d;
}
