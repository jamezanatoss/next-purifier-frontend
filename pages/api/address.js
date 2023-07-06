import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Address} from "@/models/Address";

export default async function handle(req, res) {
  await mongooseConnect();
  const session  = await getServerSession(req, res, authOptions);

  if (!session) {
    // Handle the case when the session is null
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  const { user } = session;

  if (req.method === 'PUT') {
    const address = await Address.findOne({ userEmail: user.email });
    if (address) {
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      res.json(await Address.create({ userEmail: user.email, ...req.body }));
    }
  }

  if (req.method === 'GET') {
    const address = await Address.findOne({ userEmail: user.email });
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: 'No address found for the user' });
    }
  }
}
