import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, featuredImage }) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchImagePreview = async () => {
      try {
        const previewUrl = await appwriteService.getFilePreview(featuredImage);
        setImagePreview(previewUrl);
      } catch (error) {
        console.error('Error fetching image preview:', error);
      }
    };

    fetchImagePreview();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imagePreview ? (
            <img src={imagePreview} alt={title} className="rounded-xl" />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-xl animate-pulse"></div> 
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
