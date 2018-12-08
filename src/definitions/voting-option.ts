import UserInfo from "./user-info";

export default interface VotingOption {
    option: String,
    voters?: UserInfo[]
}