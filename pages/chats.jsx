import React,{useRef,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { ChatEngine } from 'react-chat-engine'
import auth from '../utils/firebase'
import useAuth from '../pages/contexts/AuthContext'
import axios from 'axios'
const Chats = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const {user} = useAuth()
    const handleLogout = async()=>{
        await auth.signOut()
        router.push('/')
    }

    const getFile = async(url)=>{
        const response = await fetch(url);
        const data = await response.blob()
        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }

    useEffect(()=>{
        console.log(user)
        if(!user){
            router.push('/')
            return;
        }
        axios.get('https://api.chatengine.io/users/me/',{
            headers:{
                "project-id":"3e8d5958-165e-40cc-9c2c-b41fa2e811b7",
                "user-name":user.email,
                "user-secret":user.uid
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email)
            formdata.append('username',user.email)
            formdata.append('secret',user.uid)
            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar',avatar, avatar.name)
                axios.post('https://api.chatengine.io/users/',
                formdata,
                {headers:{"private-key":"d6bbf550-4cb4-42f4-80f2-5c4c52f1ced5"}})
                .then(()=>setLoading(false))
                .catch((error)=>console.log(error))
            })

        })
    },[user,router])

    if(!user || loading) return "Loading..."
  return (
    <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">
                গল্পসল্প
            </div>
            <div className="logout-tab"
            onClick={handleLogout}>
                Logout
            </div>
        </div>
        <ChatEngine 
        height="calc(100vh-66px)"
        projectID="3e8d5958-165e-40cc-9c2c-b41fa2e811b7"
        userName={user.email}
        userSecret={user.uid}
        />

    </div>
  )
}

export default Chats