/**
 *  内部用的公共方法,不导出至外部
 */

export const checkType = (value, type) => {
  return Object.prototype.toString.call(value).slice(8, -1) === type
}
