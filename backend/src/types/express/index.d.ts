import type { UserDto } from "@backend/dtos/user.dto"

declare global {
    namespace Express {
        interface Request {
        user?: User
        }
    }
}