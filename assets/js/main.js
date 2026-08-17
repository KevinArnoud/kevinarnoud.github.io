/* ============================================================
   MAIN.JS — Portfolio Kevin Arnoud
   1. Boot sequence (pré-roll 1,5 s, skippable, jouée 1x/session)
   2. Fond canvas "constellation" (dégradation mobile + reduced motion)
   3. Command palette (Ctrl+K) — navigation réelle, générée
      depuis PROJECTS (source de vérité unique)
   4. Rendu des cartes projets
   5. Révélations au scroll (IntersectionObserver)
   Zéro dépendance externe. Vanilla JS.
   ============================================================ */

"use strict";

/* ---------- Utilitaires ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   1. BOOT SEQUENCE
   ------------------------------------------------------------
   ~2,5 s au total. Poka-Yoke :
   - clic / touche = skip immédiat
   - déjà vue dans la session = pas rejouée (sessionStorage)
   - reduced-motion = pas jouée du tout
   ============================================================ */
(function bootSequence() {
  const boot = $("#boot");
  if (!boot) return; // page sans boot (fiche projet)

  const dejaVu = sessionStorage.getItem("bootSeen") === "1";
  if (dejaVu || reduitMotion) {
    boot.remove();
    revelerHero(true);
    return;
  }

  const lignes = [
    { txt: "> init kevin-arnoud.sh", delai: 0 },
    { txt: "> profil ........ ingénierie système · IT ", ok: "OK", delai: 620 },
    { txt: "> modules ....... PowerShell · Power Platform · IA ", ok: "OK", delai: 1240 },
    { txt: "> ouvrir portfolio kevin.arnoud", delai: 1850, tape: true }
  ];

  const inner = $("#boot-inner");
  let termine = false;

  lignes.forEach((l) => {
    setTimeout(() => {
      if (termine) return;
      const div = document.createElement("div");
      div.className = "line";
      if (l.tape) {
        /* dernière ligne : effet de frappe (~550 ms) */
        div.classList.add("cursor");
        inner.appendChild(div);
        let i = 0;
        const t = setInterval(() => {
          if (termine) { clearInterval(t); return; }
          div.textContent = l.txt.slice(0, ++i);
          if (i >= l.txt.length) clearInterval(t);
        }, 550 / l.txt.length);
      } else {
        div.innerHTML = l.txt + (l.ok ? '<span class="ok">' + l.ok + "</span>" : "");
        inner.appendChild(div);
      }
    }, l.delai);
  });

  function finirBoot() {
    if (termine) return;
    termine = true;
    sessionStorage.setItem("bootSeen", "1");
    boot.classList.add("done");
    setTimeout(() => boot.remove(), 500);
    revelerHero(false);
  }

  /* Fin nominale à 2,55 s — skip possible avant */
  setTimeout(finirBoot, 2550);
  boot.addEventListener("click", finirBoot);
  window.addEventListener("keydown", finirBoot, { once: true });
})();

/* Révèle le hero (avec ou sans glitch selon contexte) */
function revelerHero(instant) {
  const h1 = $(".hero h1");
  if (h1 && !instant && !reduitMotion) h1.classList.add("glitch-in");
  document.body.classList.add("pret");
}

/* ============================================================
   2. FOND CANVAS — constellation discrète
   ------------------------------------------------------------
   - Desktop : ~46 nœuds, légère répulsion souris
   - Mobile  : 18 nœuds, pas d'interaction souris
   - Reduced motion : un seul rendu statique
   ============================================================ */
(function constellation() {
  const cv = $("#bg-net");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const mobile = window.innerWidth < 700;
  const N = mobile ? 18 : 46;
  const DIST = mobile ? 110 : 150;
  let W, H, pts = [], souris = { x: -9999, y: -9999 };

  function taille() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
  }
  taille();
  window.addEventListener("resize", () => { taille(); if (reduitMotion) dessiner(); });

  for (let i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28
    });
  }

  if (!mobile) {
    window.addEventListener("mousemove", (e) => { souris.x = e.clientX; souris.y = e.clientY; });
  }

  function dessiner() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      if (!reduitMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        /* répulsion souris douce (desktop) */
        const dx = p.x - souris.x, dy = p.y - souris.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000) { p.x += dx * .012; p.y += dy * .012; }
      }
      ctx.fillStyle = "rgba(72,202,228,.7)";
      ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < DIST) {
          ctx.strokeStyle = "rgba(72,202,228," + (0.14 * (1 - d / DIST)) + ")";
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    if (!reduitMotion) requestAnimationFrame(dessiner);
  }
  dessiner();
})();

/* ============================================================
   3. COMMAND PALETTE — signature du site
   ------------------------------------------------------------
   Ouverture : Ctrl+K / Cmd+K, ou clic sur le bouton .kbd-hint
   Navigation : flèches + Entrée, ou clic. Échap ferme.
   Contenu généré depuis PROJECTS + NAV_ITEMS.
   ============================================================ */
(function commandPalette() {
  const overlay = $("#palette-overlay");
  if (!overlay || typeof PROJECTS === "undefined") return;
  const input = $("#palette-input");
  const liste = $("#palette-list");
  let items = [], idx = 0;

  /* Détection du dossier courant pour que les liens marchent
     depuis index.html ET projet.html (racine identique). */
  function catalogue() {
    const cat = PROJECTS.map((p) => ({
      label: p.numero + " · " + p.titre,
      hint: p.stack.slice(0, 3).join(" · "),
      href: "projet.html?id=" + p.id
    }));
    (typeof NAV_ITEMS !== "undefined" ? NAV_ITEMS : []).forEach((n) =>
      cat.push({ label: n.label, hint: n.hint, href: n.href })
    );
    return cat;
  }

  function rendre(filtre) {
    const f = (filtre || "").trim().toLowerCase();
    items = catalogue().filter((it) =>
      !f || (it.label + " " + it.hint).toLowerCase().includes(f)
    );
    idx = 0;
    liste.innerHTML = "";
    if (!items.length) {
      liste.innerHTML = '<div class="palette-vide">> aucun résultat — essayez « changes », « bi », « powershell »…</div>';
      return;
    }
    items.forEach((it, i) => {
      const div = document.createElement("div");
      div.className = "palette-item" + (i === 0 ? " actif" : "");
      div.setAttribute("role", "option");
      div.innerHTML = "<span>" + it.label + '</span><span class="hint">' + it.hint + "</span>";
      div.addEventListener("click", () => aller(it));
      div.addEventListener("mousemove", () => { idx = i; surligner(); });
      liste.appendChild(div);
    });
  }

  function surligner() {
    $$(".palette-item", liste).forEach((el, i) => el.classList.toggle("actif", i === idx));
    const actif = $$(".palette-item", liste)[idx];
    if (actif) actif.scrollIntoView({ block: "nearest" });
  }

  function aller(it) {
    fermer();
    if (it.href.startsWith("#")) {
      const cible = $(it.href);
      if (cible) cible.scrollIntoView({ behavior: reduitMotion ? "auto" : "smooth" });
    } else {
      window.location.href = it.href;
    }
  }

  function ouvrir() {
    overlay.classList.add("open");
    input.value = "";
    rendre("");
    setTimeout(() => input.focus(), 30);
  }
  function fermer() { overlay.classList.remove("open"); }

  /* Déclencheurs */
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay.classList.contains("open") ? fermer() : ouvrir();
    } else if (overlay.classList.contains("open")) {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowDown") { e.preventDefault(); idx = Math.min(idx + 1, items.length - 1); surligner(); }
      if (e.key === "ArrowUp") { e.preventDefault(); idx = Math.max(idx - 1, 0); surligner(); }
      if (e.key === "Enter" && items[idx]) aller(items[idx]);
    }
  });
  $$(".kbd-hint").forEach((b) => b.addEventListener("click", ouvrir));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) fermer(); });
  input.addEventListener("input", () => rendre(input.value));
})();

/* ============================================================
   4. CARTES PROJETS (index) — générées depuis PROJECTS
   ============================================================ */
(function cartesProjets() {
  const grille = $("#grid-projets");
  if (!grille || typeof PROJECTS === "undefined") return;
  PROJECTS.forEach((p) => {
    const a = document.createElement("a");
    a.className = "card reveal statut-" + p.statut;
    a.href = "projet.html?id=" + p.id;
    a.innerHTML =
      '<span class="card-num">// projet ' + p.numero + "</span>" +
      "<h3>" + p.titre + "</h3>" +
      "<p>" + p.pitch + "</p>" +
      '<div class="card-stack">' +
        p.stack.map((s) => '<span class="chip">' + s + "</span>").join("") +
      "</div>" +
      '<div class="card-foot">' +
        '<span class="badge-statut"><span class="dot"></span>' +
          (p.statut === "confidentiel" ? "confidentiel" : "démo publique") +
        "</span>" +
        '<span class="card-cta">ouvrir →</span>' +
      "</div>";
    grille.appendChild(a);
  });
})();

/* ============================================================
   5. RÉVÉLATIONS AU SCROLL
   ============================================================ */
(function reveals() {
  const els = $$(".reveal");
  if (!els.length) return;
  if (reduitMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("vu"));
    return;
  }
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("vu"); obs.unobserve(e.target); }
    });
  }, { threshold: .12 });
  els.forEach((el) => obs.observe(el));
})();
