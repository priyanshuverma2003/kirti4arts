import Link from 'next/link';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textColumn}>
                    <h2>The Artist Behind the Brush</h2>
                    <h3>Corporate Professional & Weekend Artist</h3>
                    <p>
                        Hi, I work in a corporate during the weekdays and dedicate my heart to art on the weekends.
                        My creative journey is fueled by a desire to find balance and express the beauty I see in the world.
                    </p>
                    <p>
                        Painting makes me feel calm and gives me a sense of hope and harmony. I hope to portray exactly
                        that with my artwork and make the viewer remember cherished moments or dream of beautiful places.
                    </p>
                    <p>
                        I specialize in creating realistic acrylic and gouache paintings that capture the essence of nature
                        and emotion. Whether you&apos;re looking for an original piece to anchor your space or high-quality
                        art prints to brighten your home, I invite you to explore my collection.
                    </p>
                    <div className={styles.cta}>
                        <Link href="/gallery" className={styles.btn}>Explore Gallery</Link>
                    </div>
                </div>
                <div className={styles.imageColumn}>
                    <img src="/artist.jpg" alt="Kirti Verma" className={styles.artistImage} />
                </div>
            </div>
        </div>
    );
}
