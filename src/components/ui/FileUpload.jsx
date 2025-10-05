import React, { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import Button from './Button';

const FileUpload = ({ value, onChange, label = "Upload File", accept = ".pdf,.doc,.docx" }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          name: file.name,
          src: reader.result,
          type: file.type,
          size: file.size
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      {!value ? (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PDF, DOC, DOCX up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {value.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(value.size)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {value && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Replace File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;