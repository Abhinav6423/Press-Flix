const waitlistRate = (waitlist, ctaClicks) => {
    if (ctaClicks === 0) {
        if (waitlist > 0) return "—"; // or "Tracking Issue"
        return "0.00";
    }

    return ((waitlist / ctaClicks) * 100).toFixed(2);
};


export default waitlistRate