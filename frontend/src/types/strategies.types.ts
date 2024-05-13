interface IMetrics {
	PnL: number
	ROI: number
	avgFee: number
	maxLoss: number
	winRate: number
	avgInvest: number
	maxProfit: number
	unrealizedPnL: number
	unrealizedROI: number
	closedPositions: number
	positionDuration: string
	riskRewardRation: number
	lastClosedPosition: string
}

export interface IStats {
	metrics: IMetrics
}

export interface IResults {
	id: number
	number: number
	name: string
	systemName: string
	description: string
	createdAt: string
	deactivatedAt: null | string
	lots: number
	stats: IStats
}

export interface IStrategies {
	results: IResults[]
	count: number
}
