const { MIN_COVERAGE } = require('./check-coverage');

module.exports = {
  generate: () => {
    console.log('Rapport hebdomadaire généré');
    console.log(`Objectifs de couverture : ${JSON.stringify(MIN_COVERAGE)}`);
  }
};
