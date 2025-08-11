module.exports = {
  schedule: '0 9 * * 1', // Tous les lundis à 9h
  tasks: [
    'npm run test:coverage',
    'node scripts/check-coverage.js',
    'node scripts/generate-report.js'
  ]
}
