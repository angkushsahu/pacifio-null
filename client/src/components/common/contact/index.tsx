import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../loading";
import { validateEmail } from "utils";
import { IContact } from "types";
import { useContactUsMutation } from "store/queries";

const Contact = () => {
    const [contactUs, { isLoading }] = useContactUsMutation();
    const [inputValues, setInputValues] = useState<IContact>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const onContact = async (e: FormEvent) => {
        e.preventDefault();
        const { name, email, message, subject } = inputValues;

        if (!name || !email || !message.trim() || !subject) {
            toast.warn("Please validate all the fields");
            return;
        }
        if (!validateEmail(email)) {
            toast.warn("E-mail format is not correct");
            return;
        }

        try {
            const response = await contactUs(inputValues).unwrap();
            if (response.success) {
                toast.success(response.message);
                setInputValues({ name: "", email: "", subject: "", message: "" });
            }
        } catch (err: any) {
            toast.error(err.data.message as string);
        }
    };

    const validateInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const getQueryType = () => {
        return inputValues.subject ? inputValues.subject[0].toUpperCase() + inputValues.subject.substring(1) : "Message";
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <main className="form-container" style={{ padding: "2rem" }}>
                    <form onSubmit={onContact}>
                        <h1 className="text-center">Contact Us</h1>
                        <div className="input-container">
                            <label htmlFor="name">Enter your name</label>
                            <input type="text" name="name" id="name" placeholder="e.g. John Doe" value={inputValues.name} onChange={validateInput} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Enter your e-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="e.g. johndoe@gmail.com"
                                value={inputValues.email}
                                onChange={validateInput}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="subject">Enter Subject</label>
                            <select
                                name="subject"
                                id="subject"
                                value={inputValues.subject}
                                onChange={validateInput}
                                className={inputValues.subject === "" ? "burn_color" : ""}
                            >
                                <option value="" disabled={true}>
                                    -- Select --
                                </option>
                                <option value="query">Query</option>
                                <option value="complaint">Complaint</option>
                                <option value="feedback">Feedback</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor="message">Enter Your {getQueryType()}</label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder={`Enter your ${getQueryType()}`}
                                value={inputValues.message}
                                onChange={validateInput}
                            ></textarea>
                        </div>
                        <button type="submit" disabled={isLoading}>
                            Send {getQueryType()}
                        </button>
                    </form>
                </main>
            )}
        </>
    );
};

export default Contact;
