import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environmentApi } from '../environment';
import { toast } from 'react-hot-toast';
import { SelectedTabs } from '../enum';


// Components
import Feed from '../components/Feed';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';



function App(){ 
    const user = useSelector(selectUser)
    const [selectedTab, setSelectedTab] = useState<string>(SelectedTabs.FORYOU);
    const [posts, setPosts] = useState<any>([]);
    const [disable, setDisable] = useState<boolean>(true);
    const [post, setPost] = useState<string>('');

    console.log('user: ', user);
    
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
        axios.post(environmentApi.host + '/posts', { user: user._id, description: post })
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
            user={user}
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
export default App;