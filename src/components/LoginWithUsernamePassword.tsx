import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { userLoginApi } from '@/api/user';
import { login, logout, setAvatar } from '@/store/userSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import { setToken } from '@/utils/cache/local-storage';
import { message } from 'antd';




type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginWithUsernamePassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const onFinish = async (values: any) => {
    const {username, password} = values
    await userLoginApi({username,password})
      .then((res)=>{
        console.log(res)
        const {username,avatar,token} =res.data
        dispatch(login())
        setToken(token)
        dispatch(setAvatar(avatar))
      })
      .catch((error)=>{
        message.info(error)
      })

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default LoginWithUsernamePassword;