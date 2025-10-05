import React, { useState, useRef } from 'react';
import { Upload, X, User, Camera } from 'lucide-react';
import Button from './Button';

const ImageUpload = ({ 
  value, 
  onChange, 
  className = '', 
  label = 'Profile Picture',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  ...props 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (file) => {
    setError('');
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        src: e.target.result,
        name: file.name,
        size: file.size,
        type: file.type
      };
      onChange(imageData);
    };
    reader.readAsDataURL(file);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  // Handle remove image
  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Open file picker
  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className={`relative ${className}`}>
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          {...props}
        />

        {/* Image preview or upload area */}
        {value ? (
          <div className="relative group">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={value.src}
                alt={value.name || 'Profile picture'}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={handleRemove}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {value.name} ({Math.round(value.size / 1024)} KB)
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openFilePicker}
              >
                <Camera size={16} className="mr-1" />
                Change Photo
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {/* Upload icon */}
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User size={24} className="text-gray-400 dark:text-gray-500" />
              </div>

              {/* Upload text */}
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop your profile picture here, or
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openFilePicker}
                >
                  <Upload size={16} className="mr-1" />
                  Choose File
                </Button>
              </div>

              {/* File requirements */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports: JPG, PNG, GIF up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;