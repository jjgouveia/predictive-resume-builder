import React, { useState } from "react";

const SendResume = () => {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [recruiterName, setRecruiterName] = useState("");
    const [recruiterEmail, setRecruiterEmail] = useState("");
    const [myEmail, setMyEmail] = useState("");
    const [resume, setResume] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Submit button clicked!");
    };

    return (
        <div className='app'>
            <h1 className='resume__title'>Enviar currículo por email</h1>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <div className='nestedContainer'>
                    <div className='nestedItem'>
                        <label htmlFor='recruiterName'>Nome do recrutador</label>
                        <input
                            type='text'
                            value={recruiterName}
                            required
                            onChange={(e) => setRecruiterName(e.target.value)}
                            id='recruiterName'
                            className='recruiterName'
                        />
                    </div>
                    <div className='nestedItem'>
                        <label htmlFor='recruiterEmail'>Email do recrutador</label>
                        <input
                            type='email'
                            value={recruiterEmail}
                            required
                            onChange={(e) => setRecruiterEmail(e.target.value)}
                            id='recruiterEmail'
                            className='recruiterEmail'
                        />
                    </div>
                </div>
                <div className='nestedContainer'>
                    <div className='nestedItem'>
                        <label htmlFor='myEmail'>Meu email</label>
                        <input
                            type='email'
                            value={myEmail}
                            required
                            onChange={(e) => setMyEmail(e.target.value)}
                            id='myEmail'
                            className='myEmail'
                        />
                    </div>
                    <div className='nestedItem'>
                        <label htmlFor='jobTitle'>Cargo para o qual estou me aplicando</label>
                        <input
                            type='text'
                            value={jobTitle}
                            required
                            onChange={(e) => setJobTitle(e.target.value)}
                            id='jobTitle'
                            className='jobTitle'
                        />
                    </div>
                </div>

                <label htmlFor='companyName'>Nome da empresa</label>
                <input
                    type='text'
                    value={companyName}
                    required
                    onChange={(e) => setCompanyName(e.target.value)}
                    id='companyName'
                    className='companyName'
                />
                <label htmlFor='companyDescription'>Descrição da empresa</label>
                <textarea
                    rows={5}
                    className='companyDescription'
                    required
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                />
                <label htmlFor='resume'>Carregar currículo</label>
                <input
                    type='file'
                    accept='.pdf, .doc, .docx'
                    required
                    id='resume'
                    className='resume'
                    onChange={(e) => setResume(e.target.files[0])}
                />
                <button className='sendEmailBtn'>Enviar Email</button>
            </form>
        </div>
    );
};

export default SendResume;
