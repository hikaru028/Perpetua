import { IService } from '../../../../../util/interfaces';

const IMAGE_BASE_PATH = '../../../../../../../assets/images/';

export const ServiceData: IService[] = [
    {
        image: `${IMAGE_BASE_PATH}service1.svg`,
        title: 'service.1.title', // Use translation keys here
        description: 'service.1.describe', // Use translation keys here
    },
    {
        image: `${IMAGE_BASE_PATH}service2.svg`,
        title: 'service.2.title',
        description: 'service.2.describe',
    },
    {
        image: `${IMAGE_BASE_PATH}service3.svg`,
        title: 'service.3.title',
        description: 'service.3.describe',
    },
    {
        image: `${IMAGE_BASE_PATH}service4.svg`,
        title: 'service.4.title',
        description: 'service.4.describe',
    },
    {
        image: `${IMAGE_BASE_PATH}service5.svg`,
        title: 'service.5.title',
        description: 'service.5.describe',
    },
    {
        image: `${IMAGE_BASE_PATH}service6.svg`,
        title: 'service.6.title',
        description: 'service.6.describe',
    }
];