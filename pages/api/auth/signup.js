import { mongooseConnect } from '@/lib/mongoose';
import Users from '@/models/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  await mongooseConnect().catch((error) =>
    res.json({ error: 'Connection Failed...!' })
  );

  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;

    // check duplicate users
    const checkexisting = await Users.findOne({ email });
    if (checkexisting) return res.status(422).json({ message: 'User Already Exists...!' });

    try {
      // hash password
      const hashedPassword = await hash(password, 12);
      const user = new Users({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ status: true, user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
