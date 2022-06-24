var jp = require("jsonpath");
module.exports.responseHooks = [
  (context) => {
    const headerValue = context.request.getHeader(
      "INSOMNIA-RESPONSE-JSON-PARSE"
    );
    let errors = 0;
    if (headerValue) {
      jsonPath = headerValue;
      let response = {};
      try {
        response = JSON.parse(context.response.getBody().toString());
      } catch (error) {
        return;
      } finally {
        try {
          var values = jp
            .query(response, headerValue)
            .map((value) => JSON.parse(value));
          var paths = jp
            .paths(response, headerValue)
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
        }
      }
      if (errors == 0) {
        context.response.setBody(Buffer.from(JSON.stringify(response)));
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
