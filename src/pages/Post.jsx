import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Main Content Wrapper - Limits width to make it readable */}
                <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                    
                    {/* Image Section */}
                    <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 bg-gray-100">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full max-h-[400px] object-contain"
                        />

                        {/* Edit/Delete Buttons (Only for Author) */}
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg hover:bg-green-600">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="shadow-lg hover:bg-red-600" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="w-full mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 text-center">{post.title}</h1>
                    </div>

                    {/* Blog Content */}
                    <div className="browser-css text-gray-700 leading-relaxed text-justify px-2">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}