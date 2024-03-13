import { pipe, replace, toUpper, compose, head } from 'ramda';


// matches each word in a camelCaseString (except the first)
// consecutive capitals are treated as one word
const RX_CAPS = /(?!^)([A-Z][a-z0-9]+|[A-Z][A-Z0-9]*(?=[A-Z]|\b))/g;

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
const camelToScreamingSnake = pipe(replace(RX_CAPS, '_$1'), toUpper);

const upperHead = (str: any) => {
  return compose(toUpper, head)(str);
};

export { camelToScreamingSnake, upperHead };
