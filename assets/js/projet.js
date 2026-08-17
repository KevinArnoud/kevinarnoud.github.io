/* ============================================================
   PROJET.JS — Rendu d'une fiche projet
   ------------------------------------------------------------
   Lit ?id=… dans l'URL, retrouve le projet dans PROJECTS
   (source de vérité unique) et injecte la fiche.
   Poka-Yoke : id absent ou inconnu → état d'erreur explicite
   avec la liste des ids valides, jamais de page blanche.
   ============================================================ */

"use strict";

(function rendreFiche() {
  const conteneur = document.querySelector("#fiche");
  if (!conteneur || typeof PROJECTS === "undefined") return;

  const id = new URLSearchParams(window.location.search).get("id");
  const projet = PROJECTS.find((p) => p.id === id);

  /* ---- État d'erreur (Poka-Yoke) ---- */
  if (!projet) {
    document.title = "Projet introuvable — Kevin Arnoud";
    conteneur.innerHTML =
      '<div class="fiche-erreur">' +
        "<h1>&gt; erreur : projet « " + escapeHtml(id || "aucun id") + " » introuvable</h1>" +
        "<p>Le paramètre <code>?id=</code> ne correspond à aucun projet. Projets disponibles :</p>" +
        "<ul>" +
          PROJECTS.map((p) => '<li><a href="projet.html?id=' + p.id + '">' + p.titre + "</a></li>").join("") +
        "</ul>" +
        '<p style="margin-top:16px"><a href="index.html">← revenir à l\'accueil</a></p>' +
      "</div>";
    return;
  }

  /* ---- Rendu nominal ---- */
  document.title = projet.titre + " — Kevin Arnoud";
  conteneur.innerHTML =
    '<header class="fiche-head">' +
      '<a class="breadcrumb" href="index.html">← ~/portfolio/projets/' + projet.id + "</a>" +
      '<p class="hero-eyebrow mono">// projet ' + projet.numero +
        (projet.meta ? " · " + escapeHtml(projet.meta) : "") + " · " +
        '<span class="badge-statut statut-' + projet.statut + '"><span class="dot"></span> ' +
        escapeHtml(projet.statutLabel) + "</span></p>" +
      "<h1>" + escapeHtml(projet.titre) + "</h1>" +
      '<p class="pitch">' + escapeHtml(projet.pitch) + "</p>" +
      '<div class="card-stack" style="margin-top:22px">' +
        projet.stack.map((s) => '<span class="chip">' + escapeHtml(s) + "</span>").join("") +
      "</div>" +
    "</header>" +

    '<div class="kpi-row">' +
      projet.kpis.map((k) =>
        '<div class="kpi reveal vu"><div class="val">' + escapeHtml(k.valeur) +
        '</div><div class="lab">' + escapeHtml(k.label) + "</div></div>"
      ).join("") +
    "</div>" +

    rendreSections(projet);

  activerDemoEmbed(projet);

  /* -- Sections de contenu (fiche complète) ou placeholder (Phase 2 à venir) -- */
  function rendreSections(p) {
    if (!p.sections || !p.sections.length) {
      return '<div class="fiche-placeholder">' +
        "&gt; " + escapeHtml(p.resume) + "<br><br>" +
        "Cette fiche sera enrichie en Phase 2 : contexte, démarche, architecture,<br>" +
        "démonstrateur et enseignements." +
      "</div>";
    }
    /* NB : p.sections provient de data/projects.js (contenu maîtrisé du repo),
       l'injection HTML y est volontaire. Seuls les params d'URL sont échappés. */
    let html = p.demo ? blocDemo(p.demo) : "";
    p.sections.forEach((s) => {
      html += '<section class="fiche-section reveal vu">' +
        "<h2>" + escapeHtml(s.titre) + "</h2>" + s.contenu +
        (s.schema ? schemaArchitecture(s.schema) : "") +
      "</section>";
    });
    html += encartConfidentialite(p);
    return html;
  }

  /* -- Schémas d'architecture par projet (SVG thémés, zéro asset externe) -- */
  function schemaArchitecture(cle) {
    if (cle === "changes") return schemaChanges();
    if (cle === "gtr") return schemaGtr();
    if (cle === "w19") return schemaW19();
    return '<figure class="schema" role="img" aria-label="Architecture : sources projets vers consolidation VBA, puis reporting, analyse facturation et vue de charge, vers communication Outlook">' +
      '<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><marker id="fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
        '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl)">' +
          '<path d="M170,150 H235"/>' +
          '<path d="M405,110 C440,70 460,55 495,52"/>' +
          '<path d="M405,150 H495"/>' +
          '<path d="M405,190 C440,230 460,245 495,248"/>' +
          '<path d="M645,52 C690,60 705,110 705,138"/>' +
          '<path d="M645,150 H698"/>' +
          '<path d="M645,248 C690,240 705,190 705,162"/>' +
        '</g>' +
        '<g class="sch-boites">' +
          '<rect x="20" y="112" width="150" height="76" rx="10"/>' +
          '<text x="95" y="144">~30 projets</text><text x="95" y="164" class="sch-sub">sources Excel</text>' +
          '<rect x="240" y="112" width="165" height="76" rx="10" class="sch-core"/>' +
          '<text x="322" y="144">Consolidation</text><text x="322" y="164" class="sch-sub">moteur VBA</text>' +
          '<rect x="500" y="20" width="145" height="60" rx="10"/>' +
          '<text x="572" y="45">Reporting</text><text x="572" y="63" class="sch-sub">hebdomadaire</text>' +
          '<rect x="500" y="120" width="145" height="60" rx="10"/>' +
          '<text x="572" y="145">Analyse</text><text x="572" y="163" class="sch-sub">facturation</text>' +
          '<rect x="500" y="220" width="145" height="60" rx="10"/>' +
          '<text x="572" y="245">Vue de charge</text><text x="572" y="263" class="sch-sub">\u00e9quipes RUN</text>' +
        '</g>' +
        '<g class="sch-sortie">' +
          '<circle cx="705" cy="150" r="4"/>' +
        '</g>' +
      '</svg>' +
      '<figcaption>Architecture g\u00e9n\u00e9rique reconstitu\u00e9e \u2014 communication de sortie via Outlook</figcaption>' +
    '</figure>';
  }

  /* -- Schéma avant/après — fiche refonte-changes -- */
  function schemaChanges() {
    return '<figure class="schema" role="img" aria-label="Avant : outil HTML de 12 ans, copier-coller Word, relances, Outlook. Apr\u00e8s : Lists configur\u00e9 en JSON, PowerShell, livrables Word et Excel g\u00e9n\u00e9r\u00e9s">' +
      '<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><marker id="fl2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +

        '<text x="20" y="34" class="sch-lane sch-lane-avant">AVANT \u2014 cha\u00eene manuelle (~35 h/sem)</text>' +
        '<g class="sch-avant">' +
          '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl2)">' +
            '<path d="M188,80 H208"/><path d="M382,80 H402"/><path d="M556,80 H576"/>' +
          '</g>' +
          '<g class="sch-boites">' +
            '<rect x="20" y="52" width="168" height="56" rx="10"/>' +
            '<text x="104" y="76">Outil HTML</text><text x="104" y="94" class="sch-sub">maison \u00b7 12 ans</text>' +
            '<rect x="208" y="52" width="174" height="56" rx="10"/>' +
            '<text x="295" y="76">Word manuels</text><text x="295" y="94" class="sch-sub">copier-coller</text>' +
            '<rect x="402" y="52" width="154" height="56" rx="10"/>' +
            '<text x="479" y="76">Relances</text><text x="479" y="94" class="sch-sub">infos manquantes</text>' +
            '<rect x="576" y="52" width="164" height="56" rx="10"/>' +
            '<text x="658" y="76">Outlook</text><text x="658" y="94" class="sch-sub">mise en forme + envoi</text>' +
          '</g>' +
        '</g>' +

        '<text x="20" y="184" class="sch-lane sch-lane-apres">APR\u00c8S \u2014 cha\u00eene automatis\u00e9e (4 j de dev \u00b7 0 \u20ac)</text>' +
        '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl2)">' +
          '<path d="M268,236 H298"/>' +
          '<path d="M472,214 C510,190 530,182 560,180"/>' +
          '<path d="M472,258 C510,282 530,290 560,292"/>' +
        '</g>' +
        '<g class="sch-boites">' +
          '<rect x="20" y="202" width="248" height="68" rx="10" class="sch-core"/>' +
          '<text x="144" y="230">Microsoft Lists</text><text x="144" y="250" class="sch-sub">r\u00e9f\u00e9rentiel + r\u00e8gles \u00b7 config JSON</text>' +
          '<rect x="298" y="202" width="174" height="68" rx="10" class="sch-core"/>' +
          '<text x="385" y="230">PowerShell</text><text x="385" y="250" class="sch-sub">g\u00e9n\u00e9ration auto</text>' +
          '<rect x="560" y="150" width="180" height="56" rx="10"/>' +
          '<text x="650" y="174">Livrables Word</text><text x="650" y="192" class="sch-sub">g\u00e9n\u00e9r\u00e9s</text>' +
          '<rect x="560" y="262" width="180" height="56" rx="10"/>' +
          '<text x="650" y="286">Livrables Excel</text><text x="650" y="304" class="sch-sub">g\u00e9n\u00e9r\u00e9s</text>' +
        '</g>' +
      '</svg>' +
      '<figcaption>Reproduction ISO-fonctionnelle puis \u00e9volutions \u2014 architecture g\u00e9n\u00e9rique reconstitu\u00e9e</figcaption>' +
    '</figure>';
  }

  /* -- Schéma circuit de validation — fiche go-to-run -- */
  function schemaGtr() {
    return '<figure class="schema" role="img" aria-label="Circuit : le chef de projet saisit dans Power Apps, Lists tient le r\u00e9f\u00e9rentiel des statuts, Teams notifie et recueille les approbations, la d\u00e9cision Go/No-Go est trac\u00e9e. PowerShell en automatisation transverse">' +
      '<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><marker id="fl3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
        '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl3)">' +
          '<path d="M148,100 H172"/>' +
          '<path d="M338,100 H362"/>' +
          '<path d="M528,100 H552"/>' +
          '<path d="M255,132 V158"/>' +
          '<path d="M445,132 V158"/>' +
        '</g>' +
        '<g class="sch-boites">' +
          '<rect x="20" y="68" width="128" height="64" rx="10"/>' +
          '<text x="84" y="94">Chef de</text><text x="84" y="112">projet</text>' +
          '<rect x="172" y="68" width="166" height="64" rx="10" class="sch-core"/>' +
          '<text x="255" y="94">Power Apps</text><text x="255" y="112" class="sch-sub">demande guid\u00e9e</text>' +
          '<rect x="362" y="68" width="166" height="64" rx="10" class="sch-core"/>' +
          '<text x="445" y="94">Lists</text><text x="445" y="112" class="sch-sub">r\u00e9f\u00e9rentiel + statuts</text>' +
          '<rect x="552" y="68" width="188" height="64" rx="10" class="sch-core"/>' +
          '<text x="646" y="94">Teams</text><text x="646" y="112" class="sch-sub">notif. + approbations</text>' +
          '<rect x="172" y="158" width="356" height="52" rx="10"/>' +
          '<text x="350" y="180">PowerShell</text><text x="350" y="198" class="sch-sub">automatisation transverse</text>' +
          '<rect x="552" y="158" width="188" height="52" rx="10" class="sch-go"/>' +
          '<text x="646" y="180">Go / No-Go</text><text x="646" y="198" class="sch-sub">d\u00e9cision trac\u00e9e</text>' +
        '</g>' +
        '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl3)">' +
          '<path d="M646,132 V156"/>' +
        '</g>' +
      '</svg>' +
      '<figcaption>Circuit de validation \u2014 architecture g\u00e9n\u00e9rique reconstitu\u00e9e (v4 en d\u00e9veloppement)</figcaption>' +
    '</figure>';
  }

  /* -- Schéma chaîne de déploiement — fiche w19-master-deploy -- */
  function schemaW19() {
    return '<figure class="schema" role="img" aria-label="Cha\u00eene : ISO Windows Server 2019 vers master conforme pr\u00e9par\u00e9 en PowerShell, vers s\u00e9quence de t\u00e2ches MDT avec drivers et configurations, vers post-configuration PowerShell, vers VM pr\u00eate, une dizaine par semaine">' +
      '<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><marker id="fl4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
        '<g class="sch-fleches" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl4)">' +
          '<path d="M138,96 H160"/>' +
          '<path d="M330,96 H352"/>' +
          '<path d="M540,96 H562"/>' +
        '</g>' +
        '<g class="sch-boites">' +
          '<rect x="20" y="64" width="118" height="64" rx="10"/>' +
          '<text x="79" y="90">ISO</text><text x="79" y="108" class="sch-sub">WS 2019</text>' +
          '<rect x="160" y="64" width="170" height="64" rx="10" class="sch-core"/>' +
          '<text x="245" y="90">Master conforme</text><text x="245" y="108" class="sch-sub">pr\u00e9paration PowerShell</text>' +
          '<rect x="352" y="64" width="188" height="64" rx="10" class="sch-core"/>' +
          '<text x="446" y="90">S\u00e9quence MDT</text><text x="446" y="108" class="sch-sub">drivers + configs</text>' +
          '<rect x="562" y="64" width="178" height="64" rx="10" class="sch-go"/>' +
          '<text x="651" y="90">VM pr\u00eate</text><text x="651" y="108" class="sch-sub">post-config PowerShell</text>' +
        '</g>' +
        '<text x="380" y="180" class="sch-cadence">\u00d7 ~10 VM / semaine \u2014 2 j \u2192 1 j par VM</text>' +
      '</svg>' +
      '<figcaption>Cha\u00eene de d\u00e9ploiement industrialis\u00e9e \u2014 architecture g\u00e9n\u00e9rique reconstitu\u00e9e</figcaption>' +
    '</figure>';
  }

  /* -- Bloc démonstrateur : vidéo légère, iframe Power BI au clic -- */
  function blocDemo(d) {
    return '<section class="fiche-section demo-bloc">' +
      "<h2>Le d\u00e9monstrateur</h2>" +
      '<div id="demo-media" class="demo-media">' +
        '<video autoplay muted loop playsinline controls preload="metadata">' +
          '<source src="' + d.webm + '" type="video/webm">' +
          '<source src="' + d.mp4 + '" type="video/mp4">' +
        "</video>" +
      "</div>" +
      '<div class="demo-actions">' +
        '<button id="demo-embed" class="btn btn-primary" type="button">\u25b6 Manipuler le tableau ici</button>' +
        '<a class="btn btn-ghost" href="' + d.lien + '" target="_blank" rel="noopener">Ouvrir dans Power BI \u2197</a>' +
      "</div>" +
      '<p class="demo-note">Aucune connexion requise \u2014 donn\u00e9es 100 % fictives.</p>' +
    "</section>";
  }

  /* Bascule vidéo -> iframe interactive (chargement différé : l'iframe
     Power BI n'est demandée qu'au clic, la page reste légère) */
  function activerDemoEmbed(p) {
    const btn = document.querySelector("#demo-embed");
    if (!btn || !p.demo) return;
    btn.addEventListener("click", () => {
      const media = document.querySelector("#demo-media");
      media.innerHTML = '<iframe src="' + p.demo.lien +
        '" title="Tableau de bord Power BI interactif" allowfullscreen loading="lazy"></iframe>';
      media.classList.add("demo-live");
      btn.remove();
    }, { once: true });
  }

  /* -- Encart confidentialité standard des projets client -- */
  function encartConfidentialite(p) {
    if (p.statut !== "confidentiel") return "";
    return '<aside class="encart-confid">' +
      "<strong>\ud83d\udd12 Confidentialit\u00e9</strong> \u2014 Les assets de cette mission appartiennent au client et ne sont pas diffusables. " +
      "Un d\u00e9monstrateur g\u00e9n\u00e9rique, reconstruit de z\u00e9ro, est disponible ou en pr\u00e9paration." +
    "</aside>";
  }
})();

/* Échappement minimal pour tout contenu injecté (défense en profondeur) */
function escapeHtml(txt) {
  const div = document.createElement("div");
  div.textContent = String(txt);
  return div.innerHTML;
}
