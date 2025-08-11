const fetch = async (endpoint) => {
  // Implémentation mockée par défaut pour les tests
  return {
    status: 200,
    data: { success: true }
  };
};

module.exports = { fetch };
