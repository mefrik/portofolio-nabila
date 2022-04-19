import React from 'react';
import './ContentMyProject.css';

const ContentCardProject = (props) => {
    return (
        <div className='contentmyproject-list-item'>
            <p id='nomor' className='contentmyproject-list-nomor'>{props.number}</p>
            <p id='title' className='contentmyproject-item-title'>{props.title}</p>
            <p id='company' className='contentmyproject-item-company'>{props.company}</p>
            <p id='description' className='contentmyproject-item-description'>{props.description}</p>
            <div id='action' className='contentmyproject-card-btn-action'>
                <button 
                    id='editProject'
                    className='contentmyproject-card-btn'
                    onClick={() => props.edit(props.data)}
                >
                    <i className="fas fa-pencil-alt"></i>
                </button>
                <button 
                    className='contentmyproject-card-btn'
                    onClick={() => props.remove(props.data.id)}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default ContentCardProject
