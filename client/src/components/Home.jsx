/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Home({ setResult }) {
  const [fullName, setFullName] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState('');
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([{ name: '', position: '' }]);
  const [hasExperience, setHasExperience] = useState(true);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
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

  const handleAddCompany = () => setCompanyInfo([...companyInfo, { name: '', position: '' }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
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
    <main className="app flex flex-1 w-full flex-col items-center justify-center px-4 mt-0 sm:mt-0 mb-10">
      <p className="">Seu criador de currículos com IA</p>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
        className="max-w-xl w-full"
      >
        <div className="flex-col mt-2 items-center">Seu nome completo</div>
        <input
          type="text"
          required
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        />
        <div className="flex flex-col">
          <div className="w-full">
            <label htmlFor="currentPosition">
              Cargo pretendido
              <input
                type="text"
                required
                name="currentPosition"
                className="currentInput mt-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label htmlFor="currentLength">
                Tempo de experiência
                <input
                  type="number"
                  required
                  name="currentLength"
                  className="currentInput mt-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  value={currentLength}
                  onChange={(e) => setCurrentLength(e.target.value)}
                />
              </label>
            </div>
            <div className="col-span-2">
              <label htmlFor="currentTechnologies">
                Tecnologias
                <input
                  type="text"
                  required
                  name="currentTechnologies"
                  className="mt-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  value={currentTechnologies}
                  onChange={(e) => setCurrentTechnologies(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg border-b border-slate-200 pb-1">Experiência profissional</h3>
          <div className="flex items-center gap-2 mt-2 mb-4">
            <p className="text-slate-400">
              Não possuo experiência profissional
              {' '}
            </p>
            <input type="checkbox" id="yes" name="hasExperience" value="yes" onChange={() => setHasExperience(!hasExperience)} />
          </div>

          {companyInfo.map((company, index) => (
            <div
              className={
                  hasExperience
                    ? 'grid grid-cols-1 sm:grid-cols-5 sm:gap-4 mb-2 border-b pb-4 pt-1 border-slate-200'
                    : 'hidden'
                }
              key={company}
            >
              <div className="col-span-2 mt-2">
                <label htmlFor="name">
                  <p className="text-slate-900 font-medium">
                    Nome da empresa
                  </p>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleUpdateCompany(e, index)}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  />
                </label>
              </div>
              <div className="col-span-2 mt-2">
                <label htmlFor="position">
                  Cargo
                  <input
                    type="text"
                    name="position"
                    required
                    onChange={(e) => handleUpdateCompany(e, index)}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none disabled:cursor-not-allowed"
                  />
                </label>
              </div>

              <div className="flex justify-center items-end align-bottom">
                <div className="col-span-1 flex gap-2 mt-2 min-h-3/5 w-full justify-around">
                  {companyInfo.length - 1 === index
                      && companyInfo.length < 4 && (
                        <button
                          className="flex w-full items-center justify-center align-middle text-lg bg-green-500 hover:bg-green-700 disabled:bg-green-300 disabled:text-white text-white font-bold py-2 px-4 rounded transition-all duration-300 disabled:cursor-not-allowed"
                          type="button"
                          disabled={
                            !companyInfo[index].name.length
                            || !companyInfo[index].position.length
                          }
                          id="addBtn"
                          onClick={handleAddCompany}
                        >
                          +
                        </button>
                  )}
                  {companyInfo.length > 1 && (
                  <button
                    className="flex justify-center w-full items-center align-middle bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white text-lg font-bold py-2 px-4 rounded transition-all duration-300"
                    type="button"
                    id="deleteBtn"
                    onClick={() => handleRemoveCompany(index)}
                  >
                    -
                  </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="
            w-full justify-center
          flex items-center align-middle bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed transition-all duration-300
          "
          disabled={
              hasExperience
                ? !fullName.length || !currentPosition.length
                || !currentLength || !currentTechnologies.length
                || !companyInfo[0].name.length || !companyInfo[0].position.length
                : !fullName.length || !currentPosition.length
                || !currentLength || !currentTechnologies.length
          }
          type="submit"
        >
          CRIAR CURRÍCULO
        </button>
      </form>
    </main>
  );
}

export default Home;

Home.propTypes = {
  result: PropTypes.shape({}),
}.isRequired;
