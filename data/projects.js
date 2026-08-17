/* ============================================================
   PROJECTS — SOURCE DE VÉRITÉ UNIQUE
   ------------------------------------------------------------
   Toute la donnée projets du portfolio vit ICI et uniquement ici.
   L'accueil (cartes), la command palette et les fiches projet
   (projet.html?id=xxx) se génèrent depuis ce fichier.
   Ajouter un projet = ajouter un objet ci-dessous. Rien d'autre.
   Ordre : missions client (confidentiel) puis projets personnels
   (démonstrateurs publics).
   ============================================================ */

const PROJECTS = [
  {
    id: "refonte-changes",
    numero: "01",
    titre: "Refonte du process Changes",
    pitch: "Reconstruction complète d'un processus de gestion des changements : de l'app legacy à une solution Microsoft Lists + PowerShell pilotée par la donnée.",
    stack: ["Microsoft Lists", "JSON", "PowerShell", "IA"],
    kpis: [
      { valeur: "35 h", label: "économisées / semaine" },
      { valeur: "4 j", label: "de charge de dev" },
      { valeur: "0 €", label: "d'investissement" }
    ],
    statut: "confidentiel",
    statutLabel: "Assets client — démonstrateur générique en préparation",
    resume: "Fiche compl\u00e8te.",
    meta: "Initiative personnelle en mission \u00b7 Confidentiel",
    sections: [
      {
        titre: "Contexte & probl\u00e8me",
        contenu: "<p>Le processus de gestion des changements reposait sur un outil maison en HTML vieux de douze ans, autour duquel s'\u00e9tait s\u00e9diment\u00e9e une cha\u00eene enti\u00e8rement manuelle : copier-coller depuis l'outil vers des documents Word, mises \u00e0 jour de ces Word \u00e0 la main, relances individuelles des acteurs \u00e0 chaque information manquante, puis mise en forme dans Outlook avant envoi. Chaque \u00e9tape \u00e9tait une ressaisie, chaque ressaisie un risque d'erreur \u2014 et l'ensemble consommait environ 35 heures par semaine de travail sans valeur ajout\u00e9e.</p>"
      },
      {
        titre: "D\u00e9clencheur & d\u00e9marche",
        contenu: "<p>Aucune commande, aucun budget : une initiative personnelle, pour aligner l'outillage sur la latitude qu'exigeait le poste. La d\u00e9marche a tenu en deux temps courts. D'abord la r\u00e9tro-ing\u00e9nierie de l'outil existant et de ses workflows, pour en comprendre la logique compl\u00e8te. Ensuite une reproduction <strong>ISO-fonctionnelle</strong> \u2014 m\u00eame p\u00e9rim\u00e8tre, aucun utilisateur perdu \u2014 imm\u00e9diatement suivie des \u00e9volutions que les \u00e9quipes attendaient depuis des mois sur l'outil d'origine, sans jamais avoir pu les obtenir. Le tout, avec l'IA en accompagnement, en <strong>4 jours de charge</strong>.</p>"
      },
      {
        titre: "Solution",
        contenu: "<p>L'architecture tient sur trois briques Microsoft 365 d\u00e9j\u00e0 pr\u00e9sentes chez le client \u2014 d'o\u00f9 le z\u00e9ro euro d'investissement. <strong>Microsoft Lists</strong> devient le r\u00e9f\u00e9rentiel unique : les changes, mais aussi les r\u00e8gles de gestion. Le <strong>JSON</strong> pilote la mise en forme et la configuration de Lists \u2014 vues, colonnes, rendu conditionnel. <strong>PowerShell</strong> automatise ce qui d\u00e9vorait les semaines : le formatage et la g\u00e9n\u00e9ration des livrables Excel et Word, sans copier-coller, sans ressaisie.</p>",
        schema: "changes"
      },
      {
        titre: "R\u00e9sultats",
        contenu: "<p>Environ <strong>35 heures par semaine</strong> lib\u00e9r\u00e9es des t\u00e2ches de ressaisie et de mise en forme. Un d\u00e9veloppement men\u00e9 et mis en place en <strong>4 jours de charge</strong>, pour <strong>0 \u20ac d'investissement</strong> : aucune licence, aucun outil achet\u00e9, uniquement l'existant M365 mieux exploit\u00e9. Et des \u00e9volutions attendues depuis des mois, enfin livr\u00e9es.</p>"
      },
      {
        titre: "Enseignements",
        contenu: "<p>Ce projet a rendu visible ce que beaucoup d'organisations sous-estiment : la puissance dormante de Microsoft Lists et des applications M365 d\u00e9j\u00e0 pay\u00e9es. <em>Avant d'acheter un outil, il y a presque toujours une r\u00e9ponse dans l'existant \u2014 \u00e0 condition de savoir la construire.</em></p>"
      }
    ]
  },
  {
    id: "go-to-run",
    numero: "02",
    titre: "Validation Go To Run",
    pitch: "Digitalisation du circuit de validation de mise en production : Power Apps, Microsoft Lists et Teams orchestrés en une app unique, itérée en 4 versions.",
    stack: ["Power Apps", "Microsoft Lists", "Teams", "PowerShell", "IA"],
    kpis: [
      { valeur: "4", label: "versions itérées" },
      { valeur: "18 j", label: "de charge de dev" },
      { valeur: "v4", label: "en d\u00e9veloppement" }
    ],
    statut: "confidentiel",
    statutLabel: "Assets client — démonstrateur générique en préparation",
    resume: "Fiche compl\u00e8te \u2014 projet en cours.",
    meta: "Grand compte industriel \u00b7 En cours \u00b7 Confidentiel",
    sections: [
      {
        titre: "Contexte & probl\u00e8me",
        contenu: "<p>La validation \u00ab Go To Run \u00bb \u2014 le feu vert qui autorise le passage d'un projet vers l'exploitation \u2014 circulait entre les mails, les r\u00e9unions et les fichiers Excel. Trois canaux, aucun r\u00e9f\u00e9rentiel : le statut d'une validation d\u00e9pendait de qui avait lu quel mail, les d\u00e9cisions se dispersaient, et chaque passage en RUN exigeait de reconstituer l'historique \u00e0 la main.</p>"
      },
      {
        titre: "D\u00e9clencheur",
        contenu: "<p>La demande est venue du client, avec une contrainte claire et saine : <strong>utiliser les outils d\u00e9j\u00e0 en place</strong>, sans acquisition. Exactement le terrain de jeu du socle Microsoft 365 existant.</p>"
      },
      {
        titre: "D\u00e9marche \u2014 quatre versions, quatre paliers d'autonomie",
        contenu: "<p>Plut\u00f4t qu'un cahier des charges fig\u00e9, l'application a \u00e9t\u00e9 construite en quatre versions successives, au contact des utilisateurs. Le fil conducteur des it\u00e9rations : <strong>chaque version rend le chef de projet plus autonome</strong> dans son circuit de validation \u2014 moins de d\u00e9pendance aux relances, aux interm\u00e9diaires et aux r\u00e9unions pour faire avancer un dossier. Le d\u00e9veloppement, men\u00e9 avec l'IA en accompagnement, repr\u00e9sente <strong>18 jours de charge</strong> \u00e0 ce stade.</p>"
      },
      {
        titre: "Solution",
        contenu: "<p>Trois briques M365 orchestr\u00e9es : <strong>Power Apps</strong> porte l'interface de demande et de validation \u2014 le circuit devient un formulaire guid\u00e9, plus un fil de mails. <strong>Microsoft Lists</strong> est le r\u00e9f\u00e9rentiel unique des demandes et de leurs statuts \u2014 l'historique se constitue tout seul. <strong>Teams</strong> diffuse notifications et approbations l\u00e0 o\u00f9 les acteurs travaillent d\u00e9j\u00e0. <strong>PowerShell</strong> compl\u00e8te l'ensemble c\u00f4t\u00e9 automatisation.</p>",
        schema: "gtr"
      },
      {
        titre: "O\u00f9 en est le projet",
        contenu: "<p>L'application est en <strong>phase de d\u00e9veloppement, version 4</strong>. Les r\u00e9sultats d'exploitation seront mesur\u00e9s apr\u00e8s d\u00e9ploiement \u2014 et c'est un choix m\u00e9thodologique assum\u00e9 : aucun chiffre ne sera publi\u00e9 ici qui ne soit constat\u00e9.</p>"
      },
      {
        titre: "Enseignements",
        contenu: "<p>Ce projet a ancr\u00e9 un r\u00e9flexe de consultant : <strong>mesurer avant d'outiller</strong>. Le circuit initial n'ayant jamais \u00e9t\u00e9 chiffr\u00e9, le gain de la digitalisation restera plus difficile \u00e0 d\u00e9montrer qu'\u00e0 constater. Depuis, la mesure de l'existant fait partie de ma premi\u00e8re it\u00e9ration, syst\u00e9matiquement : <em>on ne pilote que ce qu'on mesure \u2014 et on ne valorise que ce qu'on a mesur\u00e9 avant.</em></p>"
      }
    ]
  },
  {
    id: "w19-master-deploy",
    numero: "03",
    titre: "W19 Master Deploy",
    pitch: "Masterisation, automatisation et déploiement d'une ISO Windows Server 2019 sur VM : chaîne industrialisée PowerShell + Microsoft Deployment Toolkit.",
    stack: ["PowerShell", "MS MDT", "Windows Server 2019", "IA"],
    kpis: [
      { valeur: "1 j", label: "de charge gagné / VM" },
      { valeur: "-50 %", label: "sur la charge de déploiement" },
      { valeur: "~10 j-h", label: "r\u00e9cup\u00e9r\u00e9s / semaine" }
    ],
    statut: "confidentiel",
    statutLabel: "Assets client — démonstrateur générique en préparation",
    resume: "Fiche compl\u00e8te.",
    meta: "Grand compte industriel \u00b7 Renouvellement de parc \u00b7 Confidentiel",
    sections: [
      {
        titre: "Contexte & probl\u00e8me",
        contenu: "<p>Dans le cadre d'un renouvellement de parc et d'une migration, le d\u00e9ploiement des VM Windows Server 2019 reposait sur deux voies, toutes deux probl\u00e9matiques : l'installation manuelle depuis l'ISO \u2014 environ <strong>deux jours de charge par VM</strong> \u2014 ou le clonage d'un master Windows Server 2016 <strong>non conforme aux exigences de s\u00e9curit\u00e9</strong>. \u00c0 une cadence d'une dizaine de VM par semaine, l'\u00e9quation ne tenait pas : soit on payait le prix fort en charge, soit on livrait des serveurs hors conformit\u00e9.</p>"
      },
      {
        titre: "D\u00e9marche",
        contenu: "<p>Le choix s'est port\u00e9 sur l'industrialisation compl\u00e8te de la cha\u00eene avec <strong>Microsoft Deployment Toolkit (MDT)</strong> \u2014 un outil que l'\u00e9quipe ne connaissait pas. C'est l\u00e0 que l'IA a jou\u00e9 son r\u00f4le d'accompagnement : monter en comp\u00e9tence rapidement sur MDT, ses s\u00e9quences de t\u00e2ches et ses pi\u00e8ges, sans attendre une formation ni un expert externe.</p>"
      },
      {
        titre: "Solution",
        contenu: "<p>La cha\u00eene s'articule en trois temps. <strong>La masterisation</strong> : un master Windows Server 2019 propre et conforme, pr\u00e9par\u00e9 via PowerShell. <strong>La s\u00e9quence de t\u00e2ches MDT</strong> : injection des drivers et des configurations, d\u00e9roul\u00e9 standardis\u00e9 et reproductible du d\u00e9ploiement. <strong>La post-configuration PowerShell</strong> : chaque VM sort de cha\u00eene configur\u00e9e, sans intervention manuelle \u2014 PowerShell orchestrant l'ensemble de bout en bout.</p>",
        schema: "w19"
      },
      {
        titre: "R\u00e9sultats",
        contenu: "<p><strong>Un jour de charge gagn\u00e9 par VM</strong> \u2014 de deux jours \u00e0 un \u2014 soit <strong>50 % de la charge de d\u00e9ploiement</strong>. \u00c0 la cadence d'une dizaine de VM par semaine, ce sont <strong>de l'ordre de dix jours-homme r\u00e9cup\u00e9r\u00e9s chaque semaine</strong>. Et un b\u00e9n\u00e9fice qui ne se chiffre pas en jours : la fin du recours au master 2016 non conforme \u2014 chaque VM livr\u00e9e l'est d\u00e9sormais sur une base <strong>conforme aux exigences de s\u00e9curit\u00e9</strong>, identique et reproductible.</p>"
      },
      {
        titre: "Enseignements",
        contenu: "<p>Un outil inconnu de l'\u00e9quipe n'est plus un mur : accompagn\u00e9 par l'IA, l'apprentissage de MDT s'est fait en situation, sur le projet r\u00e9el, sans d\u00e9lai de formation. C'est devenu un r\u00e9flexe : <em>face \u00e0 un outil nouveau, l'IA transforme le temps de mont\u00e9e en comp\u00e9tence en temps de production</em> \u2014 \u00e0 condition de garder la main sur la validation de chaque \u00e9tape.</p>"
      }
    ]
  },
  {
    id: "reprise-cellule-forfait",
    numero: "04",
    titre: "Reprise de la cellule projets au forfait",
    pitch: "Reprise, réorganisation et assainissement de la gestion des projets au forfait : outillage VBA Excel et communication Outlook structurée.",
    stack: ["VBA Excel", "Outlook", "Gestion de projet", "IA"],
    kpis: [
      { valeur: "1", label: "chef de projet au lieu de 4" },
      { valeur: "~30", label: "projets ouverts pilotés" },
      { valeur: "÷4", label: "effectif de pilotage" }
    ],
    statut: "confidentiel",
    statutLabel: "Assets client — démonstrateur générique en préparation",
    resume: "Fiche compl\u00e8te.",
    meta: "Mission 4 mois \u00b7 Grand compte industriel \u00b7 Confidentiel",
    sections: [
      {
        titre: "Contexte & probl\u00e8me",
        contenu: "<p>\u00c0 la reprise du sujet, la cellule projets au forfait cumulait les signaux rouges : trois chefs de projet sur le d\u00e9part \u00e0 court terme, une trentaine de projets ouverts en retard, une facturation incoh\u00e9rente \u2014 montants divergents d'un projet \u00e0 l'autre, parfois tout simplement absente \u2014 et une pression client croissante. S'ajoutait une difficult\u00e9 structurelle : la disponibilit\u00e9 des \u00e9quipes RUN sur les projets n'\u00e9tait ni organis\u00e9e ni visible, chaque arbitrage se faisant au fil de l'eau.</p>"
      },
      {
        titre: "D\u00e9marche",
        contenu: "<p>Pas d'outillage avant le diagnostic. Les deux premi\u00e8res semaines ont \u00e9t\u00e9 consacr\u00e9es \u00e0 des \u00e9changes directs \u2014 clients, techniciens garants des op\u00e9rations, acteurs internes \u2014 pour faire remonter les points de friction r\u00e9els plut\u00f4t que suppos\u00e9s. Ce diagnostic terrain a aliment\u00e9 un plan d'am\u00e9lioration prioris\u00e9, dont la visibilit\u00e9 a \u00e9t\u00e9 adapt\u00e9e \u00e0 chaque interlocuteur : le client voit l'avancement, les \u00e9quipes voient leur charge.</p>"
      },
      {
        titre: "Solution",
        contenu: "<p>L'assainissement a repos\u00e9 sur l'automatisation des micro-t\u00e2ches qui asphyxiaient le pilotage, avec l'IA en accompagnement du d\u00e9veloppement. Un outillage VBA Excel a pris en charge : la <strong>consolidation multi-projets</strong> (une vue unique sur ~30 projets), le <strong>reporting hebdomadaire</strong> g\u00e9n\u00e9r\u00e9 automatiquement, et l'<strong>analyse financi\u00e8re et historique</strong> de la facturation \u2014 permettant d'identifier les \u00e9carts et les factures manquantes. La communication de suivi s'appuyait sur Outlook, structur\u00e9e et syst\u00e9matique.</p>",
        schema: "forfait"
      },
      {
        titre: "R\u00e9sultats",
        contenu: "<p>Un seul chef de projet \u2014 au lieu de quatre \u2014 a suffi pour piloter le portefeuille d'environ 30 projets ouverts. Des projets bloqu\u00e9s depuis plusieurs semaines ont \u00e9t\u00e9 relanc\u00e9s et men\u00e9s \u00e0 terme. La facturation en souffrance a \u00e9t\u00e9 r\u00e9cup\u00e9r\u00e9e : les \u00e9carts identifi\u00e9s, les factures manquantes \u00e9mises.</p>"
      },
      {
        titre: "Enseignements",
        contenu: "<p>Le pilotage de projet est satur\u00e9 de micro-t\u00e2ches \u00e0 faible valeur ajout\u00e9e \u2014 consolider, relancer, reporter \u2014 qui sont presque toutes automatisables. Les \u00e9liminer ne fait pas que gagner du temps : cela rend au chef de projet sa vraie fonction, l'arbitrage et la relation. C'est ce principe que j'applique aujourd'hui syst\u00e9matiquement : <em>automatiser l'administratif pour r\u00e9investir l'humain l\u00e0 o\u00f9 il est irrempla\u00e7able.</em></p>"
      }
    ]
  },
  {
    id: "dashboard-bi",
    numero: "05",
    titre: "Dashboard BI",
    pitch: "Tableau de bord décisionnel interactif : de la donnée brute au pilotage visuel. Démonstration publique disponible.",
    stack: ["BI", "Data visualisation", "Pilotage par la donnée"],
    kpis: [
      { valeur: "Live", label: "d\u00e9mo publique" },
      { valeur: "4", label: "sources mod\u00e9lis\u00e9es" },
      { valeur: "DAX", label: "mesures + actualisation" }
    ],
    statut: "demo",
    statutLabel: "D\u00e9mo publique en ligne",
    resume: "Fiche compl\u00e8te \u2014 d\u00e9mo live int\u00e9gr\u00e9e.",
    meta: "Projet personnel \u00b7 Donn\u00e9es fictives \u00b7 D\u00e9mo publique",
    demo: {
      mp4: "assets/demo-bi.mp4",
      webm: "assets/demo-bi.webm",
      lien: "https://app.powerbi.com/view?r=eyJrIjoiZmUwNWVlZTUtZTgyMy00ZWIxLTljNGUtZjgwMzBjMWMwOTJjIiwidCI6ImYzYjVkYjYzLTNkZWYtNGZkZS04OTdkLWE1ZDk0N2U1ZjEzNCJ9"
    },
    sections: [
      {
        titre: "Contexte & intention",
        contenu: "<p>Un tableau de bord ne se raconte pas, il se manipule \u2014 d'o\u00f9 ce projet personnel : construire de bout en bout un dashboard de pilotage complet et le rendre <strong>publiquement explorable</strong>. Le terrain de jeu : une PME de services fictive, avec le cycle de gestion complet \u2014 ventes et contrats, charges op\u00e9rationnelles, encaissements, portefeuille clients.</p>"
      },
      {
        titre: "Donn\u00e9es & mod\u00e8le",
        contenu: "<p>Quatre sources de donn\u00e9es fictives, construites pour \u00eatre r\u00e9alistes : les ventes (contrats de maintenance, interventions, locations), les charges op\u00e9rationnelles, le suivi des paiements et le r\u00e9f\u00e9rentiel clients. Le tout reli\u00e9 dans un <strong>mod\u00e8le de donn\u00e9es</strong> Power BI o\u00f9 chaque visuel interroge la m\u00eame v\u00e9rit\u00e9 \u2014 pas de chiffre calcul\u00e9 deux fois, pas d'\u00e9cart possible entre deux pages.</p>"
      },
      {
        titre: "Construction",
        contenu: "<p>R\u00e9alis\u00e9 sur <strong>Power BI</strong>, avec l'IA en accompagnement sur les trois volets du m\u00e9tier d\u00e9cisionnel : la conception du <strong>mod\u00e8le de donn\u00e9es</strong>, l'\u00e9criture des <strong>mesures DAX</strong>, et le <strong>design</strong> \u2014 hi\u00e9rarchie visuelle, lisibilit\u00e9, parcours de lecture. L'<strong>actualisation</strong> est en place : le tableau vit avec ses donn\u00e9es.</p>"
      },
      {
        titre: "Enseignements",
        contenu: "<p>Ce que ce dashboard d\u00e9montre d\u00e9passe l'outil : le pilotage par la donn\u00e9e <strong>confirme ou infirme ce que les \u00e9quipes rapportent \u00e0 l'oral</strong>. Les ressentis sont pr\u00e9cieux, ils orientent \u2014 mais <em>les chiffres ne mentent pas.</em> Un tableau de bord bien construit n'est pas un rapport de plus : c'est l'arbitre neutre des conversations de pilotage.</p>"
      }
    ]
  }
];

/* Entrées de navigation additionnelles pour la command palette */
const NAV_ITEMS = [
  { type: "page", label: "Accueil", hint: "revenir au hub", href: "index.html" },
  { type: "page", label: "Dossier de compétences", hint: "CV interactif — bientôt lié", href: "#dc" }
];

/* ============================================================
   PROJET EN ATTENTE DE RÉALISATION — réintégrer ce bloc dans
   PROJECTS (avant dashboard-bi) une fois le projet construit,
   puis renuméroter et mettre à jour le compteur de l'accueil.
   ============================================================
  {
    id: "orchestrateur-debat-ia",
    numero: "05",
    titre: "Orchestrateur de débat IA",
    pitch: "Application locale qui fait débattre deux IA en direct, avec un humain dans le rôle du modérateur. Projet personnel de R&D conversationnelle.",
    stack: ["IA", "App locale", "Orchestration multi-agents"],
    kpis: [
      { valeur: "2", label: "IA en débat live" },
      { valeur: "1", label: "modérateur humain" },
      { valeur: "R&D", label: "projet personnel" }
    ],
    statut: "demo",
    statutLabel: "Démonstrateur public prévu",
    resume: "Contenu détaillé à venir (Phase 2).",
    sections: []
  }
*/
