const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      const product = data.find(p => p.id == id);

      document.getElementById("productDetail").innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.img}" style="width:300px;">
        <p>${product.desc}</p>
      `;
    });
}

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
});