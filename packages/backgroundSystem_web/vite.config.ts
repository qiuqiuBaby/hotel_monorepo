import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入vue中hook reactive ref等
import Components from 'unplugin-vue-components/vite' //自动导入ui-组件 比如说ant-design-vue  element-plus等
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // 对应组件库引入 ，AntDesignVueResolver



// import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    //element按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [
        // 配置elementPlus采用sass样式配置系统
        ElementPlusResolver({ importStyle: 'sass' })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      // 自动导入定制化样式进行文件覆盖
      scss: {
        additionalData: `@use "@/assets/element/index.scss" as *;`
      }
    }
  }
})
