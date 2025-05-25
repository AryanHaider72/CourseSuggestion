'use client';
import { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("https://coursesuggestion-production.up.railway.app/component/Updating_user", {}, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
  
        const data = res.data;
  
        setNewName(data.username || '');
        setNewEmail(data.email || '');
        setPhoneNumber(data.number || '');
        setCountry(data.country || '');
        setProvince(data.prov || '');
        setCity(data.city || '');
        setStreet(data.street || '');
  
        // Optionally fetch dependent provinces and cities
        if (data.country) fetchProvinces(data.country);
        if (data.prov) fetchCities(data.prov);
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
    fetchCountries();
  }, []);
  
  const updatefunction = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get("https://coursesuggestion-production.up.railway.app/component/setting", {
            name: newName,
            phoneNumber: phoneNumber,
            country: country,
            province: province,
            city: city,
            street: street
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Ensure that cookies are sent with the request
        });

        console.log(response.data); // log to check what is returned
        alert("Profile updated successfully!");
    } catch (error) {
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error details:", error.response.data);
        } else {
            console.error("Network error:", error.message);
        }
    }
};


  const fetchCountries = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: 'Return a JSON array of all country names in the world. Only return the JSON array. No extra text.',
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const jsonText = rawText.replace(/```json|```/g, '').trim();
      const countryNames = JSON.parse(jsonText);
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchProvinces = async (selectedCountry) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `List the provinces of ${selectedCountry}. Return them as a JSON array of strings.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const provincesList = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const provinceNames = provincesList
        ? provincesList.match(/["']([^"']+)["']/g)?.map((c) => c.replace(/['"]/g, '')) || []
        : [];
      setProvinces(provinceNames);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchCities = async (selectedProvince) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `List all small and big cities in the province of ${selectedProvince} in alphabetical order. Return them as a JSON array of strings.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const citiesList = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cityNames = citiesList
        ? citiesList.match(/["']([^"']+)["']/g)?.map((c) => c.replace(/['"]/g, '')) || []
        : [];
      setCities(cityNames);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setCountry(selected);
    fetchProvinces(selected);
  };

  const handleProvinceChange = (e) => {
    const selected = e.target.value;
    setProvince(selected);
    fetchCities(selected);
  };

  return (
    <div className="container py-2" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
      <h2 className="mb-4 text-center">Settings</h2>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>Edit Profile</h5>
          <Form onSubmit={updatefunction}>
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
                  <Form.Control type="email" value={newEmail} readOnly />
                </Form.Group>
              </Col>
            </Row>

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

            <h5 className="mt-4">Address</h5>
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" value={country} onChange={handleCountryChange}>
                    <option>Select Country</option>
                    {countries.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formProvince">
                  <Form.Label>Province</Form.Label>
                  <Form.Control as="select" value={province} onChange={handleProvinceChange}>
                    <option>Select Province</option>
                    {provinces.map((p, i) => (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option>Select City</option>
                    {cities.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formStreet">
                  <Form.Label>Street Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <button className="btn text-white" id="button1" type="submit">
              Save Profile
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
