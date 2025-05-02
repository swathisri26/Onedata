/*import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/slices/authSlice';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(signup(values)); // Mock signup
    navigate('/jobs'); // Redirect after signup
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-3">Sign Up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger mt-1" />
            </div>

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

            <Button type="submit" variant="primary" className="w-100">Sign Up</Button>
          </Form>
        </Formik>
        <div className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/slices/authSlice';
import * as Yup from 'yup';
import { Container, Button, Card } from 'react-bootstrap';
import './Auth.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(signup(values));
    navigate('/');
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <h3 className="text-center mb-4">Signup</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label>Name</label>
                  <Field name="name" type="text" className="form-control" />
                  {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

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

                <Button type="submit" variant="success" className="w-100">Signup</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;*/

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    localStorage.setItem('authUser', JSON.stringify(values));
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
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

              <Button type="submit" variant="primary" className="w-100">Signup</Button>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
