import { compare } from 'comparejs';
import { fail } from '../fail';

const isFalse = function (actual: any): () => void {
  return function (): void {
    if (compare.equal(actual, false)) {
      return;
    }

    fail('Expected %s to be false.', [ actual ]);
  };
};

isFalse.negated = function (actual: any): () => void {
  return function (): void {
    if (!compare.equal(actual, false)) {
      return;
    }

    fail('Expected %s not to be false.', [ actual ]);
  };
};

export { isFalse };
