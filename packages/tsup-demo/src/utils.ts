/**
 * Format price number
 *
 * @example
 * formatPriceNum(123456789) => '123,456,789'
 * formatPriceNum(123456789, 0, '¥') => '¥123,456,789'
 * formatPriceNum(123456789, 2, '¥') => '¥123,456,789.00'
 * formatPriceNum(123456789, 2, '¥', '元') => '¥123,456,789.00元'
 *
 * @param num number to format
 * @param diget digits to keep
 * @param prefix prefix to append
 * @param suffix suffix to append
 * @returns string
 */
export function formatPriceNum(num: number, diget = 0, prefix = '', suffix = ''): string {
  return prefix
    + Number(num)
      .toFixed(diget)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    + suffix
}
