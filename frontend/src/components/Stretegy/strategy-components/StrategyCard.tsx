import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge } from 'antd'
import { IResults } from '../../../types/strategies.types'

import styles from '../Strategy.module.scss'

const StrategyCard: React.FC<IResults> = ({ id, name, stats, number }) => {
	const statistics = [
		{
			title: 'WinRate:',
			stat: stats?.metrics.winRate === null ? '-' : `${stats?.metrics.winRate}%`
		},
		{
			title: 'PnL:',
			stat: stats?.metrics?.PnL
				? `${`${stats?.metrics.PnL}`.startsWith('-') ? `${stats?.metrics.PnL}`.replace('-', '-$') : `$${stats?.metrics.PnL}`}`
				: '-'
		},
		{
			title: 'Position duration:',
			stat: stats?.metrics.positionDuration === null ? '-' : stats?.metrics.positionDuration
		},
		{
			title: 'Avg invest:',
			stat: stats?.metrics.avgInvest === null ? '-' : `$${Math.round(stats!.metrics.avgInvest)}`
		}
	]

	return (
		<div className={styles.card__column}>
			<Badge.Ribbon text={`# ${number}`} color="#fbc531" className={styles.card__badge}>
				<Link to={`https://cryptocake.ai/strategies/${id}`} target="_blank" className={styles.card__item}>
					<div className={styles.card__wrapper}>
						<Avatar size={60} src="/default-avatar.jpg" className={styles.strategies__avatar} />
						<h3>{name}</h3>
					</div>

					<div className={styles.card__roi}>
						<p>ROI:</p>
						<p>{stats?.metrics.ROI}%</p>
					</div>

					{statistics.map((obj) => (
						<div key={obj.title} className={styles.card__statistics}>
							<span>{obj.title}</span>
							<span>{obj.stat}</span>
						</div>
					))}

					<Link to={`https://t.me/cryptocake_ai_bot?start=s_${id}`} className="btn" target="_blank">
						Subscribe
					</Link>
				</Link>
			</Badge.Ribbon>
		</div>
	)
}

export default StrategyCard
