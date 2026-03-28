import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import { useAuth } from '../../context/Auth.context'
import Navbar from './Navbar';
import Dashboard from '../DashboardComp/Dashboard';
import { getTopPerformingPitch } from "../../api-calls/topPerformingPitch.js"
import { getAllUsersPitchCreated } from "../../api-calls/allUsersPitchCreated.js"
const HomePage = () => {
    const { userData: user, loading, logoutUser } = useAuth();
    const [topPitch, setTopPitch] = useState({})
    const [allPitches, setAllPitches] = useState([])

    // get Top performing pitch

    useEffect(() => {
        const fetchTopPerformingPitch = async () => {
            try {
                const res = await getTopPerformingPitch();
                if (res.success) {
                    console.log(res.data)
                    setTopPitch(res.data)
                }
                else {
                    console.log("Smthing wrong took place")
                }
            } catch (error) {
                console.error("Error fetching top performing pitch:", error);
            }
        }
        fetchTopPerformingPitch();
    }, [])


    // fetch all pitches data 


    useEffect(() => {
        const fetchAllPitches = async () => {
            try {
                const res = await getAllUsersPitchCreated();
                if (res.success) {
                    setAllPitches(res.data.data)
                    console.log('All Pitches data is', res.data.data)
                }
                else {
                    console.log('Smthing error is coming')
                }
            } catch (error) {
                console.error("Error fetching all pitches:", error);
            }
        }
        fetchAllPitches()
    }, [])



    // chart data 
    const chartData = useMemo(() => {
        return allPitches.map((pitch) => ({
            name:
                pitch.title.length > 15
                    ? pitch.title.slice(0, 15) + "..."
                    : pitch.title,
            views: pitch.analytics?.views ?? 0,
            waitlists: pitch.analytics?.waitlistCount ?? 0,
        }));
    }, [allPitches]);



    return (
        // Changed h-screen to min-h-screen and w-screen to w-full
        <div className="min-h-screen w-full bg-black flex flex-col">
            <Navbar user={user} logoutUser={logoutUser} />
            {/* Added flex-grow to dashboard so it takes up remaining space */}
            <main className="flex-grow w-full">
                <Dashboard topPitch={topPitch} allPitches={allPitches} user={user} chartData={chartData} />
            </main>
        </div>
    )
}

export default HomePage