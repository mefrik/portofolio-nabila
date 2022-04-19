import './CardContentIntro.css';

function CardContentIntro(props){      
    return (
        <div className='cardcontentintro-container'>
            <p className='cardcontentintro-items'>{props.data.title}</p>
            <button className='cardcontentintro-btn' onClick={() => props.remove(props.data.id)} >
                <i className="far fa-trash-alt fa-2x"></i>
            </button>
        </div>
    )
}

export default CardContentIntro
