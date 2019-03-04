/**
 * Interface for dumping user info
 */
export default interface UserInfo {
    id: string,
    username: string,
    bot: boolean,
    avatar?: string
    avatarURL?: string,
    doots?: number,
    appendages?: string[]
}