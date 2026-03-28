const ctaRate = (cta, views) => {
    const ctaRate = (cta / views) * 100;
    return ctaRate.toFixed(2);
}

export default ctaRate;