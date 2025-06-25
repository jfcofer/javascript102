"use strict";

const itemData = {
  item1: {
    name: "Finalista 1",
    image: "https://picsum.photos/seed/animal/250/200",
    photographer: "John Doe",
    description:
      " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    score: 42,
  },
  item2: {
    name: "Finalista 2",
    image: "https://picsum.photos/seed/beach/250/200",
    photographer: "Jane Smith",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    score: 84,
  },
  item3: {
    name: "Finalista 3",
    image: "https://picsum.photos/seed/mountain/250/200",
    photographer: "Alice Johnson",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    score: 36,
  },
};

/* ──────── 2. Módulo de UI ──────── */
const ui = (() => {
  // Cache de nodos una sola vez
  const $select = document.getElementById("items");
  const $img = document.getElementById("displayImage");
  const $photographer = document.getElementById("photographer");
  const $description = document.getElementById("description");
  const $score = document.getElementById("score");
  const $btnPlus = document.getElementById("increaseScore");
  const $btnMinus = document.getElementById("decreaseScore");

  let currentKey = null; // guarda qué ítem está activo

  /* 2.1  Poblar <select> */
  const fillSelect = () => {
    Object.entries(itemData).forEach(([key, { name }]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = name;
      $select.appendChild(opt);
    });
  };

  /* 2.2  Pinta los detalles en pantalla */
  const renderDetails = (item) => {
    $img.src = item.image;
    $img.alt = item.name;
    $photographer.value = item.photographer;
    $description.value = item.description;
    $score.value = item.score;
  };

  /* 2.3  Actualiza el puntaje */
  const updateScore = (delta) => {
    if (!currentKey) return; // nada seleccionado aún
    const item = itemData[currentKey];
    item.score = Math.max(0, item.score + delta); // evita negativos
    $score.value = item.score;
  };

  /* 2.4  Listeners */
  const bindEvents = () => {
    $select.addEventListener("change", (e) => {
      currentKey = e.target.value;
      renderDetails(itemData[currentKey]);
    });

    $btnPlus.addEventListener("click", () => updateScore(+1));
    $btnMinus.addEventListener("click", () => updateScore(-1));
  };

  /* 2.5  Inicialización pública */
  const init = () => {
    fillSelect();
    bindEvents();
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", ui.init);

