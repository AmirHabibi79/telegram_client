import SideBarItem from "./SideBarItem"
export default function SearchView({searchs}) {
    return (
        <>
        {searchs.map(ss=>(
            <SideBarItem search messages={ss.messages} selected={ss.selected} name={ss.name} family={ss.family} phone={ss.phone} userid={ss.userid} profilepic={ss.profilepic} id={ss.id} conversationid={ss.conversationid} key={ss.id}/>
        ))}
        </>
    )
}
