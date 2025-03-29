declare interface SignInParams {
    email: string;
    idToken: string;
}

declare interface User {
    id: string;
    name: string;
    email: string;
    profileURL?: string;
    resumeURL?: string;
}

declare interface UserData {
    email: string;
    id: string;
    name: string;
    profilePicture: string;
}
