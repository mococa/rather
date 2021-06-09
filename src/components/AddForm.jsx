import React, {useState} from 'react';


function AddForm(props) {
    const [added,setAdded] = useState(false);
    const [error,setError] = useState(false);

    const [nick,setNick] = useState("");
    const [opt1,setOpt1] = useState("");
    const [opt2,setOpt2] = useState("");
    const [language,setLanguage] = useState(
        localStorage.getItem('language') || "pt"
    );

    async function addQuestion(){
        setError(false);
        setAdded(true);
        console.log(JSON.stringify({
                name:nick,
                questions:[opt1,opt2],
                language:language
            }))
        const api_url = "https://api.rather.ml/new"

        const response = await fetch(api_url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:nick,
                questions:[opt1,opt2],
                language:language
            })
        })
        console.log(response)
        const json = await response.json()
        console.log(json)
        if(json.status && json.status==200){
            setError(false);
            setAdded(false);
            setOpt1("");
            setOpt2("");
            
        }else{
            setError(true);
            setAdded(false);
        }
    }
    return (
        <ul className="add-form flex-vr">
            <span>{translate()['add']}</span>
            <li>
                <span>{translate()['name']}</span>
                <input value={nick} onChange={e=>setNick(e.target.value)} type="text" placeholder="Blank for anonymous" />
            </li>

            <li style={{margin:"10px 0"}}>{translate()['rather']}...</li>

            <li>
                <span>{translate()['opt1']}</span>
                <input value={opt1} onChange={e=>setOpt1(e.target.value)} type="text"/>
            </li>

            <li>
                <span>{translate()['opt2']}</span>
                <input value={opt2} onChange={e=>setOpt2(e.target.value)} type="text"/>
            </li>

            <li>
                <span>Language:</span>
                <select value={language} onChange={e=>{setLanguage(e.target.value);}}>
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                </select>
            </li>
            <li>
                <button style={{marginTop:"15px"}} onClick={async()=>await addQuestion()} disabled={added?true:""} className="clickable">{error?"Ocorreu um erro.":(added?"Carregando":"Adicionar")}</button>
            </li>

        </ul>
    );
    function translate(){
        const lan = localStorage.getItem('language') || "en"
        const phrases = {}
        switch(lan) {
            case 'pt':
                phrases['add'] = "Adicionar pergunta"
                phrases['name'] = "Seu nick:"
                phrases['rather'] = "Você preferiria"
                phrases['opt1'] = "Opção 1:"
                phrases['opt2'] = "Opção 2:"
                break;
            case 'fr':
                phrases['add'] = "Ajouter question"
                phrases['name'] = "Pseudo:"
                phrases['rather'] = "Tu préfères"
                phrases['opt1'] = "Option 1:"
                phrases['opt2'] = "Option 2:"
                break;
            case 'es':
                phrases['add'] = "Agregar pregunta"
                phrases['name'] = "Apodo:"
                phrases['rather'] = "Preferirias"
                phrases['opt1'] = "Opción 1:"
                phrases['opt2'] = "Opción 2:"
                break;
            case 'en':
            default: 
                phrases['add'] = "Add questions"
                phrases['name'] = "Nickname:"
                phrases['rather'] = "Would you rather"
                phrases['opt1'] = "A:"
                phrases['opt2'] = "B:"
                break;
        }
        return phrases
    }
}

export default AddForm;