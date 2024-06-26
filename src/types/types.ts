export type PostType = {
    id: number
    message: string
    name: string
    likesCount: number
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type  ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string | null
}

export type UserType = {
    followed: boolean
    id: number
    name: string
    photos: PhotosType
    status: string | null
    /*uniqueUrlName: string | null*/
}
export type DialogType = {
    id: number
    name: string
    imgUrl: string | null
}
export type MessageType = {
    id: number
    message: string
}