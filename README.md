# Copilot Bridge API
[![CI Status](https://github.com/networkspace777/copilot-bridge/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/networkspace777/copilot-bridge/actions)
[![CI Status](https://github.com/networkspace777/copilot-bridge/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/networkspace777/copilot-bridge/actions)

## Fonctionnalités
- **Client LSP** : Interface avec GitHub Copilot
- **WebSocket Bridge** : Tunnel de communication temps-réel
- **API REST** : Endpoints pour intégration externe
  - `GET /api/suggestions` - Récupère les suggestions (cache-enabled)

## Installation
```bash
npm install
docker build -t copilot-bridge .
```

## Configuration
Modifier `config.prod.js` pour les paramètres de production

## Workflow d'Intégration Continue

### Workflow CI

Le workflow est déclenché :
- Tous les jours à 8h (UTC)
- Manuellement via l'interface GitHub

Notifications :
- Slack en cas d'échec
- Rapport complet dans l'onglet Actions

## Tests Unitaires

### Structure des Tests
- `tests/unit/` : Tests unitaires isolés
- `tests/integration/` : Tests d'intégration
- `tests/critical/` : Tests critiques

### Exécution
```bash
npm test                  # Tous les tests
npm test --coverage       # Avec rapport de couverture
npm run test:critical     # Uniquement les tests critiques
```

### Couverture
Objectifs actuels :
- Statements : 68%
- Branches : 83%
- Functions : 66%

## Automatisation
- Revues hebdomadaires : `node scripts/weekly-review.js`
- Suivi couverture : `node scripts/check-coverage.js`
- Reporting : `node scripts/generate-report.js`

## Documentation finale monitoring CI

### Surveillance CI

Le script `monitor-ci.js` permet de :
- Vérifier la stabilité des builds
- Suivre les métriques de couverture
- Générer des alertes en cas d'échecs

Exécution :
```bash
node scripts/monitor-ci.js
```

### Configuration Slack
1. Créer un webhook Slack
2. Ajouter le secret dans GitHub :
```bash
SLACK_WEBHOOK_URL="votre_url_webhook"
