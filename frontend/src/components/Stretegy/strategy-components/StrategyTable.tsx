/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Pagination, PaginationProps, Table } from 'antd'
import { IResults, IStats } from '../../../types/strategies.types'

import styles from '../Strategy.module.scss'

interface IStrategyTable {
	results: IResults[]
	count: number
	handleTableChange: (page: number, pageSize: number) => void
	handleSortChange: (sortBy: string) => void
	tablePagination: PaginationProps
}

const StrategyTable: React.FC<IStrategyTable> = ({
	results,
	count,
	handleTableChange,
	handleSortChange,
	tablePagination
}) => {
	const columns = [
		{
			dataIndex: 'number',
			key: 'number',
			render: (number: number) => <p>{number}</p>
		},
		{
			title: 'Strategy name',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => (
				<div className={styles.table__name}>
					<Avatar size="large" src="/default-avatar.jpg" className={styles.strategies__avatar} />
					<div>
						<h3>{text}</h3>
						<Link to="/">More details...</Link>
					</div>
				</div>
			)
		},
		{
			title: 'ROI',
			dataIndex: 'stats',
			key: 'ROI',
			onHeaderCell: (column: any) => ({
				onClick: () => handleSortChange(column.key)
			}),
			sorter: true,
			render: (stats: IStats) => (stats?.metrics?.ROI ? `${stats.metrics.ROI}%` : '-')
		},
		{
			title: 'Win Rate',
			dataIndex: 'stats',
			key: 'winRate',
			onHeaderCell: (column: any) => ({
				onClick: () => handleSortChange(column.key)
			}),
			sorter: true,
			render: (stats: IStats) => (stats?.metrics?.winRate ? `${stats.metrics.winRate}%` : '-')
		},
		{
			title: 'PnL',
			dataIndex: 'stats',
			key: 'PnL',
			onHeaderCell: (column: any) => ({
				onClick: () => handleSortChange(column.key)
			}),
			sorter: true,
			render: (stats: IStats) =>
				stats?.metrics?.PnL
					? `${`${stats?.metrics.PnL}`.startsWith('-') ? `${stats?.metrics.PnL}`.replace('-', '-$') : `$${stats?.metrics.PnL}`}`
					: '-'
		},
		{
			title: 'Position duration',
			dataIndex: 'stats',
			key: 'positionDuration',
			onHeaderCell: (column: any) => ({
				onClick: () => handleSortChange(column.key)
			}),
			sorter: true,
			render: (stats: IStats) => stats?.metrics?.positionDuration ?? '-'
		},
		{
			title: 'Avg invest',
			dataIndex: 'stats',
			key: 'avgInvest',
			onHeaderCell: (column: any) => ({
				onClick: () => handleSortChange(column.key)
			}),
			sorter: true,
			render: (stats: IStats) => (stats?.metrics?.avgInvest ? `$${Math.round(stats.metrics.avgInvest)}` : '-')
		},
		{
			title: 'Action',
			dataIndex: 'id',
			key: 'action',
			render: (id: number) => (
				<Link to={`https://t.me/cryptocake_ai_bot?start=s_${id}`} className="btn" target="_blank">
					Subscribe
				</Link>
			)
		}
	]

	return (
		<div>
			<Table
				columns={columns}
				dataSource={results}
				pagination={false}
				className={styles.table}
				onRow={() => {
					return {
						onClick: () => {}
					}
				}}
			/>

			<div className={styles.strategies__pagination}>
				<Pagination
					current={tablePagination.current}
					pageSize={tablePagination.pageSize}
					total={count}
					onChange={handleTableChange}
					showSizeChanger={false}
				/>
			</div>
		</div>
	)
}

export default StrategyTable
