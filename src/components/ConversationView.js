import SideBarItem from "./SideBarItem"
export default function ConversationView({conversations}) {
    return (
        <>
        {conversations.map(cc=>(
            <SideBarItem lastmessage={cc.messages[cc.messages.length-1].message} selected={cc.selected} name={cc.name} family={cc.family} phone={cc.phone} userid={cc.userid} profilepic={cc.profilepic} id={cc.id} conversationid={cc.conversationid} key={cc.id}/>
        ))}
        </>
    )
}
