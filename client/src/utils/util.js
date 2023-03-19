import axios from "axios";

const sendResume = (formData, setLoading, navigate) => {
    setLoading(true);

    axios
        .post("http://localhost:3001/resume/send", formData, {})
        .then((res) => {
            console.log("Response", res);
        })
        .catch((err) => console.error(err));
};

export default sendResume;
