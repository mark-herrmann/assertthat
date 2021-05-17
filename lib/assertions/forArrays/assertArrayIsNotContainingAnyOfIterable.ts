import { AssertionFailed } from '../../errors';
import { compareSets } from '../../comparisons/forSets/compareSets';
import { dispel } from '../../dispel/dispel';
import { isEqualDiff } from '../../diffs/EqualDiff';
import { prettyPrint } from '../../prettyPrint/typeAware/prettyPrint';
import { error, Result, value } from 'defekt';

const assertArrayIsNotContainingAnyOfIterable = function <TContent>(
  actual: TContent[],
  iterable: Iterable<TContent>
): Result<undefined, AssertionFailed> {
  const dispelledActual = dispel(actual);
  const dispelledExpected = dispel(iterable);

  const setFromActual = new Set(dispelledActual);
  const setFromExpected = new Set(dispelledExpected);

  const diff = compareSets(setFromActual, setFromExpected);

  if (!isEqualDiff(diff) && diff.equal.size === 0) {
    return value();
  }

  return error(new AssertionFailed({
    message: 'The array contains one or more of the items in the iterable.',
    actual: prettyPrint(dispelledActual),
    expected: `To not contain any of:\n${prettyPrint(dispelledExpected)}`,
    diff: `These items are contained, but should not be:\n${prettyPrint(
      isEqualDiff(diff) ? setFromExpected : diff.equal
    )}`
  }));
};

export {
  assertArrayIsNotContainingAnyOfIterable
};
