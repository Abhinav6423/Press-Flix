import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import BookForm from "./BookForm";
import TechForm from "./TechForm";
import { createPitchApi } from "../../api-calls/createPitch";
import PitchReady from "../PitchReady";
const MainForm = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    book: {},
    tech: {},
  });

  // Allow only valid categories
  if (!["book", "tech"].includes(category)) {
    return <Navigate to="/category" replace />;
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (!title) return;

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setSlug(generatedSlug);
  }, [title]);

  // Update only current category data
  const setCategoryData = (newData) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...newData,
      },
    }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        slug,
        category,
        data: data[category],
      };

      const res = await createPitchApi(payload);

      if (!res?.success) {
        if (res?.message === "Unauthorized") {
          navigate("/login");
          return;
        }

        toast.error(res?.message || "Failed to create pitch");
        return;
      }

      toast.success("Pitch created successfully 🎉");
      navigate(`/pitch-ready/${slug}`);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  switch (category) {
    case "tech":
      return (
        <TechForm
          title={title}
          slug={slug}
          data={data.tech}
          setTitle={setTitle}
          setSlug={setSlug}
          setData={setCategoryData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      );

    case "book":
      return (
        <BookForm
          title={title}
          slug={slug}
          data={data.book}
          setTitle={setTitle}
          setSlug={setSlug}
          setData={setCategoryData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      );

    default:
      return <Navigate to="/category" replace />;
  }
};

export default MainForm;
