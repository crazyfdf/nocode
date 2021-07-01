import Head from 'next/head';
/* This example requires Tailwind CSS v2.0+ */

export default function Home() {
	return (
		<div>
			<Head>
				<title>nocode</title>
				<meta name='description' content='nocode搭建平台' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<header className='bg-white shadow'>
					<div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
						<h1 className='text-3xl font-bold text-gray-900'>页面</h1>
					</div>
				</header>
				<main>
					<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
						{/* Replace with your content */}
						<div className='px-4 py-6 sm:px-0'>
							<div className='border-4 border-dashed border-gray-200 rounded-lg h-96' />
						</div>
						{/* /End replace */}
					</div>
				</main>
			</div>
		</div>
	);
}
