import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

function Todo({
  id,
  name,
  completed,
  toggleTaskCompleted,
  deleteTask,
  editTask,
  taskPhoto,
  addPhoto, 
}) {
  const [photo, setPhoto] = useState(taskPhoto || null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    setPhoto(imageSrc);
    addPhoto(id, imageSrc); 
    setShowCameraModal(false);
  };

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button className="btn" onClick={() => editTask(id)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button className="btn" onClick={() => setShowCameraModal(true)}>
          Take Photo
        </button>
        {photo && (
          <button className="btn btn__secondary" onClick={() => setShowPhotoModal(true)}>
            View Photo
          </button>
        )}
        <button className="btn btn__danger" onClick={() => deleteTask(id)}>
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
      {showCameraModal && (
        <div className="modal">
          <div className="modal-content">
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={220}
              videoConstraints={{ facingMode: "user" }}
            />
            <button className="btn-modal btn-save" onClick={handleCapture}>Save Photo</button>
            <button className="btn-modal btn-cancel" onClick={() => setShowCameraModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showPhotoModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPhotoModal(false)}>&times;</span>
            <img src={photo} alt="Task" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      )}
    </li>
  );
}

export default Todo;
