/**
 * Interface for dumping user info
 */
export default interface UserInfo {
    id: string
    username: string
    bot: boolean
    system: boolean
    flags: any
    discriminator: number
    avatar?: string
    doots?: number
    appendages?: string[],
    searches?: string[]
}