import React from 'react';
import '../App.css';

function LanguageSwitcher(props) {

    const switchLanguage = () => {

        const {dataCallBack} = props;

        if (props.lang === "en-US") {
            dataCallBack("cs");
        } else {
            dataCallBack("en-US");
        }

    }

    return (
        <div className="language-switcher">
            <div onClick={switchLanguage}>{props.lang}</div>
        </div>
    )
}

export default LanguageSwitcher;