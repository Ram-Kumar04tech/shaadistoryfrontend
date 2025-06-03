import { v4 as uuidv4 } from 'uuid';

const uploadImage = async (file) => {
  // Cloudinary upload preset and URL from environment variables
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing. Please check your environment variables.');
  }

  // Create form data to send to Cloudinary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('public_id', `profile_${uuidv4()}`); // Unique filename
  formData.append('folder', 'dating_app/profiles'); // Organized folder structure
  formData.append('tags', 'profile,user_uploaded'); // For easier management
  formData.append('context', `alt=User profile photo`); // Accessibility
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Image upload failed');
    }

    const data = await response.json();
    
    // Return the relevant data for your application
    return {
      public_id: data.public_id,
      secure_url: data.secure_url,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes
    };
    
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};

export default uploadImage;