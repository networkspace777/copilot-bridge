# Stratégie d'activation MCP

## Règles d'utilisation
- Désactivé par défaut pour les tests
- Activé explicitement pour :
  - Sessions de production
  - Débogage avancé
  - Journalisation critique

## Commandes
```powershell
# Mode test (MCP désactivé)
npm test

# Mode production (MCP activé)
$env:DISABLE_MCP_SERVERS="false" && npm start
```

## Patterns d'Utilisation ApiAdapter

### Initialisation
```javascript
import ApiAdapter from '../core/api-adapter';

const adapter = new ApiAdapter();
await adapter.initialize(); // Configure les paramètres par défaut
```

### Envoi de Requêtes
```javascript
// Avec gestion d'erreur intégrée
try {
  const response = await adapter.sendRequest('/endpoint', { data });
} catch (error) {
  console.error('API Error:', error);
}
```

### Vérification de Statut
```javascript
setInterval(async () => {
  const isHealthy = await adapter.getStatus();
  if (!isHealthy) alert('API unreachable!');
}, 30000);
```

### Configuration
```javascript
// Configuration personnalisée
process.env.API_BASE_URL = 'https://custom.api.url';

```

## Migration ES Modules

### Patterns Recommandés
```javascript
// Export par défaut
export default class MyClass {}

// Export nommé
export function myFunction() {}

// Import
import MyClass from './my-class';
import { myFunction } from './utils';
```

### Initialisation Asynchrone
```javascript
class MyClass {
  constructor() {
    // Configuration synchrone
  }

  async initialize() {
    // Initialisation asynchrone
    this.dependency = await import('./dependency');
  }
}
