import _ from 'lodash';

interface ICleanObjectOptions {
  clearNull?: boolean;
  clearEmptyObject?: boolean;
  clearUndefined?: boolean;
}
export function cleanObject(obj: { [key: string]: any }, options?: ICleanObjectOptions) {
  const { clearEmptyObject = false, clearNull, clearUndefined = true } = options ?? {};
  const include: Array<undefined | null> = [];
  if (clearUndefined) {
    include.push(undefined);
  }
  if (clearNull) {
    include.push(null);
  }
  // v !== undefined
  const result = _.pickBy(obj, (v) => !include.includes(v));
  return clearEmptyObject ? removeEmptyObject(result as any) : result;
}
export function removeEmptyObject(obj: { [key: string]: any }) {
  return Object.values(obj).length > 0 ? obj : undefined;
}
