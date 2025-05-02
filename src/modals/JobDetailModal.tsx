import { Modal, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: number;
  skills: string[];
  description: string;
}

interface JobDetailModalProps {
  job: Job | null;
  show: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, show, onClose }) => {
  const generatePDF = () => {
    if (job) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(`Job Title: ${job.title}`, 10, 10);
      doc.text(`Company: ${job.company}`, 10, 20);
      doc.text(`Experience Required: ${job.experience} years`, 10, 30);
      doc.text(`Skills: ${job.skills.join(', ')}`, 10, 40);
      doc.text(`Description: ${job.description}`, 10, 50);
      doc.save(`${job.title}_Details.pdf`);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{job?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {job && (
          <>
            <img src={job.logo} alt="logo" style={{ maxWidth: '80px' }} className="mb-3" />
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Experience Required:</strong> {job.experience} years</p>
            <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
            <p><strong>Description:</strong> {job.description}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={generatePDF}>Download PDF</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailModal;
