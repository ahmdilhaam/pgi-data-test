import { Button, Col, InputField, Row, getItem, setItem } from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "next/router";
import Link from "next/link";
import Axios from 'axios';
import { useLoadingStore } from "@/store/utils";

const defaultValue = {
    name: "",
    email: "",
    password: ""
};

const Register = (props: any) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty, isValid }
    } = useForm({
        mode: "onChange",
        defaultValues: defaultValue
    });
    const [password, setPassword] = useState(true);
    const { setLoading } = useLoadingStore();

    const onSubmit = async (data: any) => {

        const name = data?.name
        const email = data?.email
        const password = data?.password

        const verif = await Axios.post(`${process.env.API_URL!}/v1/sign-up`, {
            name, email, password
        });
        const { acknowledge, message } = verif.data

        if (!acknowledge) {
            alert(message)
        } else {
            alert(message)

            setTimeout(() => {
                props.router.push("/login");
                setLoading({
                    content: false
                });
            }, 1300);
        }
    };

    return (
        <div className="login-box container" style={{ marginTop: "10%" }}>
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <div className="h1">
                        <b>Register</b>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="login-box-msg">Register here to start your session</p>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            register={register("name")}
                            iconFormGroup="fas fa-user"
                            formGroup
                            errors={errors?.email}
                            placeholder="Name"
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="text"
                            register={register("email")}
                            iconFormGroup="fas fa-envelope"
                            formGroup
                            errors={errors?.email}
                            placeholder="Email"
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="text"
                            autoComplete={"off"}
                            register={register("password")}
                            placeholder="Password"
                            iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
                            customeCss={password ? "password-hide-css" : ""}
                            btnAction={() => setPassword(!password)}
                            formGroup
                            errors={errors?.password}
                        />
                        <Row>
                            <Col size="12">
                                <Button
                                    loading
                                    disabled={!isDirty || !isValid}
                                    textLoading="Waiting"
                                    type="submit"
                                    color="primary"
                                    block
                                    title="Sign Up"
                                />
                                <Link
                                    href={'/login'}
                                    className="float-end"
                                    style={{ cursor: "pointer" }}
                                >
                                    Back to Login
                                </Link>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Register);
