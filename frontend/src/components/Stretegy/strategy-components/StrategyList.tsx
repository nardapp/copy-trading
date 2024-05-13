import React from 'react'
import { Pagination, PaginationProps } from 'antd'
import { IResults } from '../../../types/strategies.types'
import StrategyCard from './StrategyCard'

import styles from '../Strategy.module.scss'

interface IStrategyList {
	results: IResults[]
	count: number
	handleTableChange: (page: number, pageSize: number) => void
	tablePagination: PaginationProps
}

const StrategyList: React.FC<IStrategyList> = ({ results, count, tablePagination, handleTableChange }) => {
	return (
		<div style={{ marginTop: 54 }}>
			<div className={styles.card}>
				{results.map((obj) => (
					<StrategyCard key={obj.id} {...obj} />
				))}
			</div>

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

export default StrategyList
