import BookLandingPage from '../components/BookLandingPage'
import TechProductLandingPitch from '../components/TechProductLandingPitch'
import ServicePitch from '../components/ServicePitch'
import Non_techProducts from '../components/Non-techProducts'


export const templateMap = {
    book: BookLandingPage,
    tech: TechProductLandingPitch,
    service: ServicePitch,
    physical: Non_techProducts
};

export function selectTemplate(category) {
    const template = templateMap[category];

    if (!template) {
        throw new Error(`No template found for category: ${category}`);
    }

    return template;
}
