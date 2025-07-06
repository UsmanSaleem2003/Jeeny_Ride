import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RequestRide.css';

const RequestRide = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pickup: '',
        drop: '',
        rideType: 'Car',
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const ride = {
            id: Date.now().toString(),
            passengerId: user.id,
            pickupLocation: formData.pickup,
            dropLocation: formData.drop,
            rideType: formData.rideType,
            status: 'Requested',
            createdAt: new Date().toISOString(),
        };

        const allRides = JSON.parse(localStorage.getItem('jeeny_rides')) || [];
        allRides.push(ride);
        localStorage.setItem('jeeny_rides', JSON.stringify(allRides));

        // Link ride to user
        const users = JSON.parse(localStorage.getItem('jeeny_users')) || [];
        const updatedUsers = users.map((u) => {
            if (u.id === user.id) {
                u.rides = [...(u.rides || []), ride.id];
                localStorage.setItem('jeeny_user', JSON.stringify(u)); // Update current user too
                return u;
            }
            return u;
        });
        localStorage.setItem('jeeny_users', JSON.stringify(updatedUsers));

        navigate('/ride-status');
    };

    return (
        <div className="ride-container">
            <div className="ride-card">
                <h2>Book a Ride</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="pickup">Pickup Location</label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Mall Road"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="drop">Drop-off Location</label>
                        <input
                            type="text"
                            id="drop"
                            name="drop"
                            value={formData.drop}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Airport"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rideType">Ride Type</label>
                        <select
                            id="rideType"
                            name="rideType"
                            value={formData.rideType}
                            onChange={handleChange}
                            className="select"
                        >
                            <option value="Bike">Bike</option>
                            <option value="Car">Car</option>
                            <option value="Rickshaw">Rickshaw</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Request Ride</button>
                </form>
            </div>
        </div>
    );
};

export default RequestRide;
