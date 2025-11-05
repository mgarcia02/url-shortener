import UserDto from "@backend/dtos/user.dto"

interface signInResult {
    id: number
    userDto: UserDto
}

interface SignupResult {
    id: number
    userDto: UserDto
}

export { signInResult, SignupResult }