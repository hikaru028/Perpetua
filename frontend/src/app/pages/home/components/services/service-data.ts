import { IService } from '../../../../../util/interfaces';

const IMAGE_BASE_PATH = '../../../../../../../assets/images/';

export const ServiceData: IService[] = [
    {
        image: `${IMAGE_BASE_PATH}service1.svg`,
        title: 'Custom Software',
        description: 'We build custom software tailored to your business needs, enhancing efficiency and growth.'
    },
    {
        image: `${IMAGE_BASE_PATH}service2.svg`,
        title: 'Websites & CMS',
        description: 'A brief outline of the services we provide regarding websites & CMS. Maybe we talk about the benefits from a client’s perspective?<br /><br />Keep it short and then call to action to the expanded ‘Websites & CMS’ page. Around this long will be the maximum length.'
    },
    {
        image: `${IMAGE_BASE_PATH}service3.svg`,
        title: 'Native & Web Apps',
        description: 'We build powerful native and web applications that offer seamless user experiences across platforms.'
    },
    {
        image: `${IMAGE_BASE_PATH}service4.svg`,
        title: 'Artificial Intelligence',
        description: 'Leverage the power of AI to drive innovation and automate your business processes effectively.'
    },
    {
        image: `${IMAGE_BASE_PATH}service5.svg`,
        title: 'Hosting & Cloud Services',
        description: 'Reliable and scalable hosting and cloud solutions to ensure your services run smoothly, no matter the demand.'
    },
    {
        image: `${IMAGE_BASE_PATH}service6.svg`,
        title: 'Data & Analytics',
        description: 'Turn your data into insights with our advanced data analytics services, empowering informed business decisions.'
    }
];
