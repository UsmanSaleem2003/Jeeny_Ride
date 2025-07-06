import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './RideStatus.css';

const RideStatus = () => {
    const { user } = useAuth();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        const allRides = JSON.parse(localStorage.getItem('jeeny_rides')) || [];
        const userRides = allRides.filter((r) => r.passengerId === user.id);
        const latestRide = userRides[userRides.length - 1];
        setRide(latestRide || null);
    }, [user.id]);

    const handleAdvanceStatus = () => {
        const statusFlow = ['Requested', 'Accepted', 'In Progress', 'Completed'];
        const currentIndex = statusFlow.indexOf(ride.status);
        if (currentIndex < statusFlow.length - 1) {
            const newStatus = statusFlow[currentIndex + 1];
            const updatedRide = { ...ride, status: newStatus };
            updateRide(updatedRide);
            setRide(updatedRide);
        }
    };

    const updateRide = (updated) => {
        const allRides = JSON.parse(localStorage.getItem('jeeny_rides')) || [];
        const updatedRides = allRides.map((r) => (r.id === updated.id ? updated : r));
        localStorage.setItem('jeeny_rides', JSON.stringify(updatedRides));
    };

    if (!ride) return <div className="status-container">No current ride.</div>;

    return (
        <div className="status-container">
            <div className="status-card">
                <h2>Ride Status</h2>
                <div className="status-item"><strong>Pickup:</strong> {ride.pickupLocation}</div>
                <div className="status-item"><strong>Drop:</strong> {ride.dropLocation}</div>
                <div className="status-item"><strong>Type:</strong> {ride.rideType}</div>
                <div className="status-item"><strong>Status:</strong> {ride.status}</div>

                {ride.status !== 'Completed' && (
                    <button className="status-btn" onClick={handleAdvanceStatus}>
                        Advance Status
                    </button>
                )}
            </div>
        </div>
    );
};

export default RideStatus;
