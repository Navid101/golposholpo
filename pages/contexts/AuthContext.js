import React, {useContext,useState,useEffect} from "react";
import auth from "../../utils/firebase";
import { useRouter } from 'next/router'

const AuthContext = React.createContext();

export const useAuth = ()=> useContext(AuthContext);

export const AuthProvider = ({children})=>{
    const router = useRouter()
    const {pid} = router.query
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
            if(user){
                router.push('/chats')
            }
        })
    },[user,pid])
    const value = {user};
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

