import { checkType } from '../../helper/common'

// 是否布尔
export const isBoolean = (e: any) => {
  return checkType(e, 'Boolean')
}

// 是否函数
export const isFunction = (e: any) => {
  return checkType(e, 'Function')
}

// 是否为null
export const isNull = (e: any) => {
  return checkType(e, 'Null')
}

// 是否为undefined
export const isUndefined = (e: any) => {
  return checkType(e, 'Undefined')
}

// 是否时间
export const isDate = (e: any) => {
  return checkType(e, 'Date')
}

// 是否为无意义值
export const isNullOrEmpty = (str: any) => {
  return str === null || str === undefined || str === ''
}

// 是否为无意义值包括0
export const isNullOrEmptyHasZero = (str: any) => {
  if (str === 0 || str === '0')
    return true
  return isNullOrEmpty(str)
}

// 防抖函数
export const debounce = (func, delay) => {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // @ts-ignore TODO: remove
      func.apply(this, args);
    }, delay)
  }
}

// 节流函数
export const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0

  return function (...args) {
    const currentTime = Date.now()
    const remainingTime = delay - (currentTime - lastExecTime)

    clearTimeout(timeoutId)

    if (remainingTime <= 0) {
      // @ts-ignore TODO: remove
      func.apply(this, args);
      lastExecTime = currentTime;
    }
    else {
      timeoutId = setTimeout(() => {
        // @ts-ignore TODO: remove
        func.apply(this, args);
        lastExecTime = Date.now();
      }, remainingTime)
    }
  }
}

/**
 * 拷贝文本到剪切板
 * @param { String } text 要拷贝的文字
 */
export const copyToClipboard = (text) => {
  if (text == null || text === '')
    return

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.focus()
  Object.assign(textArea.style, {
    'position': 'fixed',
    'top': '-10000px',
    'left': '-10000px',
    'z-index': -1,
    'width': '100px',
  })
  document.body.append(textArea)

  try {
    textArea.select()
    const ret = document.execCommand('copy')
    document.body.removeChild(textArea)
    if (!ret)
      console.error('>>> 拷贝文本未选中文本.')
  }
  catch (error) {
    console.error('<<< 改浏览器不支持 execCommand(\'copy\') 方法.')
  }
}

// 某个dom元素显示
export const showDom = (dom) => {
  const isDOM = (typeof HTMLElement === 'object')
    ? function (obj) {
      return obj instanceof HTMLElement
    }
    : function (obj) {
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    }
  if (!isDOM)
    throw new Error('传入参数不是一个dom')
  dom.style.display = 'block'
}

// 某个dom元素隐藏
export const hideDom = (dom) => {
  const isDOM = (typeof HTMLElement === 'object')
    ? function (obj) {
      return obj instanceof HTMLElement
    }
    : function (obj) {
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    }
  if (!isDOM)
    throw new Error('传入参数不是一个dom')
  dom.style.display = 'none'
}

/**
 *  设置本地缓存
 * @param key 缓存的关键字
 * @param value 缓存的值
 * @param shouldEncode 是否编码
 */
export const setLocalStorageItem = (key: string, value: string, shouldEncode: Boolean) => {
  if (typeof key === 'string' && typeof value !== 'undefined') {
    if (shouldEncode)
      value = encodeURIComponent(JSON.stringify(value))
    else
      value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }
  else {
    console.error('传入的参数无效。')
  }
}

/**
 *  读取一个本地缓存
 * @param key 缓存的关键字
 * @param shouldDecode 是否编码
 */
export const getLocalStorageItem = (key: string, shouldDecode: Boolean) => {
  if (typeof key === 'string') {
    let value = localStorage.getItem(key)
    if (value !== null) {
      if (shouldDecode)
        value = decodeURIComponent(value)

      try {
        return JSON.parse(value)
      }
      catch (e) {
        console.error('无法解析本地缓存项的值。')
      }
    }
  }
  else {
    console.error('传入的参数无效。')
  }
}

/**
 *  删除一个指定缓存
 * @param n 需删除的缓存的关键字
 */
export const deleteLocalStorage = (n) => {
  try {
    localStorage.removeItem(n)
  }
  catch (e) {
    console.warn('WARN : 删除localStorage错误 FUN : deleteLocalStorage()', e)
  }
}

// 显示千分制金融工具
export const setMoneyFormat = (value) => {
  // 转为字符串，并按照.拆分
  const arr = (`${value}`).split('.')
  // 整数部分再拆分
  const int = arr[0].split('')
  // 小数部分
  const fraction = arr[1] || ''
  // 返回的变量
  let r = ''
  int.reverse().forEach((v, i) => {
    // 非第一位并且是位值是3的倍数，添加“,”
    if (i !== 0 && i % 3 === 0) {
      r = `${v},${r}`
    }
    else {
      // 正常添加字符(这是好写法)
      r = v + r
    }
  })
  // 整数部分和小数部分拼接
  return r + (fraction ? `.${fraction}` : '')
}

// 序列化表单
export const serializeObject = (form) => {
  const formData = new FormData(form)
  const serializedObject = {}

  for (const [name, value] of formData.entries()) {
    // eslint-disable-next-line no-prototype-builtins
    if (serializedObject.hasOwnProperty(name)) {
      if (!Array.isArray(serializedObject[name]))
        serializedObject[name] = [serializedObject[name]]

      serializedObject[name].push(value)
    }
    else {
      serializedObject[name] = value
    }
  }

  return serializedObject
}

// 深拷贝
export const deepClone = (obj) => {
  // 定义一个变量 并判断是数组还是对象
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object' && obj != null) {
    // 判断obj存在并且是对象类型的时候 因为null也是object类型，所以要单独做判断
    for (const key in obj) {
      // 循环对象类型的obj
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        // 判断obj中是否存在key属性
        if (obj[key] && typeof obj[key] === 'object') {
          // 判断如果obj[key]存在并且obj[key]是对象类型的时候应该深拷贝，即在堆内存中开辟新的内存
          objClone[key] = deepClone(obj[key])
        }
        else {
          // 否则就是浅复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

// 加密函数
export const encrypt = (plaintext, key) => {
  let ciphertext = ''
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i]
    const charCode = char.charCodeAt(0)
    const encryptedCharCode = charCode + key
    const encryptedChar = String.fromCharCode(encryptedCharCode)
    ciphertext += encryptedChar
  }
  return ciphertext
}

// 解密函数
export const decrypt = (ciphertext, key) => {
  let plaintext = ''
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i]
    const charCode = char.charCodeAt(0)
    const decryptedCharCode = charCode - key
    const decryptedChar = String.fromCharCode(decryptedCharCode)
    plaintext += decryptedChar
  }
  return plaintext
}
