import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './RideHistory.css';

const RideHistory = () => {
    const { user } = useAuth();
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const allRides = JSON.parse(localStorage.getItem('jeeny_rides')) || [];
        const userRides = allRides.filter(r => r.passengerId === user.id);
        const completedRides = userRides.filter(r => r.status === 'Completed');
        setRides(completedRides.reverse());
    }, [user.id]);

    return (
        <div className="history-container">
            <div className="history-card">
                <h2>Ride History</h2>
                {rides.length === 0 ? (
                    <p className="no-history">No completed rides yet.</p>
                ) : (
                    <ul className="ride-list">
                        {rides.map((ride) => (
                            <li key={ride.id} className="ride-entry">
                                <div><strong>Pickup:</strong> {ride.pickupLocation}</div>
                                <div><strong>Drop:</strong> {ride.dropLocation}</div>
                                <div><strong>Type:</strong> {ride.rideType}</div>
                                <div><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RideHistory;
