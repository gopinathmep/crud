import React from 'react';
import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-gray-100 shadow-md">
			<div className="container mx-auto">
				<div className="navbar">
					<div className="flex-1">
						<Link href="/" className="btn btn-ghost text-xl">CRUD</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header