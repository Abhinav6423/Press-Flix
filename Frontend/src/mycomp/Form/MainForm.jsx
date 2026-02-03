import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import TechForm from "./TechForm";
import { createPitchApi } from "../../api-calls/createPitch";

const MainForm = () => {
  const { category } = useParams();
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [data, setData] = useState({
    book: {},
    tech: {},
  });

  // only allow known categories
  if (!["book", "tech"].includes(category)) {
    return <Navigate to="/category" replace />;
  }

  // update only current category data
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
    try {
      const payload = {
        title,
        slug,
        category,
        data: data[category],
      };

      const res = await createPitchApi(payload);

      if (!res?.success) {
        toast.error(res?.message || "Failed to create pitch");
        return;
      }

      toast.success("Pitch created successfully 🎉");
    
        navigate("/home");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
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
        />
      );

    default:
      return null;
  }
};

export default MainForm;
