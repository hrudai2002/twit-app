import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { getusername } from "../utils/common";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { environmentApi } from "../environment";
import toast from "react-hot-toast";
import PostCard from "./postCard";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

function Bookmarks() {
    const user = useSelector(selectUser);
    const [ posts, setPosts ] = useState<any>(null);

    useEffect(() => {
        axios.get(environmentApi.host + `/posts/bookmarks/${user._id}`)
        .then((res: any) => {
            console.log(res.data);
            if(res.data.success) {
                setPosts(res.data.posts);
            }
        }).catch((err) => toast.error(err));
    }, []);

    return(
        <div style={{
            flex: 1,
            display: 'flex',
            overflowY: 'auto'
        }}>
            <div className="feed">
                <div className="feed-header" style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px", 
                    gap: "10px"
                }}>
                    <div>
                        <div style={{
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>Bookmarks</div>
                        <div style={{
                            color: "#5f6467"
                        }}>{ getusername(user?.name) }</div>
                    </div>
                    <BsThreeDots fontSize={18} />
                </div>
                {
                    posts?.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                }
            </div>
            <SideBar />
        </div>
    )
}

export default Bookmarks;