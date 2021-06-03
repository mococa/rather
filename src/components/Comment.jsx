import React from 'react';


function Comment(props) {
    return (
        <div className="comment flex-hr">
            <img src="src/img/user.png"></img>
            <div className="flex-vr">
                <b>{props.comment_data}</b>
                <span>{props.comment_data}</span>
            </div>
        </div>
    );
}

export default Comment;
