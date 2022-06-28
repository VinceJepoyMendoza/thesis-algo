/**
 * Sort an array by attribute
 *
 * @param arr - array of objects
 *
 * @param attr - array's attribute to be sorted by
 */
export const sortArr = (arr, attr) => {
  arr.sort((a, b) => a[attr] - b[attr]);
};

/**
 * Get uniques values from array
 *
 * @param arr - array of items
 *
 * @returns unique values of the array
 */
export const getUniqueValues = (arr) => {
  return [...new Set(arr)];
};

/**
 * Get average value of the array
 *
 * @param arr - array of number
 *
 * @returns average of the array
 */
export const getAverage = (arr) => {
  const length = arr.length;
  const sum = arr.reduce((a, b) => a + b, 0);
  return Number((sum / length).toFixed(2));
};

/**
 * Retrieve selected attribute and selected prediction attribute
 * @param data - training data set
 *
 * @param attr - name of observed value
 */
export const singlePredictor = (data, predictAttr, attr) => {
  return data
    .map((e) => {
      return { observed: e[attr], predicted: e[predictAttr] };
    })
    .sort((a, b) => a.observed - b.observed);
};

/**
 * Calculate squared residual
 *
 * @param observed - observed value
 *
 * @param predicted - average value of wether match or not match
 *
 * @returns squared of the difference of observed and predicted
 */
export const calcSquaredResidual = (observed, predicted) =>
  Number(Math.pow(observed - predicted, 2).toFixed(2));

/**
 * Evaluate the observed value with the threshold to determine the split,
 * Only supports '<=' since all the independent vars are for numeric data
 *
 * @param data - training data set
 *
 * @param attr - name of the observed value property which is embedded in the each object
 *
 * @param threshold - average of in between thresholds
 *
 * @returns array of object with match and not match properties
 */
export const split = (data, attr, threshold) => {
  const match = [];
  const notMatch = [];

  // Distribut predicted values of matches and not matches
  data.forEach((item) => {
    item[attr] < threshold ? match.push(item) : notMatch.push(item);
  });

  return {
    match,
    notMatch,
  };
};
