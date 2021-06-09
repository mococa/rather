import React, {useState} from 'react';
import Comment from './Comment';
import {FaComment} from 'react-icons/fa';

function CommentSection(props) {

    const [name,setName] = useState("");
    const [comment,setComment] = useState("");
    const [commented, setCommented] = useState(false);
    const [allComments, setAllComments] = useState(props.data.comments)

    async function makeComment(){
        if(props.vote_result === null) return alert("É necessário votar antes de deixar um comentário")
        if(!name || !comment) return alert("Por favor, preencha os campos.")

        const api_url = "https://api.rather.ml/comment"

        const response = await fetch(api_url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                questionId:props.data._id,
                comment:comment,
                name:name,
                vote:props.vote_result
            })
        })
        const json = await response.json()
        if(json.status && json.status===200){
            setComment("")
            setAllComments(allComments.concat(json.comment))
            console.log(allComments)
        }else{
            alert("Um erro ocorreu.")
        }
    }
    return (
        <section className="comment-section flex-vr">
            <h1>Comments <FaComment style={{height:'30px'}} /></h1>
            <div className="my-comment flex-vr">
                <label>Nome:<input value={name} onChange={e=>setName(e.target.value)} type="text"/></label>
                <label>Comentário:<textarea value={comment} onChange={e=>setComment(e.target.value)}rows="3"type="text"></textarea></label>
                <h3 className="clickable" style={{color:'tomato', placeSelf:'flex-start', marginBottom:"15px"}} onClick={async()=>{await makeComment(); }}>Add a comment</h3>
            </div>
        
            {
                allComments.length?
                allComments.sort((a,b)=>b['created_on']-a['created_on']).map(x=>{
                    return <Comment key={x.id}comment_data={x}/>
                }):
                <p>No comments yet</p>
            }
        
    </section>
  );
}

export default CommentSection;
