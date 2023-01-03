import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'

export function CodeViewer(props: { text: string }) {
	const { text } = props

	function handleCopy() {
		copy(text)
		toast.success('Copied to clipboard')
	}

	return (
		<div className="flex items-center justify-start gap-4 my-2">
			<div className="px-4 py-3 inline-flex font-code bg-zinc-100 rounded-xl font-semibold">{text}</div>
			<div className="cursor-pointer hover:bg-zinc-100 p-2 rounded-full" onClick={handleCopy}>
				<CopyIcon />
			</div>
		</div>
	)
}

function CopyIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.055 3.24C12.9439 2.84692 12.7075 2.50087 12.3816 2.25449C12.0558 2.0081 11.6585 1.87485 11.25 1.875H8.75C7.89167 1.875 7.16667 2.4525 6.945 3.24M13.055 3.24C13.1008 3.40167 13.125 3.57333 13.125 3.75C13.125 3.91576 13.0592 4.07473 12.9419 4.19194C12.8247 4.30915 12.6658 4.375 12.5 4.375H7.5C7.33424 4.375 7.17527 4.30915 7.05806 4.19194C6.94085 4.07473 6.875 3.91576 6.875 3.75C6.875 3.57333 6.9 3.40167 6.945 3.24M13.055 3.24C13.5933 3.28083 14.1283 3.33167 14.6608 3.39333C15.5775 3.5 16.25 4.29083 16.25 5.21417V16.25C16.25 16.7473 16.0525 17.2242 15.7008 17.5758C15.3492 17.9275 14.8723 18.125 14.375 18.125H5.625C5.12772 18.125 4.65081 17.9275 4.29917 17.5758C3.94754 17.2242 3.75 16.7473 3.75 16.25V5.21417C3.75 4.29083 4.42167 3.5 5.33917 3.39333C5.87336 3.33148 6.40875 3.28036 6.945 3.24"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
