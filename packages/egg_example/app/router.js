'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/info', controller.user.users);
  // params获取参数
  router.get('/user/findByIdParams/:id', controller.user.findByIdParams);
  // Query String 方式获取参数
  router.get('/user/findByIdQuery', controller.user.findByIdQuery);
  router.post('/user/createUser', controller.user.createUser);
};
