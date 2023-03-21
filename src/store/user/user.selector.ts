import { User as FirebaseUser } from "firebase/auth"

interface RootState {
  user: {
    currentUser: FirebaseUser
  }
}

export const selectCurrentUser = (state: RootState) => state.user.currentUser