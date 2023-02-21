"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = exports.ROLES_KEY = exports.Role = void 0;
const common_1 = require("@nestjs/common");
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["ALL"] = "*";
})(Role = exports.Role || (exports.Role = {}));
exports.ROLES_KEY = 'roles';
const RBAC = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.RBAC = RBAC;
//# sourceMappingURL=roles.decorator.js.map