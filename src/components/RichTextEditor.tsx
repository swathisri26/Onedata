import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => (
  <div className="rte-wrapper">
    <ReactQuill value={value} onChange={onChange} />
  </div>
);

export default RichTextEditor;
