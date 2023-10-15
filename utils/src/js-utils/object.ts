import { checkType } from '../../helper/common'

// 是否对象
export const isObject = (e: any) => {
  return checkType(e, 'Object')
}
