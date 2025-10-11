const User = require("../models/User")

exports.getAdmin = async (req, res) => {
  try {
    console.log("→ req.user =", req.user);

    // on récupère l'utilisateur connecté via l'id du token
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Erreur getCurrentUser:", error);
    res.status(500).json({ error: error.message });
  }
};