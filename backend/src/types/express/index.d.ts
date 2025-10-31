import type { UserDto } from "@backend/dtos/users/user.dto"

declare global {
    namespace Express {
        interface Request {
        user?: User
        }
    }
}