import axios from "axios";
import emailjs from "@emailjs/browser";
const env = require("../env.json")


const sendResume = (formData, setLoading, navigate) => {
    setLoading(true);

        axios
    .post("http://localhost:3001/resume/send", formData, {})
    .then((res) => {
        console.log(
            res.data.data
        )
        if (res.data.message) {
            const {
                cover_letter,
                recruiter_email,
                my_email,
                applicant_name,
                resume,
            } = res.data.data;
            emailjs
                .send(
                    `${env.EMAIL_SERVICE_ID}`,
                    `${env.TEMPLATE_ID}`,
                    {
                        cover_letter,
                        applicant_name,
                        recruiter_email,
                        my_email,
                        resume,
                    },
                    `${env.EMAILJS_PUBLIC_KEY}`,
                )
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        alert("Email enviado");
                        navigate("/");
                    }
                })
                .catch((err) => console.error(err));
        }
    })
    .catch((err) => console.error(err));
};



export default sendResume;
