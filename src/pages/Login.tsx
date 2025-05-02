
/*import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(login(values));
    navigate('/jobs');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-3">Login</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger mt-1" />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger mt-1" />
            </div>

            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Formik>
        <div className="text-center mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import * as Yup from 'yup';
import { Container, Button, Card } from 'react-bootstrap';
import './Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(login(values));
    navigate('/');
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label>Email</label>
                  <Field name="email" type="email" className="form-control" />
                  {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <Field name="password" type="password" className="form-control" />
                  {touched.password && errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <Button type="submit" variant="primary" className="w-100">Login</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;*/
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import './Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    const savedUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (savedUser.email === values.email && savedUser.password === values.password) {
      dispatch(setAuth(true));
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <div className="mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <div className="text-danger"><ErrorMessage name="email" /></div>
              </div>

              <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <div className="text-danger"><ErrorMessage name="password" /></div>
              </div>

              <Button type="submit" variant="primary" className="w-100">Login</Button>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
