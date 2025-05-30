'use client';
import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

export default function SettingsPage() {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('admin@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('');


  // Address fields
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  // Lists of countries, provinces, and cities
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const updatefunction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://server-production-1573.up.railway.app/AdminComponent/setting", {
        name: newName,
        phoneNumber,
        country,
        province,
        city,
        street,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );
    console.log(res.data);
    setNewEmail(res.data.email);
      if (res.status === 200) {
        console.log(res.data.message);
        alert('Profile settings updated successfully!');
        console.log(res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session Expired Log in Again to continue");
        router.push('/login');
      } else {
        console.error(err);
      }
    }
  };

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
    <div className="container py-2" style={{ overflowY: 'auto', height: '650px', scrollbarWidth: 'none' }}>
      <h2 className="mb-4 text-center">Settings</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>Edit Profile</h5>
          <Form onSubmit={handleProfileSave}>

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

            <button className='btn text-white'id='button1' type="submit" onClick={updatefunction}>Save Profile</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
