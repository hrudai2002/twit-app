import React, { useContext, useEffect, useRef, useState } from "react";
import { environmentApi } from "../environment";
import axios from "axios";
import toast from "react-hot-toast";
import { getusername, messageDateFormat } from "../utils/common";
import Modal from "react-responsive-modal";
import { io } from "socket.io-client";


import { FaRegImage } from "react-icons/fa";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

function Messages() {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [conversation, setConversation] = useState<any>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const message = useRef(null);
    const scrollRef = useRef<any>();
    const socket = useRef<any>();
    const user = useSelector(selectUser);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
                socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId, 
                message: data.text, 
                date: new Date()
            })
        })
        axios.get(environmentApi.host + `/conversation/${user._id}`)
        .then((res: any) => {
            if (res.data.success) {
                setUsers(res.data.conversationDocs);
            } else if (!res.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => toast.error(err.response.data.message));
    }, []);

    useEffect(() => {
        if(arrivalMessage && selectedUser.user._id.toString() === arrivalMessage.sender.toString()) {
            const newConversation = [...conversation];
            newConversation.push(arrivalMessage);
            setConversation(newConversation);
        }
    }, [arrivalMessage, selectedUser]);
    

    useEffect(() => {
        socket.current.emit("addUser", user._id);
    }, [user])

    useEffect(() => {
        if (isOpen) {
            axios.get(environmentApi.host + `/user/${user._id}`)
                .then((res: any) => {
                    if (res.data.success) {
                        setAllUsers(res.data.users);
                    } else if (!res.success) {
                        toast.error(res.data.error);
                    }
                }).catch((err) => toast.error(err.response.data.message));
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedUser) {
            const oldUser = !!(users.find((doc) => doc.user._id.toString() === selectedUser.user._id.toString()));

            if (!oldUser) {
                setUsers([...users, selectedUser]);
            }

            axios.get(environmentApi.host + `/conversation/${user._id}/${selectedUser.user._id}`)
            .then((res: any) => {
                if (res.data.success) {
                    setConversation(res.data.conversation.chat);
                } else if (!res.success) {
                    toast.error(res.data.error);
                }
            }).catch((err) => toast.error(err.response.data.message));
    }
    }, [selectedUser]);

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [conversation])

    const sendMessage = () => {
        const messageString: any = (message.current as any)?.value; 
        if (messageString.length) {
            socket.current.emit("sendMessage", {
                senderId: user._id, 
                receiverId: selectedUser.user._id, 
                text: messageString 
            });

            axios.post(environmentApi.host + '/conversation', {
                conversationId: selectedUser?._id ? selectedUser._id : null, 
                sender: user._id, 
                receiver: selectedUser.user._id,
                message: messageString
            }).then((res: any) => {
                if(res.data.success) {
                    if(!conversation.length) {
                        setSelectedUser({ ...selectedUser, _id: res.data.conversationDoc._id});
                        setConversation([{
                            sender: user._id,
                            date: new Date(),
                            message: messageString,
                        }]);
                    } else {
                        const newConversation = [...conversation];
                        newConversation.push({
                            sender: user._id,
                            date: new Date(),
                            message: messageString,
                        });
                        setConversation(newConversation);
                    }
                } else if(!res.data.success) {
                    toast.error(res.data.error);
                } 
            }).catch((err) => console.log(err));
        }
    }


    const closeModal = () => {
        setIsOpen(false);
    }

    const Chats = () => {

        if (!selectedUser) {
            return (<div className='chats'></div>);
        }

        return (
            <div className="chats">
                <div className="flex-row-space-between-center font-bold"
                    style={{
                        padding: '15px 15px',
                        fontSize: '18px',
                        backgroundColor: 'rgb(0, 0, 0)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 3
                    }}>
                    <div>{selectedUser?.user?.name}</div>
                    <AiOutlineInfoCircle
                        fontSize={22} />
                </div>

                <div className="messages">
                    {
                        conversation?.map((doc, index) => (
                            <div
                                key={index}
                                // ref={scrollRef}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignSelf: doc.sender.toString() === selectedUser.user._id.toString() ? 'flex-start' : 'flex-end',
                                    maxWidth: "30%",
                                    padding: '10px',
                                }}
                            >
                                <div className="message"
                                    style={{
                                        borderBottomLeftRadius: doc.sender.toString() !== selectedUser.user._id.toString() ? '10px' : 'unset',
                                        borderBottomRightRadius: doc.sender.toString() !== selectedUser.user._id.toString() ? 'unset' : '10px',
                                        backgroundColor: doc.sender.toString() !== selectedUser.user._id.toString() ? '#1c9bef' : '#2f3336',
                                    }}
                                >
                                    <div>{doc.message}</div>
                                </div>
                                <div className="date"
                                    style={{
                                        alignSelf: doc.sender.toString() === selectedUser.user._id.toString() ? 'flex-start' : 'flex-end'
                                    }}
                                >{messageDateFormat(doc.date)}</div>
                            </div>
                        ))
                    }
                </div>

                <div className='pd-10 text-box'
                    style={{ backgroundColor: 'rgb(0, 0, 0)', justifySelf: 'justify-end' }}
                >
                    <div className="search-input">
                        <FaRegImage
                            fontSize={22}
                            color='#1c9bef'
                            fontWeight={'bold'}
                        />

                        <MdOutlineGifBox
                            fontSize={24}
                            color='#1c9bef'
                            fontWeight={'bold'} />

                        <BsEmojiSmile
                            fontSize={22}
                            color='#1c9bef'
                            fontWeight={'bold'} />

                        <input ref={message} name="message" type="text" placeholder='Start a new message'/>

                        <VscSend
                            fontSize={24}
                            color='#1c9bef'
                            fontWeight={'bold'} 
                            onClick={sendMessage}
                            />
                    </div>
                </div>
            </div>
        )
    }

    const Users = () => {
        return (
            <div className="users">
                <div className="heading">
                    <div className="messages">Messages</div>
                    <div className="send-mail">
                        <FiSettings
                            fontSize={18}
                            fontWeight="bold"
                        />
                        <LuMailPlus
                            fontSize={18}
                            fontWeight="bold"
                            cursor="pointer"
                            onClick={() => setIsOpen(true)}
                        />
                    </div>
                </div>
                <Modal
                    open={isOpen}
                    onClose={closeModal}
                    showCloseIcon={false}
                    classNames={{
                        modal: "messageModal",
                        overlay: "messageModalOverlay"
                    }}
                >
                    <div className='messageModalContainer'>
                        <div className="message">
                            <div className='flex-row-none-center-10'
                                style={{
                                    gap: '20px'
                                }}>
                                <RxCross2
                                    fontSize={22}
                                    color="#fff"
                                    cursor={"pointer"}
                                    onClick={closeModal} />
                                <div style={{
                                    fontSize: '22px'
                                }}>Message</div>
                            </div>
                            <div>
                                <a href="" className='next-btn'>Next</a>
                            </div>
                        </div>
                        <div className='search'>
                            <div className="search-input">
                                <CiSearch
                                    size={24}
                                    style={{
                                        backgroundColor: 'rgb(0, 0, 0)',
                                        color: '#1c9bef'
                                    }} />
                                <input type="text" name="" placeholder='Search for people' />
                            </div>
                        </div>

                        <div className='flex-col-5'
                            style={{
                                gap: '25px',
                                padding: '15px'
                            }}
                        >
                            {
                                allUsers.map((doc, index) => (
                                    <div key={index} className='flex-row-none-center-10 user'
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setSelectedUser(null);
                                            setSelectedUser(doc);
                                            closeModal();
                                        }}
                                    >
                                        <img src={doc.user.imageUrl} className='user-dp' />
                                        <div className="flex-col-5">
                                            <div><span className="font-bold">{doc.user.name}</span></div>
                                            <div>{getusername(doc.user.name)}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Modal>
                <div>
                    <div className='search'>
                        <div className="search-input">
                            <CiSearch
                                size={24}
                                style={{
                                    backgroundColor: '#202327'
                                }} />
                            <input type="text" name="" placeholder='Search' />
                        </div>
                    </div>
                    <div className='users-list'>
                        {
                            users.map((doc, index) => (
                                <div key={index} className='flex-row-none-center-10 user'
                                    style={{
                                        backgroundColor: selectedUser?.user?._id === doc.user._id ? '#202327' : 'none',
                                        borderRight: selectedUser?.user?._id === doc.user._id ? '2px solid #1c9bef' : 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setSelectedUser(doc);
                                    }}
                                >
                                    <img src={doc.user.imageUrl} className='user-dp' />
                                    <div className="flex-col-5">
                                        <div><span className="font-bold">{doc.user.name}</span>  ·   <span style={{ color: '#71767a' }}>7 Jun</span></div>
                                        <div>{getusername(doc.user.name)}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden'
            }}>
            <Users />
            <Chats />
        </div>
    )
}

export default Messages;