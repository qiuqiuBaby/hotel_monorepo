export class EnumFactoryClass {
  labels: any
  codes: any
  descs: any
  name: any
  enums: any

  constructor(name: any = '', enums: any = {}, handle: any = {}) {
    // 为实例添加属性
    // 可选举对象的key集合
    this.labels = []
    // 可选举对象value中的code集合
    this.codes = []
    // 可选举对象value中的desc集合
    this.descs = []
    // 为实例对象起名
    this.name = name
    // 备份可枚举对象
    this.enums = enums

    // 获取可枚举对象所有 key
    for (const key in enums) {
      this.labels.push(key)
      this.codes.push(enums[key].code)
      this.descs.push(enums[key].desc)
    }

    // 为实例对象添加自定义扩展方法
    for (const key in handle) {
      ;(this as any)[key] = handle[key]
    }
  }

  // 可动态添加可枚举对象 => 合并到总枚举对象中
  createItem(enums: any = {}) {
    for (const key in enums) {
      this.labels.push(key)
      this.codes.push(enums[key].code)
      this.descs.push(enums[key].desc)
    }
    Object.assign(this.enums, enums)
  }

  // 根据 label 获取枚举项
  getEnumByLabel(label: string) {
    return this.enums[label]
  }

  // 根据 code 获取枚举项
  getEnumByCode(code: string | number) {
    const idx = this.codes.indexOf(code)
    if (idx === -1) return undefined
    const label = this.labels[idx]
    return this.getEnumByLabel(label)
  }

  // 根据 desc 获取 枚举项
  getEnumByDesc(desc: string) {
    const idx = this.descs.indexOf(desc)
    if (idx === -1) return undefined
    const label = this.labels[idx]
    return this.getEnumByLabel(label)
  }

  // 根据 code 或者 label 获取枚举项
  getEnumByCodeOrLabel(key: string) {
    const idx = this.codes.indexOf(key)
    let label
    if (idx === -1) {
      label = key
    } else {
      label = this.labels.indexOf(idx)
    }
    return this.getEnumByLabel(label)
  }

  // 根据 code 获取 label
  getLabelByCode(code: string | number) {
    const idx = this.codes.indexOf(code)
    if (idx === -1) return undefined
    return this.labels[idx]
  }

  // 根据 code 获取 desc
  getDescByCode(code: string | number) {
    const idx = this.codes.indexOf(code)
    if (idx === -1) return undefined
    return this.descs[idx]
  }

  // 根据 label 获取 code
  getCodeByLabel(label: string) {
    const idx = this.labels.indexOf(label)
    if (idx === -1) return undefined
    return this.codes[idx]
  }

  // 根据 label 获取 desc
  getDescByLabel(label: string) {
    const idx = this.labels.indexOf(label)
    if (idx === -1) return undefined
    return this.descs[idx]
  }

  // 根据 desc 获取 code
  getCodeByDesc(desc: string) {
    const idx = this.descs.indexOf(desc)
    if (idx === -1) return undefined
    return this.codes[idx]
  }

  // 根据 desc 获取label
  getLabelByDesc(desc: string) {
    const idx = this.descs.indexOf(desc)
    if (idx === -1) return undefined
    return this.labels[idx]
  }
}
