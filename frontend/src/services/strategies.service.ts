import axios from 'axios'
import { IStrategies } from '../types/strategies.types'

class StrategiesService {
	private BASE_URL = 'http://athena.nardapp.com/api/cryptocake/strategies'

	async getStrategies(tablePage: number = 1, tableLimit: number = 10, tableSort: string = '', tableOrder: string = '') {
		const page = `?page=${tablePage}`
		const limit = `&limit=${tableLimit}`
		const sortBy = tableSort.length ? `&sortBy=${tableSort}` : ''
		const order = tableOrder.length ? `&order=${tableOrder}` : ''

		const response = await axios.get<IStrategies>(`${this.BASE_URL}${page}${limit}${sortBy}${order}`)
		return response.data
	}
}

export const strategiesService = new StrategiesService()
