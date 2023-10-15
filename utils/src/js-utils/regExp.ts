import { checkType } from '../../helper/common'

// 是否正则
export const isRegExp = (e: any) => {
  return checkType(e, 'RegExp')
}

/**
 * 正则校验各个类型
 * @param type 校验的类型
 * @param value 需被验证的值
 * @param FrRegExps 每个类型对应的正则判断
 * @returns
 */
type RegExpType = 'phone' | 'email' | 'supplierCode' | 'airlinesCode'

export const FrRegExps = {
  phone: /^1[3456789]\d{9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  supplierCode: /^[A-Z]{3}$/, // 限定三个大写字母
  airlinesCode: /^[A-Z0-9]{2}$/, // 限定两个字符长度，并且只能由大写字母和数字组成
}
export const regExpCheck = (type: RegExpType, value: string): Boolean => {
  if (!FrRegExps[type])
    throw new Error('传入类型错误')
  return FrRegExps[type].test(value)
}
