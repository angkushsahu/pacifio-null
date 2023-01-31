import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "utils";
import backgroundImage from "assets/formBackground.svg";
import LoadingPage from "components/common/loading";
import { useForgotPasswordMutation } from "store/queries";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [forgotPassword, { isLoading, isError, error }] = useForgotPasswordMutation();

    const onForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.warn("Please enter your e-mail");
            return;
        }
        if (!validateEmail(email)) {
            toast.warn("E-mail format is not correct");
            return;
        }

        try {
            const result = await forgotPassword({ email }).unwrap();
            if (result.success) {
                toast.success(result.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to find your account");
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
        }
    }, [isError, error]);

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <main className="form-container">
                    <div className="image-container">
                        <img src={backgroundImage} alt="background" loading="lazy" />
                    </div>
                    <form onSubmit={onForgotPassword}>
                        <h1>Forgot Password</h1>
                        <div className="input-container">
                            <label htmlFor="email">Enter your e-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="e.g. johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            Send email
                        </button>
                    </form>
                </main>
            )}
        </>
    );
};

export default ForgotPassword;
