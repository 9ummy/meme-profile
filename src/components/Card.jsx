import { useState, useRef } from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import styles from '../styles/Card.module.scss';
import axios from 'axios';

const Card = () => {
  const [imgSrc, setImgSrc] = useState('');
  const inputRef = useRef();

  const onUploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/image', formData);
      setImgSrc(res.data.imgSrc);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.strap} />
      {!imgSrc ? (
        <button
          className={styles.upload}
          onClick={() => inputRef.current.click()}
        >
          <FileImageOutlined />
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            ref={inputRef}
            onChange={(e) => onUploadImage(e.target.files[0])}
          />
        </button>
      ) : (
        <div
          className={styles.profile}
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      )}
    </div>
  );
};

export default Card;
