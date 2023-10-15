import { checkType } from '../../helper/common'

// 是否数组
export const isArray = (e: any) => {
  return checkType(e, 'Array')
}
