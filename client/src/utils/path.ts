interface IVarToStringParams {
  variablesArray: {
    key: string;
    value: string | undefined | number;
  }[];
}

type IVarToStringParamsValue = IVarToStringParams['variablesArray'][number]['value'];
type IQueryObject = Record<string, IVarToStringParamsValue>;

export const varToStringParams = (data: IVarToStringParams): string => {
  let { variablesArray } = data;
  let str = '';
  if (variablesArray.length === 1) {
    const { key, value } = variablesArray[0];
    return value ? `?${key}=${value}` : '';
  }
  let first = true;
  for (let i = 0; i < variablesArray.length; i++) {
    const { key, value } = variablesArray[i];
    if (value || value === 0) {
      let temp = `${key}=${value}`;
      if (!first) {
        // not first
        temp = `&${temp}`;
      }
      str += temp;
      first = false;
    }
  }
  if (str) {
    str = '?' + str;
  }
  return str;
};
