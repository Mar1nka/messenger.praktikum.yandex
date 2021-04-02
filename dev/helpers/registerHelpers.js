// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
const Handlebars = require('handlebars');

Handlebars.registerHelper('componentsArray', (components) => {
  let result = '';

  components.forEach((component) => {
    result += component.renderToString();
  });

  return new Handlebars.SafeString(result);
});

module.exports = Handlebars;
