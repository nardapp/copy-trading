import React from 'react'

import type { PaginationProps, TabsProps } from 'antd'
import { AppstoreFilled, UnorderedListOutlined } from '@ant-design/icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ConfigProvider, Tabs } from 'antd'
import { useMediaQuery } from 'react-responsive'

import { strategiesService } from '../../services/strategies.service'

import Loader from '../Loader'
import StrategyList from './strategy-components/StrategyList'
import StrategyTable from './strategy-components/StrategyTable'

import styles from './Strategy.module.scss'

const Strategy: React.FC = () => {
	const [tablePagination, setTablePagination] = React.useState<PaginationProps>({
		current: 1,
		pageSize: 10
	})
	const [tableSort, setTableSort] = React.useState<Record<string, string>>({
		sortBy: '',
		order: ''
	})

	const isMobile = useMediaQuery({ maxWidth: 992.98 })

	const { isLoading, data } = useQuery({
		queryKey: ['strategies', tablePagination.current, tableSort.sortBy, tableSort.order],
		queryFn: () =>
			strategiesService.getStrategies(
				tablePagination.current,
				tablePagination.pageSize,
				tableSort.sortBy,
				tableSort.order
			),
		placeholderData: keepPreviousData
	})

	const handleTableChange: PaginationProps['onChange'] = (page) => {
		setTablePagination({ ...tablePagination, current: page })
	}

	const handleSortChange = (sortBy: string) => {
		let order: string = 'ASC'

		if (tableSort.sortBy === sortBy) {
			if (tableSort.order === 'DESC') {
				sortBy = ''
				order = ''
			} else {
				order = 'DESC'
			}
		}

		setTableSort({ sortBy, order })
	}

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: <UnorderedListOutlined className={styles.strategies__icon} />,
			children: (
				<StrategyTable
					tablePagination={tablePagination}
					handleTableChange={handleTableChange}
					handleSortChange={handleSortChange}
					results={data ? data.results : []}
					count={data ? data.count : 0}
				/>
			)
		},
		{
			key: '2',
			label: <AppstoreFilled className={styles.strategies__icon} />,
			children: (
				<StrategyList
					tablePagination={tablePagination}
					handleTableChange={handleTableChange}
					results={data ? data.results : []}
					count={data ? data.count : 0}
				/>
			)
		}
	]

	if (isLoading) return <Loader />

	return (
		<section className={styles.strategies}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#fbc531'
					},
					components: {
						Tabs: {
							itemColor: '#340F6F',
							itemSelectedColor: '#fbc531',
							itemHoverColor: '#fbc531'
						},
						Table: {
							bodySortBg: '#fff',
							headerSortHoverBg: '#fff',
							headerSortActiveBg: '#fff',
							headerBg: '#fff',
							headerColor: '#81858c'
						}
					}
				}}
			>
				<div className="container">
					<div className={styles.strategies__body}>
						<h2>Repeat after successful wallet!</h2>
						<p>Statistical data in the table for the last 90 days</p>

						{isMobile ? (
							<StrategyList
								tablePagination={tablePagination}
								handleTableChange={handleTableChange}
								results={data ? data.results : []}
								count={data ? data.count : 0}
							/>
						) : (
							<Tabs
								defaultActiveKey="1"
								items={items}
								indicator={{ size: 0 }}
								tabBarGutter={10}
								tabBarStyle={{ marginBottom: 0 }}
								className={styles.tabs}
							/>
						)}
					</div>
				</div>
			</ConfigProvider>
		</section>
	)
}

export default Strategy
