import React from "react";
require('../../style/message.css');

export default function MessageInstance(props) {
    let from
    props.received ? from = 'him' : from = 'me'
    const timeArray = props.time.split(/[ T.:|]+/)

    return (
        <div className={`message ${from}`}>
            <div className={`username ${from}`}>
                <img
                    className="avatar"
                    width="30" height="30"
                    src={props.image === "test" ? "https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" : props.image}
                    alt="profile" />

            </div>
            <div className={`message-body ${from}`}>
                {props.message}
                <div className="message-time" >
                    {timeArray[1] + ":" + timeArray[2]}
                </div>
            </div>
        </div>
    );
}