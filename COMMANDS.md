# Commandes utiles

## Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000/fr  (version française)
# http://localhost:3000/en  (version anglaise)
```

## Build et Production

```bash
# Créer un build de production
npm run build

# Démarrer le serveur de production
npm start

# Linter le code
npm run lint
```

## shadcn/ui

```bash
# Ajouter un nouveau composant shadcn/ui
npx shadcn@latest add [component-name]

# Exemple : ajouter un dialog
npx shadcn@latest add dialog
```

## Internationalisation

Pour ajouter une nouvelle langue :

1. Créer un nouveau fichier dans `messages/` (ex: `de.json` pour l'allemand)
2. Ajouter la locale dans `i18n/routing.ts` :
   ```typescript
   export const routing = defineRouting({
     locales: ['fr', 'en', 'de'],
     defaultLocale: 'fr'
   });
   ```
3. Mettre à jour le middleware dans `middleware.ts` :
   ```typescript
   export const config = {
     matcher: ['/', '/(fr|en|de)/:path*']
   };
   ```

## Tests

```bash
# À implémenter selon vos besoins
# npm test
# npm run test:e2e
```
