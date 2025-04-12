import axios from 'axios';

const API_BASE = 'http://192.168.1.17:5000/api/auth'; // ✅ Backend base route

export const fetchUserByUID = async (uid) => {
  try {
    const res = await axios.get(`${API_BASE}/${uid}`);
    return res.data;
  } catch (err) {
    console.error('❌ fetchUserByUID error:', err.response?.data || err.message);
    throw err;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/register`, data);
    return res.data.user; // only return user object
  } catch (err) {
    console.error('❌ registerUser error:', err.response?.data || err.message);
    throw err;
  }
};
