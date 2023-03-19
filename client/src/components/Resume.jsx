import React, { useRef } from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const Resume = ({ result }) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${result.fullName} Currículo`,
        onAfterPrint: () => alert("Print Successful!"),
    });

    const replaceWithBr = (string) => {
        return string.replace(/\n/g, "<br />");
    };

    if (JSON.stringify(result) === "{}") {
        return <ErrorPage />;
    }


    return (
        <>
        <div className='buttonGroup'>
				<button onClick={handlePrint}>Imprimir</button>
				<Link to='/send/resume' className='sendEmail'>
					Enviar por email
				</Link>
			</div>
        <main className='container' ref={componentRef}>
            <header className='header'>
                <div>
                    <h1>{result.fullName}</h1>
                    <p className='resumeTitle headerTitle'>
                        {result.currentPosition} ({result.currentTechnologies})
                    </p>
                    <p className='resumeTitle'>
                        {result.currentLength} ano(s) de experiência
                    </p>
                </div>
                <div>
                    <img
                        src={result.image_url}
                        alt={result.fullName}
                        className='resumeImage' />
                </div>
            </header>
            <div className='resumeBody'>
                <div>
                    <h2 className='resumeBodyTitle'>RESUMO DO PERFIL</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: replaceWithBr(result.objective),
                        }}
                        className='resumeBodyContent' />
                </div>
                <div>
                    <h2 className='resumeBodyTitle'>HISTÓRICO DE TRABALHO</h2>
                    {result.workHistory.map((work) => (
                        <p className='resumeBodyContent' key={work.name}>
                            <span style={{ fontWeight: "bold" }}>{work.name}</span> -{" "}
                            {work.position}
                        </p>
                    ))}
                </div>
                <div>
                    <h2 className='resumeBodyTitle'>PERFIL DE TRABALHO</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: replaceWithBr(result.jobResponsibilities),
                        }}
                        className='resumeBodyContent' />
                </div>
                <div>
                    <h2 className='resumeBodyTitle'>RESPONSABILIDADES</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: replaceWithBr(result.keypoints),
                        }}
                        className='resumeBodyContent' />
                </div>
            </div>
        </main>
        </>
    );
};

export default Resume;
