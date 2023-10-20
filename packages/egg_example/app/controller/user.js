const { Controller } = require('egg');

class UserController extends Controller {
  async users() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data: [
        {
          id: '1',
          name: '张三',
          age: 13,
        },
        {
          id: '2',
          name: '李四',
          age: 67,
        },
        {
          id: '3',
          name: '王五',
          age: 23,
        },
      ],
      msg: '操作成功',
    };
  }

  async findByIdParams() {
    const { ctx } = this;
    const userId = Number(ctx.params.id);
    const userlist = [
      {
        id: 1,
        name: '张三',
        age: 13,
      },
      {
        id: 2,
        name: '李四',
        age: 67,
      },
      {
        id: 3,
        name: '王五',
        age: 23,
      },
    ];
    const result = userlist.find(item => item.id === userId);
    ctx.body = {
      code: 200,
      data: result,
      msg: '操作成功',
    };
  }

  async findByIdQuery() {
    const { ctx } = this;
    const userId = ctx.query.id;
    const userlist = [
      {
        id: '1',
        name: '张三',
      },
      {
        id: '2',
        name: '李四',
      },
      {
        id: '3',
        name: '王五',
      },
    ];
    const result = userlist.find(v => v.id === userId);
    ctx.body = {
      code: 200,
      data: result,
      msg: '操作成功',
    };
  }

  // post
  async createUser() {
    const { ctx } = this;
    console.log(ctx.request.body, 'bodyield...1');
    const result = {
      username: ctx.request.body.userName,
      age: ctx.request.body.age,
    };
    ctx.body = {
      code: 200,
      data: result,
      msg: '操作成功',
    };
  }
}
module.exports = UserController;
