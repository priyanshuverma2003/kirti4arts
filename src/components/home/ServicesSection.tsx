'use client';

import styles from './ServicesSection.module.css';

export default function ServicesSection() {
    const services = [
        {
            title: 'Originals',
            description: 'One-of-a-kind handcrafted paintings.',
            icon: '🎨',
        },
        {
            title: 'Prints',
            description: 'High-quality reproductions of your favorites.',
            icon: '🖨️',
        },
        {
            title: 'Portraits',
            description: 'Custom commissioned portraits from photos.',
            icon: '👤',
        },
    ];

    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                {services.map((service, index) => (
                    <div className={styles.serviceBox} key={index}>
                        <i>{service.icon}</i>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
