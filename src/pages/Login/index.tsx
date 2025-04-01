import React, { useState } from "react";
import { LoginContainer } from "styles/loginstyle";
import { Input, Button, Form } from "antd";
import { login } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useLogin } from "services/api/useLogin";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const [form] = Form.useForm();
  const { mutate: mutatelogin } = useLogin();
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // 로그인
  const handleLoginPress = async () => {
    mutatelogin(
      {
        userId: id,
        password: password,
      },
      {
        onSuccess: async (res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("userId", res.data.userId);
          if (autoLogin) {
            await localStorage.setItem("autoLogin", "true");
          }

          dispatch(
            login({
              id: res.data.userId,
              auth: true,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          );
          navigation("/home"); // 인증 성공 후 홈으로 이동
        },
      }
    );
  };

  return (
    <LoginContainer>
      <Form form={form} className="login-form" onFinish={handleLoginPress}>
        <h1 className="login-title1">TEST SYSTEM</h1>
        <h1 className="login-title2">LOGIN</h1>
        <Form.Item
          name="id"
          rules={[{ required: true, message: "아이디를 입력해주세요." }]}
        >
          <Input
            placeholder="아이디 입력"
            aria-label="아이디 입력"
            className="form-item"
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password
            placeholder="비밀번호 입력"
            aria-label="비밀번호 입력"
            className="form-item"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
