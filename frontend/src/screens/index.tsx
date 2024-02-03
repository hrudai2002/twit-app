import '../App.scss'; 
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';
import { environmentApi } from '../environment';
import { toast } from 'react-hot-toast';
import { NAVBAR, SelectedTabs } from '../enum';


// Components
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Messages from '../components/Messages';
import SideBar from '../components/SideBar';



function HomePage(props: any){ 
    const [selectedTab, setSelectedTab] = useState<string>(SelectedTabs.FORYOU);
    const [posts, setPosts] = useState<any>([]);
    const [disable, setDisable] = useState<boolean>(true);
    const [post, setPost] = useState<string>('');
    
    const changeTab = (tab: string) => {
        setSelectedTab(tab);
    }

    useEffect(() => {
        axios.get(environmentApi.host + '/posts')
        .then((res: any) => {
            if(res.data.success) {
                setPosts(res.data.posts);
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => toast.error(err.response.data.message))
    }, []);

    const createPost = (post: string) => {
        axios.post(environmentApi.host + '/posts', { user: props.user._id, description: post })
        .then((res) => {
            if(res.data.success) {
                posts.unshift(res.data.post);
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return  (
        <div style={{
            flex: 1, 
            display: 'flex', 
            overflowY: 'auto'
        }}>
            <Feed 
            user={props.user}
            selectedTab={selectedTab} 
            changeTab={changeTab}
            disable={disable}
            setDisable={setDisable}
            setPost={setPost}
            createPost={createPost}
            posts={posts}
            post={post}
            />
            <SideBar />
        </div>
    )
}




function App() {
    
    const user = useContext(UserContext);
    const [showContent, setShowContent] = useState<string>("Home");
    
    const renderContent = (content: string) => {
        if(content == NAVBAR.HOME) {
            return <HomePage user={user} />
        } else if(content == NAVBAR.MESSAGES) {
            return <Messages user={user} />
        }
        return <HomePage user={user} />
    }

    return (
        <div className="home">
            <Navbar user={user} setShowContent={setShowContent} />
            { renderContent(showContent) }
        </div>
    )
}

export default App;