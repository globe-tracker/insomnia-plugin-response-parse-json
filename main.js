var jp = require("jsonpath");
module.exports.responseHooks = [
  (context) => {
    const jsonPath = context.request.getHeader("INSOMNIA-RESPONSE-JSON-PARSE");
    let errors = 0;
    if (jsonPath) {
      let response = {};
      try {
        response = JSON.parse(context.response.getBody().toString());
      } catch (error) {
        console.error("Error parsing response body", error);
        return;
      } finally {
        try {
          var values = jp
            .query(response, jsonPath)
            .map((value) => JSON.parse(value));
          var paths = jp
            .paths(response, jsonPath)
            .map((path) => path.slice(1).join("."));
          var modVals = {};
          for (let index = 0; index < paths.length; index++) {
            modVals[paths[index]] = values[index];
          }
          Object.entries(modVals).forEach(([key, value]) => {
            setAttributeFromPath(key, response, value);
          });
        } catch (error) {
          errors++;
          console.error(error);
        }
      }
      if (errors == 0) {
        context.response.setBody(Buffer.from(JSON.stringify(response)));
      } else {
        console.error(
          "Error in plugin response-json-parse, not modifying response"
        );
      }
    }
  },
];

const setAttributeFromPath = (path, entity, value) => {
  const pathParts = path.split(".");
  let obj = entity;

  pathParts.forEach((part, index) => {
    if (obj[part]) {
      if (index < pathParts.length - 1) {
        obj = obj[part];
      } else {
        obj[part] = value;
      }
    }
  });
};
