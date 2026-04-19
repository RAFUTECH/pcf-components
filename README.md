# PCF Components — RAFUTECH

Collection de composants **Power Apps Component Framework (PCF)** réutilisables pour Power Apps et Dynamics 365.

## Composants disponibles

| Composant | Description | Status |
|-----------|-------------|--------|
| *bientôt disponible* | | |

## Prérequis

- [Node.js](https://nodejs.org/) v16+
- [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)
- [Visual Studio Code](https://code.visualstudio.com/)

```bash
npm install -g pac
```

## Structure du projet

```
pcf-components/
├── components/
│   └── [NomComposant]/     ← un dossier par composant
│       ├── index.ts
│       ├── ControlManifest.Input.xml
│       └── package.json
└── README.md
```

## Utilisation

```bash
# Cloner le repo
git clone https://github.com/RAFUTECH/pcf-components.git

# Aller dans un composant
cd components/NomComposant

# Installer les dépendances
npm install

# Lancer en mode développement
npm start watch
```

## Contribuer

1. Créer une branche : `git checkout -b feature/nom-composant`
2. Développer le composant dans `components/`
3. Commiter : `git commit -m "feat: ajouter composant NomComposant"`
4. Push & Pull Request

## Licence

MIT — [RAFUTECH](https://github.com/RAFUTECH)
