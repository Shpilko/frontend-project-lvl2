import yaml from 'js-yaml';

export default (data, format) => {
  switch (true) {
    case format === 'json':
      return JSON.parse(data);

    case format === 'yml':
      return yaml.load(data);

    case format === 'yaml':
      return yaml.load(data);

    default:
      return new Error(`Wrong format ${format}`);
  }
};
