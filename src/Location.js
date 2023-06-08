import React, {useState, useEffect} from 'react';
import issLogo from './spacestation-logo.png';


const fetchData = async () => {
		const response = await fetch('http://api.open-notify.org/iss-now.json');
		const data = await response.json();
		return data;
	};


const Location = () => {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [timestamp, setTimestamp] = useState('');

	const updateLocation = async (event) => {
		if (event) {
			console.log('click');
			event.preventDefault();
		}
		const location = await fetchData();
		setLatitude(JSON.stringify(location.iss_position.latitude).replace(/[""]/g,''));
		setLongitude(JSON.stringify(location.iss_position.longitude).replace(/[""]/g,''));
		setTimestamp(JSON.stringify(location.timestamp));
	};

	useEffect(() => {
    	updateLocation();
    	console.log('load');
  	});

	return (
		<div className="Location">
			<h1>Space Station Locator</h1>
			<div className="content">
				<div className="info">
					<p id="1">Latitude:<br/>{latitude}</p>
					<p id="2">Longitude:<br/>{longitude}</p>
					<p id="3">Timestamp:<br/>{timestamp} sec</p>
				</div>
				<div className="update">
					<button onClick={updateLocation}>Update</button>
				</div>
				<img alt="iss" id="issLogo" src={issLogo}/>
			</div>
		</div>
	);
};

export default Location;