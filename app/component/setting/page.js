'use client';
import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

export default function SettingsPage() {
  const [ userName, setUserName ] = useState();
  const [newName, setNewName] = useState(userName);
  const [newEmail, setNewEmail] = useState('john@example.com');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Address fields
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  // Lists of countries, provinces, and cities
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch the list of countries using Gemini API or any other relevant API
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Return a JSON array of all country names in the world. Only return the JSON array. No extra text. No markdown. No explanation.",
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      console.log("API Response:", data);
  
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      // Remove ```json and ``` if present
      const jsonText = rawText.replace(/```json|```/g, "").trim();
  
      // Try to parse cleaned string
      const countryNames = JSON.parse(jsonText);
  
      if (Array.isArray(countryNames)) {
        setCountries(countryNames); // ✅ Set clean string array like ["Afghanistan", ...]
      } else {
        console.error("Parsed JSON is not an array:", jsonText);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  

  // Fetch provinces based on the selected country
  const fetchProvinces = async (country) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `List the provinces of ${country}. Return them as a JSON array of strings.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Provinces API Response: ", data); // Log API response to check its structure

      const provincesList = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const provinceNames = provincesList
        ? provincesList.match(/["']([^"']+)["']/g)?.map(c => c.replace(/['"]/g, '')) || []
        : [];

      setProvinces(provinceNames);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  // Fetch cities based on the selected province
  const fetchCities = async (province) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `List all small and big cities in the province of ${province}. Return them as a JSON array of strings.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Cities API Response: ", data); // Log API response to check its structure

      const citiesList = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cityNames = citiesList
        ? citiesList.match(/["']([^"']+)["']/g)?.map(c => c.replace(/['"]/g, '')) || []
        : [];

      setCities(cityNames);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Handle profile save
  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserName(newName);
    alert('Profile updated successfully!');
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    fetchProvinces(selectedCountry); // Fetch provinces based on selected country
  };

  // Handle province change
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    fetchCities(selectedProvince); // Fetch cities based on selected province
  };

  // Fetch countries on initial load
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="container py-2" style={{ overflowY: 'auto', height: '500px' }}>
      <h2 className="mb-4 text-center">Settings</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>Edit Profile</h5>
          <Form onSubmit={handleProfileSave}>
            {/* Profile Picture */}
            <Row className="mb-4 justify-content-center">
              <Col xs="auto">
                <div className="position-relative">
                  {profilePhoto ? (
                    <Image src={profilePhoto} alt="Profile" width={150} height={150} roundedCircle />
                  ) : (
                    <div
                      style={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: '#ccc',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <FaCamera size={50} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <p className="mt-2 text-center">Change Profile Picture</p>
              </Col>
            </Row>

            {/* Name & Email */}
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={newEmail} readOnly onChange={(e) => setNewEmail(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            {/* Password & Phone */}
            <Row className="mb-3">
              <Col sm={12}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Address Section */}
            <h5 className="mt-4">Address</h5>
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" value={country} onChange={handleCountryChange}>
                    <option>Select Country</option>
                    {countries.length === 0 ? (
                      <option>No countries available</option>
                    ) : (
                      countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formProvince">
                  <Form.Label>Province / State</Form.Label>
                  <Form.Control as="select" value={province} onChange={handleProvinceChange}>
                    <option>Select Province/State</option>
                    {provinces.length === 0 ? (
                      <option>No provinces available</option>
                    ) : (
                      provinces.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Select City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>Street Number</Form.Label>
                  <Form.Control>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <button className='btn text-white'id='button1' type="submit">Save Profile</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
