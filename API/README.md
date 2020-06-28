# 软件开发实训 API 接口文档

## 1.1.接口说明

- 接口基准地址：`https://gxnudsl.xyz/api`
- 服务端已开启 CORS 跨域支持
- API 认证统一使用 Token 认证
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- DELETE（DELETE）：从服务器删除资源。

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 服务器内部错误                                            |                                               |

------

## 1.2. 用户模块

##### 	接口地址：user

------

### 1.2.1.用户注册

- 请求路径：register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| name     | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |
| email    | 邮箱     | 不能为空 |
- 响应参数

| 参数名        | 参数说明         | 备注                                              |
| ------------- | :--------------- | ------------------------------------------------- |
| name          | 用户名           |                                                   |
| password      | 用户密码         | 非对称哈希加密                                    |
| email         | 邮箱             | 邮箱唯一，且不可更改                              |
| sex           | 用户性别         | 默认：男                                          |
| schoolnumber  | 学号             | 默认： null                                       |
| college       | 学院             | 默认： null                                       |
| avatar        | 头像             | 默认：http://gxnudsl.xyz/images/default.png       |
| role          | 角色             | 默认： 普通用户        角色类型：普通用户，管理员 |
| attestation   | 用户上传认证图片 | 默认： null                                       |
| isattestation | 是否认证         | 默认： 0 ，  “0”表示未认证，“1”表示已认证         |
| create_time   | 创建时间         | 系统生成                                          |
| update_time   | 更新时间         | 系统生成                                          |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "注册成功",
    "res_info": {
        "sex": "男",
        "_id": "5ed72f4290d4132a08cfa540",
        "name": "admin",
        "password": "$2a$10$ubQKPfr0z2S.xNQzEu22/OZXj8aOquB096/90Ob6jCOKrz0gpAysq",
        "email": "1123512653@qq.com",
        "schoolnumber": null,
        "college": null,
        "avatar": "http://121.36.94.53/images/default.png",
        "role": "普通用户",
        "attestation": null,
        "isattestation": 0,
        "create_time": "2020-06-03T05:04:02.733Z",
        "update_time": "2020-06-03T05:04:02.733Z",
        "__v": 0
    }
}
```

### 1.2.2.用户登录

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明       | 备注     |
| -------- | -------------- | -------- |
| account  | 用户名或者邮箱 | 不能为空 |
| password | 密码           | 不能为空 |
- 响应参数

| 参数名        | 参数说明         | 备注                                              |
| ------------- | :--------------- | ------------------------------------------------- |
| name          | 用户名           |                                                   |
| password      | 用户密码         | 非对称哈希加密                                    |
| email         | 邮箱             | 邮箱唯一，且不可更改                              |
| sex           | 用户性别         | 默认：男                                          |
| schoolnumber  | 学号             | 默认： null                                       |
| college       | 学院             | 默认： null                                       |
| avatar        | 头像             | 默认：http://gxnudsl.xyz/images/default.png       |
| role          | 角色             | 默认： 普通用户        角色类型：普通用户，管理员 |
| attestation   | 用户上传认证图片 | 默认： null                                       |
| isattestation | 是否认证         | 默认： 0 ，  “0”表示未认证，“1”表示已认证         |
| token         | token令牌        | token认证（）                                     |
| create_time   | 创建时间         | 系统生成                                          |
| update_time   | 更新时间         | 系统生成                                          |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "登陆成功",
    "res_info": {
        "sex": "男",
        "_id": "5ed72f4290d4132a08cfa540",
        "name": "admin",
        "password": "$2a$10$ubQKPfr0z2S.xNQzEu22/OZXj8aOquB096/90Ob6jCOKrz0gpAysq",
        "email": "1123512653@qq.com",
        "schoolnumber": null,
        "college": null,
        "avatar": "http://121.36.94.53/images/default.png",
        "role": "普通用户",
        "attestation": null,
        "isattestation": 0,
        "create_time": "2020-06-03T05:04:02.733Z",
        "update_time": "2020-06-03T05:04:02.733Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDcyZjQyOTBkNDEzMmEwOGNmYTU0MCIsInRpbWUiOiIyMDIwLTA2LTAzVDA1OjI1OjE0Ljc1M1oiLCJpYXQiOjE1OTExNjE5MTQsImV4cCI6MTYwMTUyOTkxNH0.029hiv13_j7Zwm3xHOs6ztVTgcyLWWN6KEdeRJm-u3E"
}
```

### 1.2.2.用户信息修改

- 请求路径：edit
- 请求方法：post
- 请求参数

| 参数名       | 参数说明 | 备注     |
| ------------ | -------- | -------- |
| id           | 用户id   | 不能为空 |
| avatar       | 头像     |          |
| schoolnumber | 学号     |          |
| college      | 学院     |          |
- 响应参数


| 参数名        | 参数说明         | 备注                 |
| ------------- | :--------------- | -------------------- |
| name          | 用户名           |                      |
| password      | 用户密码         |                      |
| email         | 邮箱             | 邮箱唯一，且不可更改 |
| sex           | 用户性别         |                      |
| schoolnumber  | 学号             |                      |
| college       | 学院             |                      |
| avatar        | 头像             |                      |
| role          | 角色             |                      |
| attestation   | 用户上传认证图片 |                      |
| isattestation | 是否认证         |                      |
| create_time   | 创建时间         | 系统生成             |
| update_time   | 更新时间         | 系统生成             |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "更新成功",
    "res_info": {
        "sex": "男",
        "_id": "5ed72f4290d4132a08cfa540",
        "name": "0",
        "password": "$2a$10$ubQKPfr0z2S.xNQzEu22/OZXj8aOquB096/90Ob6jCOKrz0gpAysq",
        "email": "1123512653@qq.com",
        "schoolnumber": 0,
        "college": "0",
        "avatar": "0",
        "role": "普通用户",
        "attestation": null,
        "isattestation": 0,
        "create_time": "2020-06-03T05:04:02.733Z",
        "update_time": "2020-06-05T01:07:55.904Z",
        "__v": 0
    }
}
```