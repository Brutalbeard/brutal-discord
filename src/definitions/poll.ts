import UserInfo from "./user-info"
import VotingOption from "./voting-option"

export default interface Poll {
    poll_id: String,
    poll_author: UserInfo,
    room: String,
    question: String,
    voting_options: VotingOption[],
    created_at: Date,
    updated_at: Date,
    deleted: boolean
}