/* ============================================================
   DC.JS — Dossier de compétences
   ------------------------------------------------------------
   Rend dc.html intégralement depuis cv.json (source de vérité
   unique du DC, pendant de data/projects.js pour les fiches).
   Aucun contenu en dur : le HTML ne porte que la structure.

   Ordre de rendu :
     1. Hero      — identité, badges, contacts, bouton impression
     2. Profil    — pitch + 2 piliers + recherche
     3. Expériences (format PROMPT / RESPONSE, cohérent DA-3)
     4. Compétences techniques
     5. Soft skills
     6. Formations + Langues (double colonne)

   Poka-Yoke : cv.json inaccessible → encart d'erreur + mailto,
   jamais de page blanche. Slug linkedProjects inconnu de
   PROJECTS → warning console, lien non rendu.
   ============================================================ */

"use strict";

(function dossierCompetences() {
  const racine = document.querySelector("#dc");
  if (!racine) return;

  /* Adresse de repli de l'encart d'erreur : la seule constante
     tolérée ici, puisqu'elle sert quand cv.json est justement
     illisible. */
  const MAIL_SECOURS = "kev.arnoud@outlook.fr";

  fetch("cv.json", { cache: "no-cache" })
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(rendre)
    .catch(afficherErreur);

  /* ============================================================
     RENDU PRINCIPAL
     ============================================================ */
  function rendre(cv) {
    document.title = "Dossier de compétences — " + cv.identity.nom;

    racine.innerHTML =
      blocHero(cv) +
      blocProfil(cv.profile) +
      blocExperiences(cv.experiences, cv.meta && cv.meta.anonyme === true) +
      blocSkills(cv.skills) +
      blocSoftSkills(cv.softSkills) +
      blocFormationLangues(cv.education, cv.languages);

    rendrePiedDePage(cv.meta);
    activerImpression();
  }

  /* ---------- 1. Hero : identité, badges, contacts ---------- */
  function blocHero(cv) {
    const id = cv.identity;
    const c = id.contacts;

    /* imprimerUrl : uniquement là où le libellé ne porte pas déjà
       l'information. L'e-mail et le téléphone sont lisibles tels
       quels sur papier, inutile de répéter mailto:/tel:. */
    const contacts = [
      { lib: c.email, href: "mailto:" + c.email },
      { lib: c.telephone, href: "tel:" + String(c.telephone).replace(/\s/g, "") },
      { lib: "LinkedIn", href: c.linkedin, imprimerUrl: true },
      { lib: "Portfolio", href: c.portfolio, imprimerUrl: true }
    ]
      .filter((x) => x.lib)
      .map((x) =>
        '<a class="dc-contact" href="' + esc(x.href) + '"' +
        (x.imprimerUrl ? ' data-print-url="' + esc(x.href) + '"' : "") +
        ">" + esc(x.lib) + "</a>"
      )
      .join("");

    return '<header class="dc-hero">' +
      '<a class="breadcrumb no-print" href="index.html">← ~/portfolio</a>' +
      '<p class="hero-eyebrow mono">$ cat ~/portfolio/dc/' + esc(slugifier(id.nom)) + ".json</p>" +
      "<h1>" + esc(id.nom) + "</h1>" +
      '<div class="card-stack dc-badges">' +
        (id.badges || []).map((b) => '<span class="chip">' + esc(b) + "</span>").join("") +
      "</div>" +
      '<div class="dc-contacts">' + contacts + "</div>" +
      '<div class="dc-actions no-print">' +
        '<button id="dc-print" class="btn btn-primary" type="button">⎙ Imprimer / PDF</button>' +
        '<a class="btn btn-ghost" href="index.html#projets">Voir les projets →</a>' +
      "</div>" +
    "</header>";
  }

  /* ---------- 2. Profil : pitch, piliers, recherche ---------- */
  function blocProfil(p) {
    if (!p) return "";
    return section("Profil", "profil",
      '<p class="dc-pitch">' + esc(p.pitch) + "</p>" +
      '<div class="dc-piliers">' +
        (p.piliers || []).map((pil) =>
          '<article class="dc-pilier">' +
            "<h3>" + esc(pil.titre) + "</h3>" +
            "<p>" + esc(pil.description) + "</p>" +
          "</article>"
        ).join("") +
      "</div>" +
      (p.recherche
        ? '<aside class="dc-recherche">' +
            /* Le texte est encapsulé : l'encart tient la pleine largeur
               de la grille, mais sa ligne reste bornée à une mesure
               lisible (cf. .dc-recherche-texte). */
            '<p class="dc-recherche-texte">' +
              "<strong>Recherche</strong> — " + esc(p.recherche) +
            "</p>" +
          "</aside>"
        : "")
    );
  }

  /* ---------- 3. Expériences — format PROMPT / RESPONSE ----------
     meta.anonyme pilote l'affichage de l'employeur : à true, on rend
     societeAnonyme (« ESN internationale ») au lieu du nom réel, pour
     les diffusions où le client ne doit pas apparaître. */
  function blocExperiences(exp, anonyme) {
    if (!exp || !exp.length) return "";
    return section("Expériences", "experiences",
      exp.map((e) =>
        '<article class="dc-exp">' +
          '<div class="dc-exp-head">' +
            "<h3>" + esc(e.role) + " <span class=\"dc-exp-societe\">· " +
              esc(nomEmployeur(e, anonyme)) + "</span></h3>" +
            '<span class="dc-exp-periode mono">' + esc(e.periode) + "</span>" +
          "</div>" +

          '<div class="dc-io">' +
            '<span class="dc-io-label mono">PROMPT</span>' +
            '<p class="dc-io-texte">' + esc(e.prompt) + "</p>" +
          "</div>" +

          '<div class="dc-io">' +
            '<span class="dc-io-label mono dc-io-response">RESPONSE</span>' +
            "<ul class=\"dc-io-liste\">" +
              (e.response || []).map((r) => "<li>" + esc(r) + "</li>").join("") +
            "</ul>" +
          "</div>" +

          ((e.environnement || []).length
            ? '<div class="card-stack dc-env">' +
                e.environnement.map((t) => '<span class="chip">' + esc(t) + "</span>").join("") +
              "</div>"
            : "") +

          liensProjets(e.linkedProjects, e.role) +
        "</article>"
      ).join("")
    );
  }

  /* Intégrité référentielle avec data/projects.js : un slug absent
     est signalé en console et n'est pas rendu (pas de lien mort). */
  function liensProjets(slugs, contexte) {
    if (!slugs || !slugs.length) return "";
    if (typeof PROJECTS === "undefined") {
      console.warn("[dc] PROJECTS indisponible : liens projets non rendus.");
      return "";
    }

    const liens = slugs
      .map((slug) => {
        const projet = PROJECTS.find((p) => p.id === slug);
        if (!projet) {
          console.warn(
            '[dc] Intégrité référentielle : le slug "' + slug + '" (expérience « ' +
            contexte + ' ») est absent de data/projects.js — lien non rendu.'
          );
          return null;
        }
        const href = "projet.html?id=" + projet.id;
        return '<a class="dc-lien-projet" href="' + esc(href) + '" data-print-url="' +
          esc(urlAbsolue(href)) + '">→ ' + esc(projet.titre) + "</a>";
      })
      .filter(Boolean);

    if (!liens.length) return "";
    return '<div class="dc-liens">' +
      '<span class="dc-liens-label mono">fiches projet</span>' + liens.join("") +
    "</div>";
  }

  /* ---------- 4. Compétences techniques ---------- */
  function blocSkills(skills) {
    if (!skills || !skills.length) return "";
    return section("Compétences techniques", "skills",
      '<div class="dc-grille-skills">' +
        skills.map((s) =>
          '<article class="dc-skill">' +
            "<h3>" + esc(s.categorie) + "</h3>" +
            '<div class="card-stack">' +
              (s.items || []).map((i) => '<span class="chip">' + esc(i) + "</span>").join("") +
            "</div>" +
          "</article>"
        ).join("") +
      "</div>"
    );
  }

  /* ---------- 5. Soft skills ---------- */
  function blocSoftSkills(soft) {
    if (!soft || !soft.length) return "";
    return section("Soft skills", "soft-skills",
      '<div class="dc-grille-soft">' +
        soft.map((s) =>
          '<article class="dc-soft">' +
            "<h3>" + esc(s.titre) + "</h3>" +
            "<p>" + esc(s.description) + "</p>" +
          "</article>"
        ).join("") +
      "</div>"
    );
  }

  /* ---------- 6. Formations + Langues (double colonne) ---------- */
  function blocFormationLangues(edu, langues) {
    const colonneEdu =
      '<div class="dc-colonne">' +
        "<h3>Formations</h3>" +
        (edu || []).map((f) =>
          '<article class="dc-formation">' +
            '<span class="dc-formation-periode mono">' + esc(f.periode) + "</span>" +
            '<p class="dc-formation-intitule">' + esc(f.intitule) + "</p>" +
            '<p class="dc-formation-organisme">' + esc(f.organisme) +
              (f.note ? " · " + esc(f.note) : "") +
            "</p>" +
          "</article>"
        ).join("") +
      "</div>";

    const colonneLangues =
      '<div class="dc-colonne">' +
        "<h3>Langues</h3>" +
        (langues || []).map((l) =>
          '<article class="dc-langue">' +
            '<span class="dc-langue-nom">' + esc(l.langue) + "</span>" +
            '<span class="dc-langue-niveau mono">' + esc(l.niveau) + "</span>" +
          "</article>"
        ).join("") +
      "</div>";

    return section("Formations & Langues", "formations",
      '<div class="dc-double">' + colonneEdu + colonneLangues + "</div>"
    );
  }

  /* ---------- Pied de page : fraîcheur de la donnée ---------- */
  function rendrePiedDePage(meta) {
    const cible = document.querySelector("#dc-meta");
    if (!cible || !meta) return;
    cible.textContent =
      "> cv.json v" + meta.version + " — mis à jour le " + formaterDate(meta.dateMaj);
  }

  /* ---------- Bouton impression ---------- */
  function activerImpression() {
    const btn = document.querySelector("#dc-print");
    if (btn) btn.addEventListener("click", () => window.print());
  }

  /* ============================================================
     ÉTAT D'ERREUR (Poka-Yoke) — cv.json illisible
     ============================================================ */
  function afficherErreur(err) {
    console.error("[dc] cv.json inaccessible :", err);
    racine.innerHTML =
      '<div class="fiche-erreur">' +
        "<h1>&gt; erreur : dossier de compétences indisponible</h1>" +
        "<p>La source <code>cv.json</code> n'a pas pu être chargée " +
          "(" + esc(err && err.message ? err.message : "erreur inconnue") + "). " +
          "Le reste du portfolio reste accessible.</p>" +
        "<ul>" +
          '<li><a href="index.html">← Revenir à l\'accueil</a></li>' +
          '<li><a href="mailto:' + MAIL_SECOURS + '">Demander le dossier par e-mail</a></li>' +
        "</ul>" +
      "</div>";
  }

  /* ============================================================
     UTILITAIRES
     ============================================================ */
  /* Repli sur le nom réel si societeAnonyme est absent : mieux vaut
     une fiche complète qu'un employeur vide. */
  function nomEmployeur(exp, anonyme) {
    if (anonyme && exp.societeAnonyme) return exp.societeAnonyme;
    if (anonyme && !exp.societeAnonyme) {
      console.warn(
        '[dc] meta.anonyme=true mais societeAnonyme manquant pour « ' +
        exp.role + " » — nom réel conservé."
      );
    }
    return exp.societe;
  }

  function section(titre, id, contenu) {
    return '<section class="dc-section" id="dc-' + id + '">' +
      '<div class="section-head"><h2>' + esc(titre) + "</h2></div>" +
      contenu +
    "</section>";
  }

  /* URL absolue pour l'impression (les liens doivent rester
     utilisables sur papier). */
  function urlAbsolue(href) {
    try { return new URL(href, window.location.href).href; }
    catch (e) { return href; }
  }

  function slugifier(txt) {
    /* NFD puis suppression des diacritiques combinants (U+0300–U+036F). */
    return String(txt).toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-");
  }

  function formaterDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return String(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  /* Échappement systématique : cv.json ne contient que du texte
     brut, aucune balise n'y est attendue. */
  function esc(txt) {
    const div = document.createElement("div");
    div.textContent = txt === undefined || txt === null ? "" : String(txt);
    return div.innerHTML;
  }
})();
