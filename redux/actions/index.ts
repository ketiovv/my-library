import firebase from "firebase";
import { USER_STATE_CHANGE } from "../constants";


export const fetchUser = () => {
    return ((dispatch:any) => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
          firebase.firestore().collection("users").doc(user.uid).get().then((snapshot)=>{
              if(snapshot.exists){
                  console.log(snapshot.data());
                  
                  dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
              } else {
                  console.log("does not exist");
              }
          });
        }
    });
}