import { checkType } from '../../helper/common'

// 是否数字
export const isNumber = (e: any) => {
  return checkType(e, 'Number')
}

// 判断是否为整数数字
export const isInteger = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n) && n % 1 === 0
}

// 是否为非负数字
export const isNoMinusNumber = (data) => {
  return /^\d+(\.\d+)?$/.test(data)
}

// 判断是否为保留两位小数的数字
export const isPusMinusNumber = (data) => {
  return /^[+\-]?\d+(.\d{2})?$/.test(data)
}

/**
 * 精度格式化，根据传入的数字转成带精度显示的String，默认两位
 * @param number Number 原数字值
 * @param precision Number 精度，默认2
 * @returns string
 */
export const formatPrecision = (number, precision = 2): string => {
  if (isNaN(number))
    number = 0

  const m = 10 ** precision
  const roundNum = Math.round(number * m) / m
  let roundStr = roundNum.toString()
  let dotIndex = roundStr.indexOf('.')
  if (dotIndex < 0) {
    dotIndex = roundStr.length
    roundStr += '.'
  }
  while (roundStr.length <= dotIndex + precision)
    roundStr += '0'

  return roundStr
}

// 加
export const floatAdd = (arg1, arg2) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  const m = 10 ** Math.max(r1, r2)
  return (arg1 * m + arg2 * m) / m
}

// 减
export const floatSub = (arg1, arg2) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  const m = 10 ** Math.max(r1, r2)
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘
export const floatMul = (arg1, arg2) => {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  }
  catch {
    console.error(m)
  }
  try {
    m += s2.split('.')[1].length
  }
  catch {
    console.error(m)
  }
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', '')))
    / 10 ** m
  )
}

// 除
export const floatDiv = (arg1, arg2) => {
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  }
  catch {
    console.error(t1)
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  }
  catch {
    console.error(t2)
  }
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * 10 ** (t2 - t1)
}

// 获取随机N位数
export const MathRand = (count: number): string => {
  let Num = ''
  for (let i = 0; i < count; i++)
    Num += Math.floor(Math.random() * 10)

  return Num
}
