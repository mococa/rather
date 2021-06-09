import React from 'react';

function LanguageSelect(props) {
    const icon = (x) => `https://raw.githubusercontent.com/yammadev/flag-icons/master/png/${x}.png` 
    const languages = [
        {code:'BR',language:'Portuguese', lan:'pt'},
        {code:'US',language:'English', lan:"en"},
        {code:'ES',language:'Spanish', lan:'es'},
        {code:'FR',language:'French', lan:'fr'},
    ]
    function setLanguage(lan){
        localStorage.setItem('language', lan)
        
        props.fetch_data();
        props.setLan(false)
        //location.reload()
    }
    return (
        <ul className="lan-select">
            {languages.map(x=>{
                return(
                    <li style={x.lan===localStorage.getItem("language")?{backgroundColor:'bisque'}:{}}key={x.code} onClick={()=>setLanguage(x.lan)}>
                        <img src={icon(x.code)}/>
                        <span>{x.language}</span>
                    </li>
                );
            })}
            
        </ul>
    );
}

export default LanguageSelect;
