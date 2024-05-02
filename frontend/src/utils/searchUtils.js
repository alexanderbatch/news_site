/**
 * Constructs URL with query parameters.
 * @param {string} base - Base URL.
 * @param {Object} params - Query parameters as key-value pairs.
 * @returns {URL} URL object with appended search parameters.
 */
export const constructSearchUrl = (base, params) => {
  const url = new URL(base);
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url;
};
