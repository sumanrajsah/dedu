// CustomInput.js
import React, { useState, useRef } from 'react';
import  '../modal.css'; // Import your CSS file
import Image from 'next/image';
import { GifIcon, ImageIcon } from '../../svg';

interface UploadComponentsProps {
  onImageUpload: (files: FileList) => void;
  onGifUpload: (files: FileList) => void;
 
}

export const UploadComponents: React.FC<UploadComponentsProps> = ({ onImageUpload, onGifUpload }) => {

  const handleImageChange = (event:any) => {
    const files = event.target.files;
    onImageUpload(files);
  };

  const handleGifChange = (event:any) => {
    const files = event.target.files;
    onGifUpload(files);
  };



  return (
    <div className='upload-body'>
        <label className='upload-image' title='Image'>
            <ImageIcon/>
        <input  type='file' accept='image/*' onChange={handleImageChange} />
        </label>
        <label className='upload-image' title='GIF'>
        <GifIcon/>
        <input  type='file' accept='image/gif' onChange={handleGifChange} />
        </label>
    </div>
  );
};

