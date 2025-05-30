type AnyObject = { [key: string]: any };

export function getChangedProps<T extends AnyObject, U extends AnyObject>(
  original: T,
  changed: U
): Partial<U> {
  const result: AnyObject = {};

  for (const key in changed) {
    if (!(key in original)) {
      // New property
      result[key] = changed[key];
    } else {
      const originalValue = original[key];
      const changedValue = changed[key];

      if (isObject(originalValue) && isObject(changedValue)) {
        // Recurse if both values are objects
        const nestedChanges = getChangedProps(originalValue, changedValue);
        if (Object.keys(nestedChanges).length > 0) {
          result[key] = nestedChanges;
        }
      } else if (!isEqual(originalValue, changedValue)) {
        // Primitive or different value
        result[key] = changedValue;
      }
    }
  }

  return result;
}

function isObject(value: any): value is AnyObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEqual(a: any, b: any): boolean {
  // Basic deep equality check for primitives, arrays, and objects
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => isEqual(val, b[idx]));
  }
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => isEqual(a[key], b[key]));
  }
  return false;
}
