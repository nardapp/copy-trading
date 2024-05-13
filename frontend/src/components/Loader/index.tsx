import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={styles.loader}>
			<img width={100} height={100} src="/loader.svg" alt="" />
		</div>
	)
}

export default Loader
