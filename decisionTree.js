// Decision tree

import rawData from './trainingData.js';

// Utilities
import {
  getAverage,
  singlePredictor,
  calcSquaredResidual,
  getUniqueValues,
  split,
} from './utils.js';

class Node {
  constructor(name, threshold, SSR, match, notMatch, prediction) {
    this.name = name;
    this.threshold = threshold;
    this.SSR = SSR;
    this.match = match;
    this.notMatch = notMatch;
    if (prediction) this.prediction = prediction;
  }
}

class DecisionTree {
  constructor({ trainingSet, predictionAttribute, minObservedCount }) {
    this.trainingSet = trainingSet;
    this.predictionAttribute = predictionAttribute;
    this.minObservedCount = minObservedCount;

    this.independentVars = ['day', 'price', 'sold', 'stock'].filter(
      (attr) => attr !== this.predictionAttribute
    );
  }

  /**
   *  Calculate all SSR of every thresholds of an attribute
   *
   * @param attr - attribute of the observed values
   *
   * @param currAttr - data set of observed (current attribute) value and predicted value
   *
   * @returns Lowest Sum of Squared Residual of an attribute
   */
  calcLowestSSR(attr, currAttr) {
    // Retrieve selected attribute and selected prediction attribute
    // const data = singlePredictor(
    //   this.trainingSet,
    //   this.predictionAttribute,
    //   attr
    // );

    let observedVals = currAttr.map((e) => e.observed);
    observedVals = getUniqueValues(observedVals);

    // retrieve all the average between unique observed values
    const thresholds = [];
    for (let i = 0; i < observedVals.length - 1; i++) {
      const temp = getAverage([observedVals[i], observedVals[i + 1]]);
      // Only add threshold if it doesn't exist yet
      thresholds.indexOf(temp) === -1 && thresholds.push(temp);
    }

    const stump = {
      threshold: 0,
      SSR: Infinity,
      matches: 0,
      notMatches: 0,
    };

    // Calculating SSR of every threshold to determine the lowest SSR
    thresholds.forEach((threshold) => {
      const currSplit = split(currAttr, 'observed', threshold);

      // Average value of predicted values base to matches and not matches
      const matchesAverage = getAverage(
        currSplit.match.map((e) => e.predicted)
      );
      const notMatchesAverage = getAverage(
        currSplit.notMatch.map((e) => e.predicted)
      );

      // Sum of Squared Residuals
      const currSSR = currAttr.reduce((a, b) => {
        const averagePredicted =
          b.observed < threshold ? matchesAverage : notMatchesAverage;
        return a + calcSquaredResidual(b.observed, averagePredicted);
      }, 0);

      // Assign current SSR if it is lower than the previous SSR
      if (currSSR < stump.SSR) {
        stump.threshold = threshold;
        stump.SSR = currSSR;
        stump.matches = currSplit.match;
        stump.notMatches = currSplit.notMatch;
      }
    });

    return new Node(
      attr,
      stump.threshold,
      Number(stump.SSR.toFixed(2)),
      stump.matches,
      stump.notMatches
    );
  }

  // Building decision tree tree
  buildTree() {
    const trainingSet = this.trainingSet;
    const predictionAttribute = this.predictionAttribute;
    const minObservedCount = this.minObservedCount;
    const independentVars = this.independentVars;

    // terminate building tree if training data set is too small
    if (trainingSet.length < minObservedCount)
      return { message: 'Training data set is too small' };

    const datas = [];

    // Only add independent vars that has more than 1 unique values
    independentVars.forEach((attr) => {
      const currAttr = singlePredictor(trainingSet, predictionAttribute, attr);

      // All observed vals
      const uniqueVals = getUniqueValues(currAttr.map((e) => e.observed));
      // Only calculate SSR for independent vars that only has more than 1 unique value
      if (uniqueVals.length > 1) {
        const ssr = this.calcLowestSSR(attr, currAttr);
        datas.push(ssr);
      }
    });

    const decisionTree = new Node('tree');
    console.log(decisionTree);
  }
}

const config = {
  trainingSet: rawData,
  predictionAttribute: 'sold',
  minObservedCount: 7,
};

const dt = new DecisionTree(config);
dt.buildTree();
// console.log(dt.buildTree());
// dt.calcLowestSSR('stock');
// console.log(dt.calcLowestSSR('price'));
// console.log(dt.calcLowestSSR('stock'));
// console.log(dt.calcLowestSSR('day'));
