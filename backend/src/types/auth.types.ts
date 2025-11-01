import UserDto from "@backend/dtos/user.dto"

interface LoginResult {
    id: number
    userDto: UserDto
}

interface SignupResult {
    id: number
    userDto: UserDto
}

export { LoginResult, SignupResult }