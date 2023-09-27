/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import ErrorPage from './ErrorPage';

function Resume({ result }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result.fullName}-resume}`,
    onAfterPrint: () => alert('Print Successful!'),
  });

  const replaceWithBr = (string) => string.replace(/\n/g, '<br />');

  if (JSON.stringify(result) === '{}') {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="buttonGroup">
        <button type="button" onClick={handlePrint}>Imprimir</button>
        <Link to="/send/resume" className="sendEmail">
          Enviar por email
        </Link>
      </div>
      <main className="container" ref={componentRef}>
        <header className="header">
          <div>
            <h1>{result.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {result.currentPosition}
              {' '}
              (
              {result.currentTechnologies}
              )
            </p>
            <p className="resumeTitle">
              {result.currentLength}
              {' '}
              ano(s) de experiência
            </p>
          </div>
          {/* <div>
            <img
              src={result.image_url}
              alt={result.fullName}
              className="resumeImage"
            />
          </div> */}
        </header>
        <div className="resumeBody">
          <div>
            <h2 className="resumeBodyTitle">RESUMO DO PERFIL</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.objective),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">HISTÓRICO DE TRABALHO</h2>
            {result.workHistory.map((work) => (
              <p className="resumeBodyContent" key={work.name}>
                <span style={{ fontWeight: 'bold' }}>{work.name}</span>
                {' '}
                -
                {' '}
                {work.position}
              </p>
            ))}
          </div>
          <div>
            <h2 className="resumeBodyTitle">PERFIL DE TRABALHO</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.jobResponsibilities),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">RESPONSABILIDADES</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.keypoints),
              }}
              className="resumeBodyContent"
            />
          </div>
        </div>
      </main>
    </>
  );
}

Resume.propTypes = {
  result: PropTypes.objectOf({}),
}.isRequired;

export default Resume;
