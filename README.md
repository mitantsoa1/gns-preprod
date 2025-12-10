# GNS BTP Landing Page

Une landing page moderne et responsive pour GNS BTP, une entreprise de construction spécialisée dans le gros œuvre.

## Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Pour un code type-safe
- **Tailwind CSS** - Pour le styling
- **shadcn/ui** - Composants UI de haute qualité
- **next-intl** - Internationalisation (FR/EN)
- **Lucide React** - Icônes

## Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Internationalisation FR/EN avec switcher de langue
- ✅ Sections principales :
  - Hero avec titre percutant
  - Valeurs de l'entreprise
  - Expertises
  - Témoignages clients
  - Galerie de projets
  - Formulaire de contact
  - Footer complet
- ✅ Animations et transitions fluides
- ✅ Composants réutilisables avec shadcn/ui

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## Structure du projet

```
gns-btp-landing/
├── app/
│   └── [locale]/
│       ├── layout.tsx    # Layout principal avec i18n
│       ├── page.tsx      # Page d'accueil
│       └── globals.css   # Styles globaux
├── components/
│   ├── ui/              # Composants shadcn/ui
│   └── language-switcher.tsx  # Switcher de langue
├── i18n/
│   ├── request.ts       # Configuration i18n
│   └── routing.ts       # Routes i18n
├── messages/
│   ├── fr.json         # Traductions françaises
│   └── en.json         # Traductions anglaises
└── middleware.ts       # Middleware i18n
```

## Personnalisation

### Changer les couleurs

Les couleurs principales sont définies dans `app/[locale]/globals.css`. La couleur d'accent principale est le jaune (`yellow-400`).

### Ajouter des images

Placez vos images dans le dossier `public/` et remplacez les placeholders dans `app/[locale]/page.tsx`.

### Modifier les traductions

Éditez les fichiers `messages/fr.json` et `messages/en.json` pour modifier les textes.

## Build pour production

```bash
# Créer un build optimisé
npm run build

# Lancer le serveur de production
npm start
```

## Déploiement

Ce projet peut être déployé sur :
- Vercel (recommandé)
- Netlify
- Docker
- Tout hébergeur supportant Next.js

## Licence

© 2025 GNS BTP. Tous droits réservés by bluevaloris et gnsbtp
