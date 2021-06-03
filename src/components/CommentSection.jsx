import React from 'react';
import Comment from './Comment';

// {
        //     props.data.comments.length?
        //     props.data.comments.map(x=>{
        //         return <Comment comment_data={x}/>
        //     }):
        //     <p>No comments yet</p>
        // }
function CommentSection(props) {
  return (
    <section className="comment-section flex-vr">
        <h1>Comments</h1>
        <h2 className="clickable" style={{color:'tomato', width:'fitContent'}}>Add a comment</h2>
        <Comment comment_data={"oi"}/>
        
    </section>
  );
}

export default CommentSection;
