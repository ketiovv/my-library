import firebase from "firebase";
import { AnyAction } from "redux";

interface User {
    email:string;
}

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null
}
export const user = (state = initialState, action: AnyAction) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}