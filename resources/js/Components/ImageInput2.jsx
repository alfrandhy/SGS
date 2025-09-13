import { forwardRef, useEffect, useRef, useState } from 'react';

const ImageInput2 = forwardRef(function ImageInput2(
  { 
    type = 'file', 
    className = '', 
    isFocused = false,
    onFileSelect, // New prop for file selection callback
    ...props 
  }, 
  ref
) {
  const inputRef = ref || useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Create preview URL if needed
    if (onFileSelect) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        onFileSelect(file, reader.result);
      };
      reader.readAsDataURL(file);
    } else if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <>
      <input
        {...props}
        type={type}
        onChange={handleChange}
        accept="image/*" // Only accept image files
        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${className}`}
        ref={inputRef}
      />
      {previewUrl && (
        <div className="mt-2">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-40 rounded"
          />
        </div>
      )}
    </>
  );
});

export default ImageInput2;
