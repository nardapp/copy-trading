import React from 'react'
import { Link } from 'react-router-dom'
import ConnectWallet from '../ConnectWallet'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<header className={`${styles.header}`}>
			<div className="container">
				<div className={styles.header__body}>
					<div className={styles.header__column}>
						<Link to="/" className={styles.header__logo}>
							<img src="/logo.png" alt="..." width={120} height={120} />
						</Link>
					</div>

					<div className={styles.header__column}>
						<ConnectWallet />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
