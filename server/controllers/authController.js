import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const {
    uid,
    email,
    phone,
    role,
    ambulanceNumber,
    driverName,
    hospitalName,
    hospitalAddress
  } = req.body;

  // ✅ Basic validation
  if (!uid || !email || !phone || !role) {
    return res.status(400).json({ msg: 'Missing required fields: uid, email, phone, or role' });
  }

  // ✅ Role-based field validation
  if (role === 'ambulance' && (!ambulanceNumber || !driverName)) {
    return res.status(400).json({ msg: 'Missing ambulanceNumber or driverName for ambulance role' });
  }

  if (role === 'hospital' && (!hospitalName || !hospitalAddress)) {
    return res.status(400).json({ msg: 'Missing hospitalName or hospitalAddress for hospital role' });
  }

  try {
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      uid,
      email,
      phone,
      role,
      ambulanceNumber: role === 'ambulance' ? ambulanceNumber : undefined,
      driverName: role === 'ambulance' ? driverName : undefined,
      hospitalName: role === 'hospital' ? hospitalName : undefined,
      hospitalAddress: role === 'hospital' ? hospitalAddress : undefined
    });

    await newUser.save();

    const responseUser = {
      uid: newUser.uid,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      ...(role === 'ambulance' && {
        ambulanceNumber: newUser.ambulanceNumber,
        driverName: newUser.driverName
      }),
      ...(role === 'hospital' && {
        hospitalName: newUser.hospitalName,
        hospitalAddress: newUser.hospitalAddress
      })
    };

    res.status(201).json({ msg: 'User registered successfully', user: responseUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getUserByUID = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
