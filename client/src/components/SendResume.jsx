import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import sendResume from "../utils/util";

const SendResume = () => {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [recruiterName, setRecruiterName] = useState("");
    const [myName, setMyName] = useState("");
    const [recruiterEmail, setRecruiterEmail] = useState("");
    const [myEmail, setMyEmail] = useState("");
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return <Loading />;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
//👇🏻 form object
    const formData = new FormData();
    formData.append("resume", resume, resume.name);
    formData.append("companyName", companyName);
    formData.append("companyDescription", companyDescription);
    formData.append("jobTitle", jobTitle);
    formData.append("recruiterEmail", recruiterEmail);
    formData.append("recruiterName", recruiterName);
    formData.append("myName", myName);
    formData.append("myEmail", myEmail);
//👇🏻 imported function
    sendResume(formData, setLoading, navigate);

//👇🏻 states update
    setMyEmail("");
    setRecruiterEmail("");
    setRecruiterName("");
    setMyName("");
    setJobTitle("");
    setCompanyName("");
    setCompanyDescription("");
    setResume(null);
    };

    

    return (
        <div className='app'>
            <h1 className='resume__title'>Enviar currículo por email</h1>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <div className='nestedContainer'>
                    <div className='nestedItem'>
                        <label htmlFor='recruiterName'>Meu nome</label>
                        <input
                            type='text'
                            value={myName}
                            required
                            onChange={(e) => setMyName(e.target.value)}
                            id='myName'
                            className='myName'
                        />
                    </div>
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
