const withAuth = (req, res, next) => {
    const maxIdleTime = 2 * 60 * 1000; // 2 minutes in milliseconds (adjust as needed)

    if (req.session.logged_in) {

        // Check if last active time is set and if idle timeout has expired
        if (req.session.lastActive && (Date.now() - req.session.lastActive) > maxIdleTime) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
                res.redirect("/login");
            });
        } else {
            req.session.lastActive = Date.now();
            console.log("Updating last active time:", req.session.lastActive);
            next();
        }
    } else {
        res.redirect("/login");
    }
};

module.exports = withAuth;
