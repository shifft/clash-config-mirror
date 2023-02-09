export function filterCN(data: string) {
  return data
    .split('\n')
    .filter((line) => {
      if (line.indexOf('_CN_中国') > 0) {
        return false
      }

      return true
    })
    .join('\n')
}
