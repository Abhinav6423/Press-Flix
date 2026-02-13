import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPitchBySlugApi } from "../api-calls/pitchUrlOpen";
import BookLandingPage from "../components/BookLandingPage";

const PublicPitch = () => {
    const { slug } = useParams();
    const [pitch, setPitch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await getPitchBySlugApi(slug);

            if (res.success) {
                setPitch(res.data);
            }

            setLoading(false);
        };

        load();
    }, [slug]);

    if (loading) return <div className="p-10">Loading...</div>;
    if (!pitch) return <div className="p-10">Not found</div>;

    if (pitch.category === "book") {
        return <BookLandingPage pitchData={pitch} />;
    }

    return null;
};

export default PublicPitch;
