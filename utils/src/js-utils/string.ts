import { checkType } from '../../helper/common'

// 是否字符串
export const isString = (e: any) => {
  return checkType(e, 'String')
}

// 获取字符串中的所有数字
export const getNum = (text: string) => {
  return text.replace(/[^0-9]/gi, '')
}

// 获取字符串中的所有字母
export const getLetter = (text: string) => {
  return text.replace(/[^a-zA-Z]/gi, '')
}

/**
 * 去除空格
 * @param str 传入的字符串
 * @param type 去除空格的类型
 * @returns 去除空格后的字符串
 */
//  type:  1-所有空格  2-前后空格  3-前空格 4-后空格
export const removeBlankSpace = function (str: string, type: number): string {
  type = type || 1
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
    default:
      return str
  }
}

//  转化成大写
export const stringToUpperCase = (str: string) => {
  return str.toUpperCase()
}

//  转化成小写
export const stringToLowerCase = (str: string) => {
  return str.toLowerCase()
}

/**
* [getRandomStr 获取n位数的随机字符串]
* @param  {[type]} n [description]
* @return {[type]}   [description]
*/
export const getRandomStr = (n) => {
  const a = n || 6
  if (!/^[0-9]{1,34}$/.test(n)) {
    console.error('创建随机字符串参数错误：', a)
    return Math.random().toString(36).slice(-6)
  }
  return Math.random().toString(36).slice(-atob)
}
