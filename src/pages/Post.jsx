import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import PagesContainer from "../components/containers/PagesContainer";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = useMemo(() => {
    return post && userData ? post.userId === userData.$id : false;
  }, [post, userData]);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (post?.featuredImage) {
      const fetchImagePreview = async () => {
        try {
          const previewUrl = await appwriteService.getFilePreview(post.featuredImage);
          setImagePreview(previewUrl);
        } catch (error) {
          console.error("Error fetching image preview:", error);
        }
      };

      fetchImagePreview();
    }
  }, [post]);

  const deletePost = () => {
    if (post) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="py-8">
      <PagesContainer>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {imagePreview && (
            <img src={imagePreview} alt={post.title} className="rounded-xl" />
          )}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </PagesContainer>
    </div>
  ) : null;
}

export default Post;
