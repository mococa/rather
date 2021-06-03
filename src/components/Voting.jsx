import React, {useState} from 'react';



function Voting(props) {
    const [voto, setVoto] = useState(null);
    const [voteText, setVoteText] = useState("");

    function vote(c){
        const excluded_ids = JSON.parse(localStorage.getItem('already_seen')) || []
        
        excluded_ids.push(props.data._id)

        //localStorage.setItem("already_seen", JSON.stringify(excluded_ids))
        setVoto(c-1)
        const ppl = c-1 === 0?props.data.votes.left:props.data.votes.right
        if(ppl === 0){
            setVoteText(`${translate().first} ${props.data.questions[c-1]}!`)
        }else{
            setVoteText(`${translate().rather} ${props.data.questions[c-1]}\nAmong ${ppl} people!`)
        }
    }
    

    return (
        <section className="voting flex-vr">
            <p className="vote-title">{translate().rather}</p>
            <p className= {voto===null ? 'none' : (voto==0 ? "voted green-color" : "voted blue-color")} >
                {voto!==null?voteText:""}
            </p>
            <div className="cards-vote">
                <button  className="clickable" onClick={()=>vote(1)} disabled={voto === null?"":"true"}>{props.data.questions[0]}</button>
                <h1 style={{color:'white', alignSelf:'center'}}>{translate().or}</h1>
                <button className="clickable" onClick={()=>vote(2)} disabled={voto === null?"":"true"}>{props.data.questions[1]}</button>
            </div>
            
        </section>
    );
    function translate(){
        const lan = localStorage.getItem('language') || "en"
        const phrases = {}
        switch(lan) {
            case 'pt':
                phrases['first'] = "Você é o primeiro que preferiria"
                phrases['rather'] = "Você prefere..."
                phrases['among'] = "junto com"
                phrases['people'] = "pessoas"
                phrases['or'] = "ou"
                break;
            case 'fr':
                phrases['first'] = "Tu es la première personne qui aurait preferé"
                phrases['rather'] = "Tu préfères..."
                phrases['among'] = "avec"
                phrases['people'] = "personnes"
                phrases['or'] = "ou"
                break;
            case 'es':
                phrases['first'] = 'Eres la primera persona que preferiria'
                phrases['rather'] = "Preferes..."
                phrases['among'] = "junto a"
                phrases['people'] = "personas"
                phrases['or'] = "o"
                break;
            case 'en':
            default: 
                phrases['first'] = "You're the first one who would rather"
                phrases['rather'] = "You would rather..."
                phrases['among'] = "Among"
                phrases['people'] = "people"
                phrases['or'] = "or"
                break;
        }
        return phrases
    }
}

export default Voting;
