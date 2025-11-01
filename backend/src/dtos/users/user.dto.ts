import UrlDto from "../urls/url.dto"

type UserDto = {
    userName: string
    email: string
    createdAt: Date
    urls?: UrlDto[]
}

export default UserDto