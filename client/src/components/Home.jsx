/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

function Home({ setResult }) {
  const [fullName, setFullName] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState('');
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([{ name: '', position: '' }]);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('headshotImage', headshot, headshot.name);
    formData.append('fullName', fullName);
    formData.append('currentPosition', currentPosition);
    formData.append('currentLength', currentLength);
    formData.append('currentTechnologies', currentTechnologies);
    formData.append('workHistory', JSON.stringify(companyInfo));
    axios
      .post('http://localhost:3001/resume/create', formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate('/resume');
        }
      })
      .catch((err) => console.error(err));
    setLoading(true);
  };

  // 👇🏻 updates the state with user's input
  const handleAddCompany = () => setCompanyInfo([...companyInfo, { name: '', position: '' }]);

  // 👇🏻 removes a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
    // 👇🏻 updates an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <h1>Cirrus</h1>
      <p>Gerador de currículo com GPT-3</p>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="fullName">
          Seu nome completo
          <input
            type="text"
            required
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <div className="nestedContainer">
          <div>
            <label htmlFor="currentPosition">
              Cargo pretendido
              <input
                type="text"
                required
                name="currentPosition"
                className="currentInput"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="currentLength">
              Tempo de experiência (ano(s))
              <input
                type="number"
                required
                name="currentLength"
                className="currentInput"
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="currentTechnologies">
              Tecnologias utilizadas
              <input
                type="text"
                required
                name="currentTechnologies"
                className="currentInput"
                value={currentTechnologies}
                onChange={(e) => setCurrentTechnologies(e.target.value)}
              />
            </label>
          </div>
        </div>
        <label htmlFor="photo">
          Upload da foto de perfil
          <input
            type="file"
            name="photo"
            required
            id="photo"
            accept="image/x-png,image/jpeg"
            onChange={(e) => setHeadshot(e.target.files[0])}
          />
        </label>

        {companyInfo.map((company, index) => (
          <div className="nestedContainer" key={company}>
            <div className="companies">
              <label htmlFor="name">
                Nome da empresa
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </label>
            </div>
            <div className="companies">
              <label htmlFor="position">
                Cargo
                <input
                  type="text"
                  name="position"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </label>
            </div>

            <div className="btn__group">
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button type="button" id="addBtn" onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button type="button" id="deleteBtn" onClick={() => handleRemoveCompany(index)}>
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="submit">CRIAR CURRÍCULO</button>
      </form>
    </div>
  );
}

export default Home;

Home.propTypes = {
  result: PropTypes.shape({}),
}.isRequired;
