'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 数据库
  // 会辅助我们将定义好的 Model 对象加载到 app 和 ctx 上
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
