import { UserRole } from "../types/enums/user-role";

export const Permission: unknown = {
    [UserRole.EMPLOYEE]: ['can_write', 'can_read'],
    [UserRole.ADMIN]: ['can_write', 'can_read', 'can_access_admin'],
}