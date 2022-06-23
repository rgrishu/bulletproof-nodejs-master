 export function  removeEmptyObjectFromJson(jsonData:any) {
  const filteredData = Object.entries(jsonData).reduce((x, [k, v]) => {
    if (v && k!=='action') { // not ( null, undefined, empty string)
        x[k] = v;
    }
    return x;
  }, {} as any);
  return filteredData;
 }

