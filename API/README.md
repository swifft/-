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
| :------- | -------- | -------- |
| nikename | 昵称     | 不能为空 |
| name     | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |
| role     | 身份     | 不能为空 |
- 响应参数

| 参数名              | 参数说明         | 备注                                              |
| ------------------- | :--------------- | ------------------------------------------------- |
| nikename            | 昵称             | 默认： null                                       |
| name                | 实名认证姓名     | 默认： null                                       |
| password            | 用户密码         | 非对称哈希加密                                    |
| sex                 | 用户性别         | 默认：男                                          |
| schoolnumber        | 学号             | 默认： null                                       |
| college             | 学院             | 默认： null                                       |
| avatar              | 头像             | 默认：http://gxnudsl.xyz/images/default.png       |
| role                | 角色             | 默认： 普通用户        角色类型：普通用户，管理员 |
| attestation         | 用户上传认证图片 | 默认： null                                       |
| isattestation       | 是否认证         | 默认： 0 ，  “0”表示未认证，“1”表示已认证         |
| attestationFailInfo | 认证失败信息     | 默认： null                                       |
| create_time         | 创建时间         | 系统生成                                          |
| update_time         | 更新时间         | 系统生成                                          |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "注册成功",
    "res_info": {
        "sex": "未知",
        "_id": "5efae1140abb7023ecb8b777",
        "nickname": "缘",
        "name": null,
        "password": "$2a$10$S6xA4GdBNbZ2g7DsyLo75.0hmypZa2rw.JiXoGSHiUu7L3n1HUqri",
        "schoolnumber": "201712300111",
        "college": null,
        "avatar": "http://121.36.94.53/images/default.png",
        "role": "学生",
        "attestation": null,
        "isattestation": 0,
        "attestationFailInfo": null,
        "create_time": "2020-06-30T06:52:04.161Z",
        "update_time": "2020-06-30T06:52:04.161Z",
        "__v": 0
    }
}
```

### 1.2.2.用户登录

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| account  | 昵称或者学号 | 不能为空 |
| password | 密码         | 不能为空 |
- 响应参数

| 参数名              | 参数说明         | 备注                                          |
| ------------------- | :--------------- | --------------------------------------------- |
| _id                 | 唯一标识符       | 系统生成                                      |
| name                | 用户名           | 默认： null                                   |
| password            | 用户密码         | 非对称哈希加密                                |
| email               | 邮箱             | 默认： null                                   |
| sex                 | 用户性别         | 默认：男                                      |
| schoolnumber        | 学号             | 默认： null                                   |
| college             | 学院             | 默认： null                                   |
| avatar              | 头像             | 默认：http://gxnudsl.xyz/images/default.png   |
| role                | 角色             | 默认： 普通用户        角色类型：学生，辅导员 |
| attestation         | 用户上传认证图片 | 默认： null                                   |
| isattestation       | 是否认证         | 默认： 0 ，  “0”表示未认证，“1”表示已认证     |
| attestationFailInfo | 认证失败信息     | 默认： null                                   |
| token               | token令牌        | token认证                                     |
| create_time         | 创建时间         | 系统生成                                      |
| update_time         | 更新时间         | 系统生成                                      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "登陆成功",
    "res_info": {
        "sex": "男",
        "_id": "5efae1140abb7023ecb8b777",
        "nickname": "缘",
        "name": "小林子",
        "password": "$2a$10$S6xA4GdBNbZ2g7DsyLo75.0hmypZa2rw.JiXoGSHiUu7L3n1HUqri",
        "schoolnumber": "201712300111",
        "college": "计算机科学与信息工程学院/软件学院",
        "avatar": "http://121.36.94.53/images/default.png",
        "role": "学生",
        "attestation": null,
        "isattestation": 2,
        "attestationFailInfo": null,
        "create_time": "2020-06-30T06:52:04.161Z",
        "update_time": "2020-06-30T06:53:56.652Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmFlMTE0MGFiYjcwMjNlY2I4Yjc3NyIsInRpbWUiOiIyMDIwLTA2LTMwVDA2OjU0OjQ4LjE5N1oiLCJpYXQiOjE1OTM1MDAwODgsImV4cCI6MTYwMzg2ODA4OH0.PlZYSzGtqZ5kl5vwj5ObcDhh8YaCyTAw2RSE_QIvJj0"
}
```

### 1.2.3.用户信息修改

- 请求路径：userEdit
- 请求方法：post
- 请求参数

| 参数名        | 参数说明     | 备注     |
| ------------- | ------------ | -------- |
| id            | 用户id       | 不能为空 |
| sex           | 头像         |          |
| name          | 实名认证姓名 |          |
| college       | 学号         |          |
| isattestation | 学院         |          |
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
        "_id": "5efae1140abb7023ecb8b777",
        "nickname": "缘",
        "name": "小林子",
        "password": "$2a$10$S6xA4GdBNbZ2g7DsyLo75.0hmypZa2rw.JiXoGSHiUu7L3n1HUqri",
        "schoolnumber": "201712300111",
        "college": "计算机科学与信息工程学院/软件学院",
        "avatar": "http://121.36.94.53/images/default.png",
        "role": "学生",
        "attestation": null,
        "isattestation": 2,
        "attestationFailInfo": null,
        "create_time": "2020-06-30T06:52:04.161Z",
        "update_time": "2020-06-30T06:53:56.652Z",
        "__v": 0
    }
}
```

### 1.2.4.用户认证信息提交

- 请求路径：attestationInfo
- 请求方法：post
- 请求参数

| 参数名        | 参数说明 | 备注     |
| ------------- | -------- | -------- |
| id            | 用户id   | 不能为空 |
| attestation   | 头像     | 不能为空 |
| isattestation | 学院     | 不能为空 |
- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "更新成功",
    "res_info": null
}
```

### 1.2.5.用户头像上传

- 请求路径：avatarUpload
- 请求方法：post
- 请求参数：无
- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{errMsg: "uploadFile:ok", statusCode: 200, data: "{"msg":"上传成功","data":{"url":"http://gxnudsl.xyz/ru…aifashixun/upload/avatarImg/file-1593501232051"}}"}
```

### 1.2.6.用户头像信息修改

- 请求路径：userInfoEdit
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 用户id   | 不能为空 |
| avatar | 头像     | 不能为空 |
- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "更新成功",
    "res_info": null
}
```

### 1.2.7.用户信息查询

- 请求路径：getUserInfo
- 请求方法：get

- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "查询成功",
    "res_info": [
        {
            "sex": "男",
            "_id": "5ef5cef614d58110a01b77d7",
            "nickname": "小胖子",
            "name": "邓世林",
            "password": "$2a$10$5QH1UCTsJ4nJJAgKnH2br.AHFIJ.hIfrddSowk.Ayo5FWQuNpSJE.",
            "schoolnumber": "201712300166",
            "college": "计算机科学与信息工程学院/软件学院",
            "avatar": "http://gxnudsl.xyz/ruanjiankaifashixun/upload/avatarImg/wx98c5e1eece849cd0.o6zAJs9Jl7Y708i9jY8QwPLGstcQ.ZCKAQwVQ9xC367802f91db3f238df128cfea7f4c8ebc.png",
            "role": "学生",
            "attestation": "邓世林&201712300166&http://gxnudsl.xyz/ruanjiankaifashixun/upload/attestationImg/wx98c5e1eece849cd0.o6zAJs9Jl7Y708i9jY8QwPLGstcQ.KkX0ZKfUNnsu1b9d17922d32c15ebe645c25cc5780f2.jpg",
            "isattestation": 2,
            "attestationFailInfo": null,
            "create_time": "2020-06-26T10:33:26.334Z",
            "update_time": "2020-06-26T10:36:53.835Z",
            "__v": 0
        },
        {
            "sex": "男",
            "_id": "5ef5cf2c14d58110a01b77d8",
            "nickname": "小孩子",
            "name": "莫瑞",
            "password": "$2a$10$sEN/i7LUuEQ2d8URnfRyde8CMqKLkbN3TIWwMatfdT4TguxxH9I2y",
            "schoolnumber": "201712300160",
            "college": "计算机科学与信息工程学院/软件学院",
            "avatar": "http://gxnudsl.xyz/ruanjiankaifashixun/upload/avatarImg/wx98c5e1eece849cd0.o6zAJs9Jl7Y708i9jY8QwPLGstcQ.1HH8AZDxivMVb94b88841e52960ca2fa898e658bd54e.png",
            "role": "辅导员",
            "attestation": "莫瑞&201712300160&http://gxnudsl.xyz/ruanjiankaifashixun/upload/attestationImg/wx98c5e1eece849cd0.o6zAJs9Jl7Y708i9jY8QwPLGstcQ.UlizVg8NcYfb5af3953fd14b3a05e1ecaa64a8476ade.jpg",
            "isattestation": 2,
            "attestationFailInfo": null,
            "create_time": "2020-06-26T10:34:20.266Z",
            "update_time": "2020-06-26T10:35:59.967Z",
            "__v": 0
        }
    ]
}
```

### 1.2.8.特定用户信息查询

- 请求路径：getUserInfoById
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 用户id   | 不能为空 |
- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "查询成功",
    "res_info": {
        "sex": "男",
        "_id": "5efae1140abb7023ecb8b777",
        "nickname": "缘",
        "name": "小林子",
        "password": "$2a$10$S6xA4GdBNbZ2g7DsyLo75.0hmypZa2rw.JiXoGSHiUu7L3n1HUqri",
        "schoolnumber": "201712300111",
        "college": "计算机科学与信息工程学院/软件学院",
        "avatar": "http://gxnudsl.xyz/ruanjiankaifashixun/upload/avatarImg/file-1593501766106",
        "role": "学生",
        "attestation": null,
        "isattestation": 2,
        "attestationFailInfo": null,
        "create_time": "2020-06-30T06:52:04.161Z",
        "update_time": "2020-06-30T07:22:43.545Z",
        "__v": 0
    }
}
```

### 1.2.9.用户身份类型统计

- 请求路径：totle
- 请求方法：get

- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "提交成功",
    "res_info": [
        {
            "身份": "学生",
            "人数": 7
        },
        {
            "身份": "辅导员",
            "人数": 4
        },
        {
            "身份": "副书记",
            "人数": 1
        },
        {
            "身份": "书记",
            "人数": 1
        },
        {
            "身份": "教务处",
            "人数": 1
        }
    ]
}
```

### 1.2.10.用户认证失败

- 请求路径：attestationFailInfo
- 请求方法：post
- 请求参数

| 参数名              | 参数说明       | 备注     |
| ------------------- | -------------- | -------- |
| _id                 | 用户id         | 不能为空 |
| attestationFailInfo | 认证失败的信息 | 不能为空 |
| isattestation       | 认证状态       | 不能为空 |
- 响应参数


| 参数名      | 参数说明 | 备注 |
| ----------- | :------- | ---- |
| status_code | 状态码   |      |
| msg         | 提示信息 |      |
| res_info    | 返回数据     |      |

- 响应数据

```json
{
    "status_code": 200,
    "msg": "提交成功",
    "res_info": {
        "sex": "男",
        "_id": "5efae1140abb7023ecb8b777",
        "nickname": "缘",
        "name": "小林子",
        "password": "$2a$10$S6xA4GdBNbZ2g7DsyLo75.0hmypZa2rw.JiXoGSHiUu7L3n1HUqri",
        "schoolnumber": "201712300111",
        "college": "计算机科学与信息工程学院/软件学院",
        "avatar": "http://gxnudsl.xyz/ruanjiankaifashixun/upload/avatarImg/file-1593501766106",
        "role": "学生",
        "attestation": null,
        "isattestation": null,
        "attestationFailInfo": "不符合",
        "create_time": "2020-06-30T06:52:04.161Z",
        "update_time": "2020-06-30T07:44:07.896Z",
        "__v": 0
    }
}
```