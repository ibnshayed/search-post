/* eslint-disable */
export default async () => {
    const t = {
        ["./common/enums/role.enum"]: await import("./common/enums/role.enum"),
        ["./common/enums/gender.enum"]: await import("./common/enums/gender.enum"),
        ["./common/enums/permission.enum"]: await import("./common/enums/permission.enum")
    };
    return { "@nestjs/swagger": { "models": [[import("./common/dtos/paginate.dto"), { "PaginateDto": { page: { required: true, type: () => Number, minimum: 1 }, limit: { required: true, type: () => Number, maximum: 100 } } }], [import("./modules/auth/dto/login.dto"), { "LoginDto": { username: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 } } }], [import("./modules/auth/dto/refresh-tocken.dto"), { "RefreshTokenDto": { refreshToken: { required: true, type: () => String } } }], [import("./modules/user/dto/create-user.dto"), { "CreateUserDto": { username: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, mobile: { required: true, type: () => String }, email: { required: true, type: () => String }, nid: { required: true, type: () => String }, address: { required: true, type: () => String }, role: { required: true, enum: t["./common/enums/role.enum"].RoleEnum }, gender: { required: true, enum: t["./common/enums/gender.enum"].GenderEnum }, permissions: { required: true, enum: t["./common/enums/permission.enum"].PermissionEnum, isArray: true } } }], [import("./modules/user/dto/find-one-user.dto"), { "FindOneUserDto": { id: { required: true, type: () => String } } }], [import("./modules/user/dto/paginate-user.dto"), { "PaginateUserDto": {} }], [import("./modules/user/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./modules/auth/entities/auth.entity"), { "Auth": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./modules/auth/auth.controller"), { "AuthController": { "login": { type: Object }, "refreshToken": { type: Object } } }], [import("./modules/post/post.controller"), { "PostController": { "searchPost": { type: Object } } }], [import("./modules/user/user.controller"), { "UserController": { "create": {}, "findAll": { type: [Object] }, "findOne": { type: Object } } }]] } };
};