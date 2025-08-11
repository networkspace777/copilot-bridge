# Bridge Copilot-LSP

## Architecture
- Client LSP basé sur `vscode-languageclient`  
- Tunnel WebSocket pour échange inter-processus  
- Logging centralisé dans `copilot-bridge.log`  

## Workflow
1. Initialisation du serveur LSP  
2. Authentification OAuth  
3. Synchronisation des documents  
4. Échange de suggestions  

## Installation
```bash
npm install @github/copilot-language-server vscode-languageclient ws
```
