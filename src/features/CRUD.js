import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from './auth/authSlice';

const CRUD = () => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/crud_api/files/');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', newFileName);

    try {
      await axios.post('http://127.0.0.1:8000/crud_api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crud_api/download/${fileName}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      console.log(fileName)
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/crud_api/delete/${fileName}`);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
      <div className='contain'>
        <div className='container'>

          <div>
            <h1>All Files</h1>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.length > 0 ? (
                files.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>
                    <button onClick={() => handleDownload(file.name)}>Download</button>{' '}
                    <button onClick={() => handleDelete(file.name)}>Delete</button>
                  </td>
                </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="2">No files available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
        <div className='container'>
          <div>
            <h1>Upload New File</h1>
          </div>
          <div>
              <input type="text" placeholder="File Name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
        <div className='container'>
          <div>
              <button onClick={handleLogout}>LogOut</button>
          </div>
        </div>
      </div>
        
        
  );
};

export default CRUD;
