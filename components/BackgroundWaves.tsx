import styles from '../styles/BackgroundWaves.module.css';

function BackgroundWaves({
    color,
    offsetY,
}: {
    color: string;
    offsetY: string;
}) {
    return (
        <div className={styles['background-waves-container']}>
            <svg
                className={styles.waves}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className={styles.parallax}>
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="0"
                        fill={color}
                        style={{ opacity: 0.6 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="3"
                        fill={color}
                        style={{ opacity: 0.4 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="5"
                        fill={color}
                        style={{ opacity: 0.2 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="8"
                        fill={color}
                        style={{ opacity: 1 }}
                    />
                </g>
            </svg>
            <div
                className={styles.grower}
                style={{ height: offsetY, backgroundColor: color }}
            />
        </div>
    );
}

export default BackgroundWaves;
