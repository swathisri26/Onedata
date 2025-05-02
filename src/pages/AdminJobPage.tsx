import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Job, addJob, updateJob, deleteJob } from '../redux/slices/jobSlice';
import { Button, Form, Modal, Badge } from 'react-bootstrap';
import './AdminJobPage.css';

const AdminJobPage = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector((state: RootState) => state.jobs.jobs);

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    experience: 0,
    skills: '',
    description: '',
    logo: '',
  });

  // Create new job handler
  const handleCreateJob = () => {
    if (!formData.title || !formData.company || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newJob: Job = {
      id: Date.now().toString(), // Generates unique ID per session
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      applied: false,
      logo: formData.logo || '/assets/default-logo.png',
    };
  
    dispatch(addJob(newJob));
    setShowModal(false);
  
    // Optional: reset form after adding
    setFormData({
      title: '',
      company: '',
      experience: 0,
      skills: '',
      description: '',
      logo: '',
    });
  };
  

  

  // Update job handler
  const handleUpdateJob = () => {
    if (selectedJob) {
      dispatch(updateJob({ ...selectedJob, ...formData, skills: formData.skills.split(',') }));
      setShowModal(false);
    }
  };

  // Delete job handler
  const handleDeleteJob = (id: string) => {
    dispatch(deleteJob(id));
  };

  // Open modal with job data for editing
  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      experience: job.experience,
      skills: job.skills.join(','),
      description: job.description,
      logo: job.logo,
    });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Job Management</h2>

      {/* Button to add new job */}
      <Button
  variant="primary"
  onClick={() => {
    setSelectedJob(null); // Reset editing state
    setFormData({
      title: '',
      company: '',
      experience: 0,
      skills: '',
      description: '',
      logo: '',
    });
    setShowModal(true);
  }}
>
  Add New Job
</Button>


      <div className="mt-4">
        <h3>Existing Jobs</h3>
        {allJobs.map((job) => (
          <div key={job.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title text-primary mb-1">{job.title}</h5>
                <p className="card-text mb-1">{job.company}</p>
                <p className="card-text">
                  <strong>Skills:</strong>{' '}
                  {job.skills.map((s, i) => (
                    <Badge bg="secondary" className="me-1" key={i}>
                      {s}
                    </Badge>
                  ))}
                </p>
              </div>
              <div>
                <Button variant="warning" onClick={() => openEditModal(job)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteJob(job.id)} className="ms-2">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Modal (Create/Update) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob ? 'Edit Job' : 'Add New Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Job Title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                placeholder="Experience Required"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Skills"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job Description"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="Logo URL (optional)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={selectedJob ? handleUpdateJob : handleCreateJob}
          >
            {selectedJob ? 'Update Job' : 'Create Job'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminJobPage;
