import UserInfo from "./user-info";

export default interface Event {
    organizer?: UserInfo,
    title?: String,
    date?: Date,
    description?: String
    created_at?: Date,
    updated_at?: Date,
    room: String
}