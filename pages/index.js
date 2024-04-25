import { useState } from "react";
import { Inter } from "next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
	const [page, setPage] = useState(2);

	const { data, error, isLoading } = useSWR(`/api/payments/${page}`, fetcher);

	if (isLoading)
		return (
			<div role="status text-center">
				<svg
					aria-hidden="true"
					className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		);

	if (error)
		return (
			<div role="alert">
				<div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
					Danger
				</div>
				<div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
					<p>
						Something not ideal might be happening. Please, Refresh the page
					</p>
				</div>
			</div>
		);

	return (
		<main className={` m-8 text-center  ${inter.className}`}>
			<h1 className="text-center text-xl my-8">List of Payments</h1>

			<table className="table-fixed">
				<thead>
					<tr className="bg-gray-100">
						<th className="w-1/2 px-4 py-2">Id</th>
						<th className="w-1/4 px-4 py-2">Date</th>
						<th className="w-1/4 px-4 py-2">Description</th>
						<th className="w-1/4 px-4 py-2">Amount</th>
					</tr>
				</thead>
				{data?.payments?.map((x) => {
					return (
						<tr className="bg-gray-50">
							<td>{x.id}</td>
							<td>{x.date}</td>
							<td>{x.description}</td>
							<td>{x.amount}</td>
						</tr>
					);
				})}
			</table>

			<div className="flex items-center mt-4">
				<a
					href="#"
					onClick={() => {
						if (page == 0) return;

						setPage(page - 1);
					}}
					className="ml-auto flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<svg
						className="w-3.5 h-3.5 me-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
					Previous
				</a>
				<a
					href="#"
					onClick={() => {
						if (page == 10) return;

						setPage(page + 1);
					}}
					className=" mr-auto flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Next
					<svg
						className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</a>
			</div>
		</main>
	);
}
