import { Button, Col, InputField, Row, getItem, setItem } from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import Axios from 'axios';
import { useLoadingStore } from "@/store/utils";
import { jwtDecode } from "jwt-decode";

const defaultValue = {
  email: "",
  password: ""
};

const Login = (props: any) => {
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

    const email = data?.email
    const password = data?.password

    const verif = await Axios.post(`${process.env.API_URL!}/v1/sign-in`, {
      email, password
    });
    const { acknowledge, result, message } = verif.data

    if (!acknowledge) {
      alert(message)
    } else {
      alert(message)
      const bio = jwtDecode(result);
      console.info('bio', bio)

      setLoading({
        content: true
      });
      Cookies.set(
        "user",
        JSON.stringify({
          name: bio.name,
          email: bio.email,
          role: bio.role,
          token: result
        }),
        { expires: 7 }
      );

      setTimeout(() => {
        props.router.push("/admin/dashboard");
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
            <b>User Management</b>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="login-box-msg">Sign in to start your session</p>
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
                  title="Sign In"
                />
                <Link
                  href={'/register'}
                  className="float-end"
                  style={{ cursor: "pointer" }}
                >
                  Register Here
                </Link>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
