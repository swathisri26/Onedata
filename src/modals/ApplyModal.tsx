/*import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import RichTextEditor from '../components/RichTextEditor';
import './ApplyModal.css';


interface SkillOption {
  label: string;
  value: string;
}

interface ApplyModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  jobTitle?: string;
}

const skillsOptions: SkillOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: `Skill ${i + 1}`,
  label: `Skill ${i + 1}`,
}));

const ApplyModal: React.FC<ApplyModalProps> = ({ show, onClose, onSubmit, jobTitle }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
      <Modal.Title>Apply for {jobTitle || 'Job'}</Modal.Title>

      </Modal.Header>
      <Modal.Body className="apply-modal-body">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            skills: [],
            aboutMe: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            skills: Yup.array().min(1, 'Select at least one skill'),
            aboutMe: Yup.string().required('About Me is required'),
          })}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="apply-form-group">
                <label className="apply-form-label">First Name</label>
                <Field name="firstName" className="apply-form-control" />
                <ErrorMessage name="firstName" component="div" className="apply-error" />
              </div>

              <div className="apply-form-group">
                <label className="apply-form-label">Last Name</label>
                <Field name="lastName" className="apply-form-control" />
                <ErrorMessage name="lastName" component="div" className="apply-error" />
              </div>

              <div className="apply-form-group">
                <label className="apply-form-label">Email</label>
                <Field type="email" name="email" className="apply-form-control" />
                <ErrorMessage name="email" component="div" className="apply-error" />
              </div>

              <div className="apply-form-group">
                <label className="apply-form-label">Skills</label>
                <Select
                  isMulti
                  name="skills"
                  options={skillsOptions}
                  className="apply-select"
                  onChange={(selected) => setFieldValue('skills', selected)}
                  classNamePrefix="react-select"
                />
                <ErrorMessage name="skills" component="div" className="apply-error" />
              </div>

              <div className="apply-form-group">
                <label className="apply-form-label">About Me</label>
                <RichTextEditor
                  value={values.aboutMe}
                  onChange={(val: string) => setFieldValue('aboutMe', val)}
                />
                <ErrorMessage name="aboutMe" component="div" className="apply-error" />
              </div>

              <div className="d-flex justify-content-end mt-4 apply-modal-footer">
                <Button variant="secondary" onClick={onClose} className="me-2">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Submit Application
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyModal;*/

import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import jsPDF from 'jspdf';

type ApplyModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  jobTitle: string;
};

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'mongodb', label: 'MongoDB' },
];

const ApplyModal: React.FC<ApplyModalProps> = ({ show, onClose, onSubmit, jobTitle }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      skills: [] as { value: string; label: string }[],
      resume: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      skills: Yup.array().min(1, 'Select at least one skill'),
      resume: Yup.string().required('Resume is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      setTimeout(() => {
        generatePDF(values);
      }, 100);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('resume', file.name);
    }
  };

  const generatePDF = (values: typeof formik.values) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Job Application Summary', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${values.name}`, 20, 40);
    doc.text(`Email: ${values.email}`, 20, 50);
    doc.text(`Applied for: ${jobTitle}`, 20, 60);
    doc.text(`Skills: ${values.skills.map((s) => s.label).join(', ')}`, 20, 70);
    doc.text(`Resume: ${values.resume}`, 20, 80);
    doc.save(`${values.name}_Application.pdf`);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for {jobTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit} className="apply-form">
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.name && formik.touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="skills" className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={formik.values.skills}
              onChange={(selected) => formik.setFieldValue('skills', selected)}
            />
           
          </Form.Group>

          <Form.Group controlId="resume" className="mb-3">
            <Form.Label>Upload Resume</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="resume-upload"
            />
            {formik.touched.resume && formik.errors.resume && (
              <div className="text-danger mt-1">{formik.errors.resume}</div>
            )}
          </Form.Group>

          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => generatePDF(formik.values)}
              disabled={
                !formik.values.name ||
                !formik.values.email ||
                formik.values.skills.length === 0 ||
                !formik.values.resume
              }
            >
              Download PDF
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyModal;
