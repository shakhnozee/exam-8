import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header } from './header';
import { Password } from './password';



const root = createRoot(document.getElementById("root")!);

root.render(
	<StrictMode>
		<div className='bg-gray-100'>
			<div className='w-[60%] mx-auto p-5'>
			<Header />
			<Password />
			{/* <Slider /> */}
		</div>
		</div>
		

	</StrictMode>
);
