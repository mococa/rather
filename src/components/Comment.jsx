import React from 'react';


function Comment(props) {
    return (
        <div className="comment flex-hr">
            <img src="src/img/user.png"></img>
            <div className="flex-vr">
                <b className={props.comment_data.voted_in_left?"green-color":"blue-color"}>{props.comment_data.name}</b>
                <span>{props.comment_data.comment}</span>
            </div>
        </div>
    );
}

export default Comment;
