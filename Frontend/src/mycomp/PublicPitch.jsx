import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPitchBySlugApi } from "../api-calls/pitchUrlOpen";
import BookLandingPage from "../components/PitchTemplate";
import Loader from "../mycomp/Loader";

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

    if (loading) return <Loader />;
    if (!pitch) return <div className="p-10">Not found</div>;

    return <BookLandingPage pitchData={pitch} />;

};

export default PublicPitch;
