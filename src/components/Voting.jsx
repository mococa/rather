import React, {useState} from 'react';
import {AiOutlineShareAlt} from 'react-icons/ai'



function Voting(props) {
    const [voto, setVoto] = useState(null);
    const [voteText, setVoteText] = useState("");
    const [sharing, setSharing] = useState(false);

    async function vote(c){
        const excluded_ids = JSON.parse(localStorage.getItem('already_seen')) || []
        
        excluded_ids.push(props.data._id)

        const api_url = "https://api.rather.ml/vote"

        const response = await fetch(api_url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                questionId:props.data._id,
                vote:c-1===0
            })
        })
        console.log(response)
        const json = await response.json()
        console.log(json)
        localStorage.setItem("already_seen", JSON.stringify(excluded_ids))
        setVoto(c-1)
        props.set_vote_result(c-1===0)
        const ppl = c-1 === 0?props.data.votes.left:props.data.votes.right
        if(ppl === 0){
            setVoteText(`${translate().first} ${props.data.questions[c-1]}!`)
        }else{
            setVoteText(`${translate().rather} ${props.data.questions[c-1]}\n${translate()['among']} ${ppl} ${translate()['people']}!`)
        }
    }
    

    return (
        <section className="voting flex-vr">
            <p className="vote-title">{translate().rather}...</p>
            <p className= {voto===null ? 'none' : (voto==0 ? "voted green-color" : "voted blue-color")} >
                {voto!==null?voteText:""}
            </p>
            <div className="cards-vote">
                <button  className="clickable" onClick={()=>vote(1)} disabled={voto === null?"":true}>{props.data.questions[0]} 
                    {
                        voto === null ? null : getVotesResult().left
                    }
                </button>
                <h1 style={{color:'white', alignSelf:'center'}}>{translate().or}</h1>
                <button className="clickable" onClick={()=>vote(2)} disabled={voto === null?"":true}>{props.data.questions[1]}
                    {
                        voto === null ? null : getVotesResult().right
                    }
                </button>
            </div>
            <div className="share" onClick={(e)=>{
                setSharing(true);
                setTimeout(()=>e.target.children[0].select(),100)
                }}>
                {!sharing?<>
                    <AiOutlineShareAlt/>
                    <span>Compartilhar</span>
                </>:
                    <>
                    <input type='text' defaultValue={location.href.replace(/\#/,"")+"q/"+props.data._id} onClick={(e)=>e.target.select()}/>
                </>
                }
            </div>
            {voto !== null?<button className="next-btn clickable" onClick={()=>{props.fetch_data();setVoto(null);setVoteText("")}}>Next</button>:""}
            <p style={{color:"#9c9c9c", fontSize:"12px"}}>{translate()['by']} {props.data.name}</p>
            
        </section>
    );
    function getVotesResult(){
        const _total = props.data.votes.left+props.data.votes.right+1;
        const _left = props.data.votes.left + (voto == 1?1:0)
        const _right = props.data.votes.right + (voto == 2?1:0)
        return{
            left:<span>{(100*_left/_total).toFixed(2)+"%"}</span>,
            right:<span>{(100*_right/_total).toFixed(2)+"%"}</span>
        }
    }
    function translate(){
        const lan = localStorage.getItem('language') || "en"
        const phrases = {}
        switch(lan) {
            case 'pt':
                phrases['first'] = "Você é o primeiro que preferiria"
                phrases['rather'] = "Você prefere"
                phrases['among'] = "junto com"
                phrases['people'] = "pessoas"
                phrases['or'] = "ou"
                phrases['by'] = "Pergunta feita por"
                break;
            case 'fr':
                phrases['first'] = "Tu es la première personne qui aurait preferé"
                phrases['rather'] = "Tu préfères"
                phrases['among'] = "avec"
                phrases['people'] = "personnes"
                phrases['or'] = "ou"
                phrases['by'] = "Posée par"
                break;
            case 'es':
                phrases['first'] = 'Eres la primera persona que preferiria'
                phrases['rather'] = "Preferes"
                phrases['among'] = "junto a"
                phrases['people'] = "personas"
                phrases['or'] = "o"
                phrases['by'] = "Pregunta hecha por"
                break;
            case 'en':
            default: 
                phrases['first'] = "You're the first one who would rather"
                phrases['rather'] = "Would you rather"
                phrases['among'] = "Among"
                phrases['people'] = "people"
                phrases['or'] = "or"
                phrases['by'] = "Question by"
                break;
        }
        return phrases
    }
}

export default Voting;
