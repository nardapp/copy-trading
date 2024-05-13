import React from 'react'
import 'viem/window'

const ConnectWallet = () => {
	const [accounts, setAccounts] = React.useState<string>('')

	const connectWallet = async () => {
		try {
			const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })
			setAccounts(account)
		} catch (error) {
			console.log(error)
		}
	}

	const disconnectWallet = async () => {
		try {
			await window.ethereum!.request({
				method: 'wallet_revokePermissions',
				params: [{ eth_accounts: {} }]
			})
			setAccounts('')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			{accounts ? (
				<button onClick={() => disconnectWallet()} className="btn">
					Disonnect
				</button>
			) : (
				<button onClick={() => connectWallet()} className="btn">
					Connect
				</button>
			)}
		</div>
	)
}

export default ConnectWallet
