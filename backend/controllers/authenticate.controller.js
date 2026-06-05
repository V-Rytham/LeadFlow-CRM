const authorize = (req, res, next) => {
  console.log(`Authorize called`)    
  try {
    const role = req.user.role;

    if (!role || role !== "admin") {
      return res.status(403).json({
        message: "User not authorized"
      });
    }

    console.log(`Authorize call ends`)
    next();

  } catch (error) {
    return res.status(500).json({
      message: "Authorization error"
    });
  };
};

export default authorize;