
/*
 * export a Package instance from a `/packageName` directory
 */
export default (registry, packageInstance) => {
  Object.defineProperty(registry, '__esModule', { value: true });

  Object.keys((packageInstance.exports || {})).forEach(function(exportName) {
    registry[exportName] = (packageInstance.exports || {})[exportName];
  });

  registry['default'] = packageInstance;
};
