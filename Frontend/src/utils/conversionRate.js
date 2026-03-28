const conversionRate = (waitlist, uniqueVisitors) => {
    const conversionRate = (waitlist / uniqueVisitors) * 100;
    return conversionRate.toFixed(2);
}

export default conversionRate