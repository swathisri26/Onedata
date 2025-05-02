/*import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Job } from '../redux/slices/jobSlice';
import { Modal, Button, Form } from 'react-bootstrap';

const JobListPage = () => {
  const allJobs = useSelector((state: RootState) => state.jobs.jobs);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const jobsToDisplay = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Listings</h2>

      <Form.Control
        type="text"
        placeholder="Search jobs by title, company, or skills..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {jobsToDisplay.map((job) => (
        <div key={job.id} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title text-primary" style={{ cursor: 'pointer' }} onClick={() => setSelectedJob(job)}>
                {job.title}
              </h5>
              <p className="card-text mb-1">{job.company}</p>
              <p className="card-text">
                <strong>Skills:</strong> {job.skills.join(', ')}
              </p>
            </div>
            <Button disabled={job.applied} variant={job.applied ? 'success' : 'primary'}>
              {job.applied ? 'Applied' : 'Apply for Job'}
            </Button>
          </div>
        </div>
      ))}

   
      <div className="d-flex justify-content-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Button key={n} variant={n === currentPage ? 'dark' : 'light'} onClick={() => setCurrentPage(n)}>
            {n}
          </Button>
        ))}
      </div>

    
      <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <img src={selectedJob.logo} alt="logo" style={{ maxWidth: '80px' }} className="mb-3" />
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Experience Required:</strong> {selectedJob.experience} years</p>
              <p><strong>Skills:</strong> {selectedJob.skills.join(', ')}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedJob(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobListPage;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Job } from '../redux/slices/jobSlice';
import { Modal, Button, Form } from 'react-bootstrap';
import ApplyModal from '../modals/ApplyModal';
import './JobListPage.css';


const JobListPage = () => {
  const allJobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobToApply, setJobToApply] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const jobsToDisplay = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleApply = (job: Job) => {
    setJobToApply(job);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = (data: any) => {
    console.log('Application Submitted:', data);
    if (jobToApply) {
      dispatch(applyJob(jobToApply.id));
    }
    setShowApplyModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Listings</h2>

      <Form.Control
        type="text"
        placeholder="Search jobs by title, company, or skills..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {jobsToDisplay.map((job) => (
        <div key={job.id} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5
                className="card-title text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedJob(job)}
              >
                {job.title}
              </h5>
              <p className="card-text mb-1">{job.company}</p>
              <p className="card-text">
                <strong>Skills:</strong> {job.skills.join(', ')}
              </p>
            </div>
            <Button
              disabled={job.applied}
              variant={job.applied ? 'success' : 'primary'}
              onClick={() => !job.applied && handleApply(job)}
            >
              {job.applied ? 'Applied' : 'Apply for Job'}
            </Button>
          </div>
        </div>
      ))}

    
      <div className="d-flex justify-content-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant={n === currentPage ? 'dark' : 'light'}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </Button>
        ))}
      </div>

      <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <img
                src={selectedJob.logo}
                alt="logo"
                style={{ maxWidth: '80px' }}
                className="mb-3"
              />
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Experience Required:</strong> {selectedJob.experience} years</p>
              <p><strong>Skills:</strong> {selectedJob.skills.join(', ')}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedJob(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {jobToApply && (
        <ApplyModal
          show={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onSubmit={handleSubmitApplication}
          jobTitle={jobToApply.title}
        />
      )}
    </div>
  );
};

export default JobListPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../modals/ConfirmationModel'; // relative path

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Job, applyJob } from '../redux/slices/jobSlice';
import { Button, Form, Modal, Badge } from 'react-bootstrap';
import ApplyModal from '../modals/ApplyModal';
import './JobListPage.css'; // optional CSS for styles

const JobListPage = () => {
  const allJobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const jobsToDisplay = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = (formData: any) => {
    if (selectedJob) {
      dispatch(applyJob(selectedJob.id));
      setShowApplyModal(false);
      setShowConfirmation(true); 
      // You can trigger success modal here later
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Listings</h2>


      <Form.Control
        type="text"
        placeholder="Search by title, company, or skills..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {jobsToDisplay.map((job) => (
        <div key={job.id} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
            <h5
  className="card-title text-primary mb-1"
  style={{ cursor: 'pointer' }}
  onClick={() => {
    setSelectedJob(job);
    setShowJobDetail(true);
  }}
>
  {job.title}
</h5>

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
              {job.applied ? (
                <Badge bg="success" className="p-2">Applied</Badge>
              ) : (
                <Button variant="primary" onClick={() => handleApplyClick(job)}>
                  Apply for Job
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

  
      <div className="d-flex justify-content-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant={n === currentPage ? 'dark' : 'light'}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </Button>
        ))}
      </div>
      

    
<Modal show={showJobDetail} onHide={() => setShowJobDetail(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>{selectedJob?.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedJob && (
      <>
        <img src={selectedJob.logo} alt="logo" style={{ maxWidth: '80px' }} className="mb-3" />
        <p><strong>Company:</strong> {selectedJob.company}</p>
        <p><strong>Experience Required:</strong> {selectedJob.experience} years</p>
        <p><strong>Skills:</strong> {selectedJob.skills.join(', ')}</p>
        <p><strong>Description:</strong> {selectedJob.description}</p>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowJobDetail(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


{selectedJob && (
  <ApplyModal
    show={showApplyModal}
    onClose={() => setShowApplyModal(false)}
    onSubmit={handleSubmitApplication}
    jobTitle={selectedJob.title}
  />
)}

      
    </div>
  );
};

export default JobListPage;*/


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Job } from '../redux/slices/jobSlice';
import { Button, Form, Modal, Badge } from 'react-bootstrap';
import ApplyModal from '../modals/ApplyModal';
import ConfirmationModal from '../modals/ConfirmationModel'; // Import ConfirmationModal
import './JobListPage.css'; // optional CSS for styles
import { applyJob, submitApplication } from '../redux/slices/jobSlice';
import ErrorModal from '../modals/ErrorModal'; // Import ErrorModal 
const JobListPage = () => {
  const allJobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Modal States
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const jobsToDisplay = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = (formData: any) => {
    try {
      if (!selectedJob) throw new Error('No job selected.');
  
      // Format skills (convert to string)
      const formattedSkills = Array.isArray(formData.skills)
        ? formData.skills.map((skill: any) =>
            typeof skill === 'string' ? skill : skill.label
          ).join(' ')
        : formData.skills;
  
      // Build application object
      const application = {
        jobId: selectedJob.id,
        name: formData.name,
        email: formData.email,
        skills: formattedSkills,
        resume: formData.resume, // could be file name or base64 depending on your logic
      };
  
      dispatch(applyJob(selectedJob.id));
      dispatch(submitApplication(application));
  
      setShowApplyModal(false);
      setShowConfirmation(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong.');
      setShowErrorModal(true);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Listings</h2>

      <Form.Control
        type="text"
        placeholder="Search by title, company, or skills..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {jobsToDisplay.map((job) => (
        <div key={job.id} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5
                className="card-title text-primary mb-1"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedJob(job);
                  setShowJobDetail(true);
                }}
              >
                {job.title}
              </h5>
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
              {job.applied ? (
                <Badge bg="success" className="p-2">Applied</Badge>
              ) : (
                <Button variant="primary" onClick={() => handleApplyClick(job)}>
                  Apply for Job
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant={n === currentPage ? 'dark' : 'light'}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </Button>
        ))}
      </div>

      {/* Job Details Modal */}
      <Modal show={showJobDetail} onHide={() => setShowJobDetail(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <img src={selectedJob.logo} alt="logo" style={{ maxWidth: '80px' }} className="mb-3" />
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Experience Required:</strong> {selectedJob.experience} years</p>
              <p><strong>Skills:</strong> {selectedJob.skills.join(', ')}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJobDetail(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyModal
          show={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onSubmit={handleSubmitApplication}
          jobTitle={selectedJob.title}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        jobTitle={selectedJob?.title || ''}
      />
             
        {/* Error Modal */}
        <ErrorModal
  show={showErrorModal}
  onClose={() => setShowErrorModal(false)}
  errorMessage={errorMessage}
/>

    </div>
  );
};

export default JobListPage;
