// 获取url中的参数合集
interface QueryObj {
  [key: string]: string
}

export const getQueryString = () => {
  const s = window.location.search
  const qs = new URLSearchParams(s)
  const obj: QueryObj = {}
  for (const p of qs.entries())
    obj[p[0]] = p[1]

  return obj
}

/**
 * 查询地址中的某个参数
 * @param name
 */
export const getOneQueryString = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const search = window.location.href.split('?')[1] || ''
  const r = search.match(reg) || []
  return r[2] ? unescape(r[2]) : undefined
}

/**
 * 删除url地址某一个参数
 * @param url
 */
export const urlDelParam = (url: string, name: string) => {
  const urlArr = url.split('?')
  if (urlArr.length > 1 && urlArr[1].includes(name)) {
    const query = urlArr[1]
    const obj = {}
    const arr = query.split('&') as any[];
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      obj[arr[i][0]] = arr[i][1]
    }
    delete obj[name]
    const urlte
      = `${urlArr[0]
      }?${
      JSON.stringify(obj)
        .replace(/[\"\{\}]/g, '')
        .replace(/\:/g, '=')
        .replace(/\,/g, '&')}`
    return urlte
  }
  else {
    return url
  }
}

/**
 * 添加url地址某一个参数
 * @param url
 */
export const updateQueryStringParameter = (uri: string, key: string, value: string) => {
  if (!value)
    return uri

  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i')
  const separator = uri.includes('?') ? '&' : '?'
  if (uri.match(re))
    return uri.replace(re, `$1${key}=${value}$2`)

  else
    return `${uri + separator + key}=${value}`
}

/**
 * 转换url
 * @param target 将url中包含的mark替换成的目标字符
 * @param mark 要被替换的字符
 * @returns
 */
export const convertUrl = (target: string, mark: string): string => {
  const selfUrl = `${window.location.protocol}//${window.location.host}${window.location.port}`
  let url = ''
  if (selfUrl.includes(mark))
    url = selfUrl.replace(new RegExp(mark, 'ig'), target)

  return url
}

/* 构建域名  */
export const buildDomain = () => {
  const host = window.location.host
  const index = parseInt(String(host.indexOf('.flightroutes24')))
  let domain = 'local'
  let condition = 'local'
  if (index > -1) {
    domain = host.substring(index)
    const urlTemp = host.substring(0, index)
    const devCondition = urlTemp.substring(urlTemp.indexOf('www') + 3)
    if (devCondition !== '')
      condition = devCondition

    else
      condition = ''
  }
  return {
    domain,
    condition,
    host: `${window.location.protocol}//${location.host}`,
  }
}
