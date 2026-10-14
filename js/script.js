/* EcoCare - script.js
   Dipakai oleh semua halaman. Setiap bagian dicek dulu (if) supaya tidak error
   di halaman yang tidak memiliki elemen tersebut. */

/* 1. Menu hamburger (tampil di layar kecil) */
(function () {
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (!burger || !menu) return;

  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    burger.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-' + (open ? "close" : "menu") + '"/></svg>';
  }

  burger.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
})();

/* 2. Tombol "Pelajari Selengkapnya" pada kartu edukasi */
(function () {
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("button[aria-controls]");
    if (!btn || btn.id === "burger") return;
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    var isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
    btn.textContent = isOpen ? "Pelajari Selengkapnya" : "Tutup Penjelasan";
  });
})();

/* 3. Komitmen Hijau (halaman Home) */
(function () {
  var list = document.getElementById("checks");
  if (!list) return;
  var bar = document.getElementById("bar");
  var status = document.getElementById("pledge-status");
  var total = list.querySelectorAll("input").length;

  function update() {
    var n = list.querySelectorAll("input:checked").length;
    bar.style.width = (n / total * 100) + "%";
    if (n === 0) status.textContent = "Belum ada aksi yang dipilih.";
    else if (n === total) status.textContent = "Hebat! Kamu siap melakukan semua " + total + " aksi minggu ini.";
    else status.textContent = "Kamu memilih " + n + " dari " + total + " aksi.";
  }

  list.addEventListener("change", update);
  document.getElementById("reset").addEventListener("click", function () {
    list.querySelectorAll("input").forEach(function (c) { c.checked = false; });
    update();
  });
  update();
})();
