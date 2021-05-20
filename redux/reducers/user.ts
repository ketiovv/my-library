import firebase from "firebase";
import { AnyAction } from "redux";

interface User {
    email:string;
}

interface TestState {
    currentUser: User | null;
}

const initialState: TestState = {
    currentUser: null
}
export const user = (state = initialState, action: AnyAction) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}